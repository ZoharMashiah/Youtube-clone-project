const Video = require("../models/Video");
const User = require("../models/User.js");
const VideoService = require("../services/VideoService.js");
const Util = require("../util/util.js");
const {sendStringToServer} = require('../tcpClient.js');

async function getFeed(req, res) {
  try {
    console.log("Fetching feed...");
    const numberOfVideos = 10;
    const mostViewed = await VideoService.getTopVideos(numberOfVideos);
    const unchosenVideos = await VideoService.getUnchosenVideos(numberOfVideos, mostViewed);
    const videoList = Util.randomizeArray([...mostViewed, ...unchosenVideos]);

    console.log("Fetching videos ended successfully");
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
    console.log("Fetching user video list...");
    const userVideoList = await VideoService.getUserVideoList(userId);
    console.log("Fetching user video list successfully");
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
  const authUser = req.user;
  try {
    const video = await Video.findByIdAndUpdate(videoId, { $inc: { views: 1 } }, { new: true, runValidators: true });
    let suggested = [];
    if (authUser != null | undefined) {
      const user = await User.findById({ _id: authUser._id })
      var history = user.history
      let recived = '';
      let message = "1|" + videoId
      for (let i = 0; i < history.length; i++) {
        message += "," + history[i]
      }
      recived = await sendStringToServer(message)
      if (!history.includes(videoId)) {
        history = [...user.history, videoId]
      }
      await User.findByIdAndUpdate({ _id: authUser._id }, { history: history })
      if (recived != undefined)
        suggested = recived.split(" ")
    }
    let suggestedVideos = await VideoService.getSuggestedVideos(suggested, 10, [videoId]);
    let ids = suggestedVideos.map((v) => v._id);
    console.log("Fetching video ended successfully :",ids);
    if (!video) {
      console.error("Video was not found", videoId, error);
      throw error;
    }

    console.log("Fetched video successfully");
    // pass the video and suggested videos to the client
    res.status(200).json(video);
  } catch (error) {
    console.error("Error fetching video:", videoId, error);
    res.status(500).json({
      error: error.message,
    });
  }
}

async function updateVideo(req, res) {
  const userId = req.params.id;
  const authUser = req.user;

  if (authUser._id.toString() !== userId) {
    return res.status(401).json({ message: "Authentication required to update video" });
  }

  const videoId = req.params.pid;
  const newData = req.body;

  try {
    const result = await Video.findByIdAndUpdate(videoId, { $set: newData }, { new: true });
    if (result == null) {
      throw error;
    }
    console.log("Updated video successfully");
    res.status(200).json();
  } catch (error) {
    console.error("Error updating video:", videoId, error);
    res.status(500).json({
      error: error.message,
    });
  }
}

async function createVideo(req, res) {
  const userId = req.params.id;
  const authUser = req.user;

  if (authUser._id.toString() !== userId) {
    return res.status(401).json({ message: "Authentication required to create a video" });
  }

  const video = req.body;

  try {
    const newVideo = await Video.createVideo(video);
    const videoData = await Video.findById(newVideo._id).select("-comments -video");

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
  const userId = req.params.id;
  const authUser = req.user;

  if (authUser._id.toString() !== userId) {
    return res.status(401).json({ message: "Authentication required to delete video" });
  }

  const videoId = req.params.pid;

  try {
    await Video.deleteVideo(videoId, userId);
    res.status(200).json({ message: "Video deleted successfully" });
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
      throw new Error(`User with id ${userId} not found`);
    }

    const deletionPromises = user.videos.map((video) => Video.deleteVideo(video._id, userId));
    await Promise.all(deletionPromises);

    console.log("All videos deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting videos:", error);
    throw error;
  }
}

async function filterVideos(req, res) {
  const { search, text } = req.body;

  try {
    let filtered;
    if (search) {
      filtered = (
        await Video.find(
          {},
          {
            comments: 0,
            video: 0,
          }
        )
      ).filter((video) => video.title.toLowerCase().includes(text.toLowerCase()));
    } else {
      filtered = await Video.find(
        { category: text },

        {
          comments: 0,
          video: 0,
        }
      ).lean();
    }
    console.log(filtered);
    res.status(200).json(filtered);
  } catch (error) {
    console.error("Error filtering videos");
    res.status(500).json({
      error: error.message,
    });
  }
}

const pushLikeOrDisLike = async (req, res) => {
  const videoId = req.params.pid;
  const { action, userId } = req.body;
  try {
    const video = await Video.findById({ _id: videoId });
    const user = await User.findById({ _id: userId });

    if (action == "like") {
      if (user.likes.includes(videoId)) {
        await User.findByIdAndUpdate({ _id: userId }, { likes: user.likes.filter((video) => video._id != videoId) });
        await Video.findByIdAndUpdate({ _id: videoId }, { like: video.like - 1 });
        return res.status(200);
      }
      if (user.dislikes.includes(videoId)) {
        await User.findByIdAndUpdate(
          { _id: userId },
          { dislikes: user.dislikes.filter((video) => video._id != videoId) }
        );
        await Video.findByIdAndUpdate({ _id: videoId }, { dislike: video.dislike - 1 });
      }
      await User.findByIdAndUpdate({ _id: userId }, { likes: [...user.likes, videoId] });
      await Video.findByIdAndUpdate({ _id: videoId }, { like: video.like + 1 });
    } else {
      if (user.dislikes.includes(videoId)) {
        await User.findByIdAndUpdate(
          { _id: userId },
          { dislikes: user.dislikes.filter((video) => video._id != videoId) }
        );
        await Video.findByIdAndUpdate({ _id: videoId }, { dislike: video.dislike - 1 });
        return res.status(200);
      }
      if (user.likes.includes(videoId)) {
        await User.findByIdAndUpdate({ _id: userId }, { likes: user.likes.filter((video) => video._id != videoId) });
        await Video.findByIdAndUpdate({ _id: videoId }, { like: video.like - 1 });
      }
      await User.findByIdAndUpdate({ _id: userId }, { dislikes: [...user.dislikes, videoId] });
      await Video.findByIdAndUpdate({ _id: videoId }, { dislike: video.dislike + 1 });
    }
    res.status(200);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getFeed,
  getUserVideoList,
  getVideo,
  updateVideo,
  createVideo,
  deleteVideo,
  filterVideos,
  deleteAllVideos,
  pushLikeOrDisLike,
};
