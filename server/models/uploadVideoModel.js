const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  user_id: Number,
  title: String,
  description: String,
  category: String,
  publication_date: Date,
  views: Number,
  like: [mongoose.Schema.Types.ObjectId],
  dislike: [mongoose.Schema.Types.ObjectId],
  comments: [mongoose.Schema.Types.ObjectId],
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
    message: "Video uploaded successfully",
    videoId: newVideo._id,
  };
};

module.exports = {
  create,
};
