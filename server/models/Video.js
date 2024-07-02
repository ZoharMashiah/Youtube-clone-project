const mongoose = require("mongoose");
const User = require("../models/User");

const videoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.Object,
  },
  title: {
    type: String,
  },
  description: String,
  category: String,
  publication_date: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
  like: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  icon: String,
  video: String,
});

videoSchema.statics.deleteVideo = async function (videoId, userId) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const video = await this.findOne({ _id: videoId, user_id: userId }).session(session);
    if (!video) {
      throw new Error("Video not found");
    }

    // delete all comments
    for (const commentId of video.comments) {
      await deleteComment(commentId);
    }

    // remove video from liked, disliked, history lists
    await User.updateMany(
      {
        $or: [{ likes: video._id }, { dislikes: video._id }, { history: video._id }],
      },
      {
        $pull: {
          likes: video._id,
          dislikes: video._id,
          history: video._id,
        },
      }
    ).session(session);

    // remove video from owner's videos array
    await User.updateOne({ _id: userId }, { $pull: { videos: video._id } }).session(session);

    // delete the video
    await video.deleteOne({ session });

    await session.commitTransaction();
    return true;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

videoSchema.statics.createVideo = async function (videoData) {
  const { user_id, title, description, category, video, icon } = videoData;

  const user = await User.findById(user_id);
  if (!user) {
    throw new Error(`User not found for id ${user_id}`);
  }

  const newVideo = new this({
    user: {
      _id: user._id,
      username: user.username,
      photo: user.photo,
    },
    title,
    description,
    category,
    icon,
    video,
  });

  const savedVideo = await newVideo.save();
  await User.findByIdAndUpdate(user._id, { $push: { videos: savedVideo._id } });
  return savedVideo;
};

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
