const userVideoModel = require("../models/userVideoModel");

async function getUserVideos(req, res) {
  const userId = req.params.id;
  try {
    const userVideoList = await userVideoModel.getUserVideos(userId);
    console.log("Fetched user video list successfully");
    res.status(200).json(userVideoList);
  } catch (error) {
    console.error("Error fetching user video list:", userId, error);
    res.status(500).json({
      error: error.message,
    });
  }
}

async function uploadVideo(req, res) {
  const userId = req.params.id;
  try {
    const videoData = await userVideoModel.create(userId);
    console.log("Video upload processed successfully");
    res.status(201).json(videoData);
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({
      error: error.message,
    });
  }
}

export { uploadVideo, getUserVideos };
