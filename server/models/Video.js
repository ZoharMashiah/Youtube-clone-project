const mongoose = require("mongoose");
const User = require("../models/User");

const videoSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  title: String,
  description: String,
  category: String,
  publication_date: Date,
  views: Number,
  like: Number,
  dislike: Number,
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

videoSchema.statics.createVideo = async (videoData) => {
  const { user_id, title, description, category, video, icon } = videoData;

  let processedIcon = "";
  if (icon) {
    // processedIcon = util.validateBase64(icon, "image/jpeg");
    processedIcon = icon;
  }

  let processedVideo = "";
  if (video) {
    // processedVideo = util.validateBase64(video, "video/mp4");
    processedVideo = video;
  }

  console.log("icon: ", icon);
  console.log("video: ", video);

  const newVideo = new Video({
    user_id,
    title,
    description,
    category,
    publication_date: Date.now(),
    views: 0,
    like: 0,
    dislike: 0,
    comments: [],
    icon: processedIcon,
    video: processedVideo,
  });

  const savedVideo = await newVideo.save();

  User.findByIdAndUpdate(user_id, { $push: { videos: savedVideo._id } }, { new: true });

  return {
    videoId: newVideo._id,
  };
};

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
