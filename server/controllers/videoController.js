const Video = require("../models/Video");
const VideoService = require("../services/VideoService.js");
const Util = require("../util/util.js");

async function getFeed(req, res) {
  try {
    const numberOfVideos = 10;
    const mostViewed = await VideoService.getTopVideos(numberOfVideos);
    const randomVideos = await VideoService.getRandomVideos(numberOfVideos, mostViewed);
    const videoList = Util.randomizeArray([...mostViewed, ...randomVideos]);

    console.log("Fetching video list ended successfully");
    res.status(200).json(videoList);
  } catch (error) {
    console.error("Error fetching video list: ", error);
    res.status(500).json({
      error: error.message,
    });
  }
}

async function getUserVideoList(req, res) {
  const userId = req.params.id;
  try {
    const userVideoList = await VideoService.getUserVideoList(userId);
    console.log("Fetched creator video list successfully");
    res.status(200).json(userVideoList);
  } catch (error) {
    console.error("Error fetching creator video list:", userId, error);
    res.status(500).json({
      error: error.message,
    });
  }
}

async function getVideo(req, res) {
  const videoId = req.params.pid;
  try {
    const video = await Video.findById(videoId);

    if (video == null) {
      throw error;
    }

    console.log("Fetched video successfully");
    res.status(200).json(video);
  } catch (error) {
    console.error("Error fetching video:", videoId, error);
    res.status(500).json({
      error: error.message,
    });
  }
}

async function updateVideo(req, res) {
  const videoId = req.params.pid;
  const newData = req.body;

  try {
    const result = await Video.findByIdAndUpdate(videoId, { $set: newData }, { new: true });
    if (result == null) {
      throw error;
    }
    console.log("Updated video successfully");
    res.status(200);
  } catch (error) {
    console.error("Error updating video:", videoId, error);
    res.status(500).json({
      error: error.message,
    });
  }
}

async function createVideo(req, res) {
  const userId = req.params.id;
  try {
    const videoData = await Video.createVideo(userId);
    console.log("Video upload processed successfully");
    res.status(201).json(videoData);
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({
      error: error.message,
    });
  }
}

async function deleteVideo(req, res) {
  const videoId = req.params.pid;
  const userId = req.params.userId;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Video.deleteVideo(videoId, userId);
    const user = await user.findById(userId);
    const video = await video.findById(videoId);

    const result = await video.deleteOne({ _id: videoId, user_id: userId }).session(session);
    if (result.deletedCount === 0) {
      throw new Error("Video not found");
    }

    await user.updateOne({ _id: userId }, { $pull: { videos: videoId } }).session(session);
    await session.commitTransaction();

    console.log("Deleted video successfully");
    res.status(200);
  } catch (error) {
    console.error("Error deleting video:", videoId, error);
    res.status(500).json({
      error: error.message,
    });
  }
}

module.exports = { getFeed, getUserVideoList, getVideo, updateVideo, createVideo, deleteVideo };
