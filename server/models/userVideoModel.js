const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  category: String,
  publication_date: Date,
  views: Number,
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  icon: String,
  video: String,
});

videoSchema.pre("deleteOne", { document: true, query: false }, async function () {
  const user = findById(this.user_id);
  await user.updateMany(
    {
      $or: [{ likes: this._id }, { dislikes: this._id }],
    },
    {
      $pull: {
        likes: this._id,
        dislikes: this._id,
      },
    }
  );
});

const VideoModel = mongoose.model("Video", videoSchema);

const validateBase64 = (base64Data, expectedType) => {
  const prefix = `data:${expectedType};base64,`;
  if (!base64Data.startsWith(prefix)) {
    throw new Error(`Invalid ${expectedType} data`);
  }
  return base64Data.slice(prefix.length);
};

const create = async (videoData) => {
  const { user_id, title, description, category, video, icon } = videoData;

  let processedIcon = "";
  if (icon) {
    processedIcon = validateBase64(icon, "image/jpeg");
  }

  let processedVideo = "";
  if (video) {
    processedVideo = validateBase64(video, "video/mp4");
  }

  const newVideo = new VideoModel({
    user_id,
    title,
    description,
    category,
    publication_date: Date.now(),
    views: 0,
    like: [],
    dislike: [],
    comments: [],
    icon: processedIcon,
    video: processedVideo,
  });

  await newVideo.save();

  return {
    success: true,
    videoId: newVideo._id,
  };
};

async function getUserVideos(userId) {
  try {
    return await user.findById(userId, "videos").sort({ title: 1 });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  create,
  getUserVideos,
  VideoModel,
};
