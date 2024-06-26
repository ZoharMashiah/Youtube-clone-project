const videoModel = require("../models/uploadVideoModel");
const videoListModel = require("../models/videoListModel");

async function getUserVideos(req, res) {
  try {
    const userVideoList = await videoListModel.getUserVideos(req.body);
    console.log("Fetched user video list successfully");
    res.status(201).json(userVideoList);
  } catch (error) {
    console.error("Error fetching user video list:", error);
    res.status(500).json({
      message: "Failed fetching user video list",
      error: error.message,
    });
  }
}

async function uploadVideo(req, res) {
  try {
    const videoData = await videoModel.create(req.body);
    console.log("Video upload processed successfully");
    res.status(201).json(videoData);
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({
      message: "Failed to upload video",
      error: error.message,
    });
  }
}

export { uploadVideo, getUserVideos };
