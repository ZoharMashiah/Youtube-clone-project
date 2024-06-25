const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  user_id: Number,
  category: String,
  publication_date: Date,
  views: Number,
  like: [String],
  dislike: [String],
  comments: [{ user_id: Number, text: String, date: Date }],
  icon: String,
  video: String,
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
  const { title, description, user, category, publication_date, views, icon, video, like, dislike, comments } =
    videoData;

  let processedIcon = "";
  if (icon) {
    processedIcon = validateBase64(icon, "image/jpeg");
  }

  let processedVideo = "";
  if (video) {
    processedVideo = validateBase64(video, "video/mp4");
  }

  const newVideo = new VideoModel({
    title,
    description,
    user,
    category,
    publication_date,
    views,
    like: Array.isArray(like) ? like : [],
    dislike: Array.isArray(dislike) ? dislike : [],
    comments: Array.isArray(comments) ? comments : [],
    icon: processedIcon,
    video: processedVideo,
  });

  await newVideo.save();

  return {
    success: true,
    message: "Video uploaded successfully",
    videoId: newVideo._id,
  };
};

module.exports = {
  validateBase64,
  create,
};
