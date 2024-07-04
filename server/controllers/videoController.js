const Video = require("../models/Video");
const User = require("../models/User.js");
const VideoService = require("../services/VideoService.js");
const Util = require("../util/util.js");

async function getFeed(req, res) {
  try {
    const numberOfVideos = 10;
    const mostViewed = await VideoService.getTopVideos(numberOfVideos);
    const unchosenVideos = await VideoService.getUnchosenVideos(numberOfVideos, mostViewed);
    const videoList = Util.randomizeArray([...mostViewed, ...unchosenVideos]);

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
  console.log(req);
  try {
    console.log("***********id", videoId);
    const video = await Video.findById(videoId);

    console.log("***********vid", video);

    if (video == null) {
      console.error("Video is null", videoId, error);
      throw error;
    }

    console.log("Fetched video successfully");
    console.log("***********VIDEO", video);
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
  const video = req.body;
  try {
    const videoData = await Video.createVideo(video);
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
  const userId = req.params.id;
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

    await User.updateOne({ _id: userId }, { $pull: { videos: videoId } }).session(session);
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

async function deleteAllVideos(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: `User with id ${userId} not found` });
    }
    user.videos.map(async (video) => {
      console.log(video._id);
      await Video.deleteVideo(video._id, userId);
    });

    console.log("Deleted video successfully");
    return true;
  } catch (error) {
    console.error("Error deleting video:", error);
    return false;
  }
}

async function filterVideos(req, res) {
  const videoId = req.params.pid;
  const { search, text } = req.body;

  try {
    let filtered;
    if (search) {
      filtered = (await Video.find({})).filter((video) => video.title.toLowerCase().includes(text.toLowerCase()));
    } else {
      filtered = await Video.find({ category: text });
    }
    res.status(200).json(filtered);
  } catch (error) {
    console.error("Error deleting video:", videoId, error);
    res.status(500).json({
      error: error.message,
    });
  }
}

module.exports = {
  getFeed,
  getUserVideoList,
  getVideo,
  updateVideo,
  createVideo,
  deleteVideo,
  filterVideos,
  deleteAllVideos,
};
