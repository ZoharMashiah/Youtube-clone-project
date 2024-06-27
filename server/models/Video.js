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
  comments: { type: mongoose.Schema.Types.ObjectId, ref: "comment" },
  icon: String,
  video: String,
});

// delete video from liked, disliked, history lists
videoSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  const session = this.$session();
  try {
    // remove video from user's videos array
    await User.updateOne({ _id: this.user_id }, { $pull: { videos: this._id } }).session(session);

    // remove video from liked, disliked, history lists
    await User.updateMany(
      {
        $or: [{ likes: this._id }, { dislikes: this._id }, { history: this._id }],
      },
      {
        $pull: {
          likes: this._id,
          dislikes: this._id,
          history: this._id,
        },
      }
    ).session(session);

    next();
  } catch (error) {
    next(error);
  }
});

videoSchema.statics.deleteVideo = async function (videoId, userId) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const video = await this.findOne({ _id: videoId, user_id: userId }).session(session);
    if (!video) {
      throw new Error("Video not found");
    }

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
    processedIcon = util.validateBase64(icon, "image/jpeg");
  }

  let processedVideo = "";
  if (video) {
    processedVideo = util.validateBase64(video, "video/mp4");
  }

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

  await newVideo.save();

  return {
    videoId: newVideo._id,
  };
};

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
