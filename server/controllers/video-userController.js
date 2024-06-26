const videoModel = require("../models/uploadVideoModel");

exports.uploadVideo = async (req, res) => {
  try {
    const videoData = await videoModel.create(req.body);
    console.log("Video upload processed successfully");
    res.status(201).json(videoData);
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload video",
      error: error.message,
    });
  }
};
