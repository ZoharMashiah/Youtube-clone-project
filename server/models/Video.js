const mongoose = require("mongoose");
const User = require("./User");
const Comment = require("./Comment");

const videoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.Object,
    ref: "User",
    index: true,
  },
  title: {
    type: String,
    trim: true,
  },
  description: String,
  category: {
    type: String,
    index: true,
  },
  publication_date: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
    index: -1,
  },
  like: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  icon: String,
  video: String,
});

videoSchema.statics.deleteVideo = async function (videoId, userId) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const video = await this.findById({ _id: videoId })
    if (!video) {
      throw new Error("Video not found");
    }

    // delete all comments
    await Comment.deleteMany({ videoId: videoId });

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
    )

    // remove video from owner's videos array
    await User.updateOne({ _id: userId }, { $pull: { videos: video._id } })

    // delete the video
    // await video.deleteOne({ session });
    await Video.findByIdAndDelete({_id: videoId})

    await session.commitTransaction();
    return true;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

videoSchema.statics.findDataById = async function (videoId) {
  try {
    const video = await this.findById(videoId, {
      comments: 0,
      video: 0,
    });

    if (!video) {
      throw new Error("Video not found");
    }

    return video;
  } catch (error) {
    console.log("Error fetching video:", error.message);
    throw error;
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
