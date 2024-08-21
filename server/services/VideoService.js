const Video = require("../models/Video");
const User = require("../models/User");
const mongoose = require("mongoose");

class VideoService {
  static async getTopVideos(numberOfVideos) {
    const latency = await VideoService.measureDatabaseLatency();
    console.log(`Database latency: ${latency}ms`);
    const startQuery = Date.now();

    try {
      const videos = await Video.find(
        {},
        {
          comments: 0,
          video: 0,
        }
      )
        .sort({ views: -1 })
        .limit(numberOfVideos)
        .lean();

      const endQuery = Date.now();
      console.log(`Query execution time: ${endQuery - startQuery}ms`);
      console.log(`Total operation time: ${endQuery - startQuery + latency}ms`);
      return videos;
    } catch (error) {
      console.log("Error fetching top videos");
      throw error;
    }
  }

  static async getSuggestedVideos(videoIds, numberOfVideos, excludeVideoIds = []) {
    const latency = await VideoService.measureDatabaseLatency();
    console.log(`Database latency: ${latency}ms`);
    const startQuery = Date.now();
    try {
      // Fetch videos by IDs, sorted by views.
      let videos = await Video.find(
        {
          _id: { $in: videoIds.filter(id => !excludeVideoIds.includes(id)) }
        },
        {
          comments: 0,
          video: 0,
        }
      )
      .sort({ views: -1 })
      .limit(numberOfVideos)
      .lean();
  
      // If the fetched videos are less than required, fetch additional random videos.
      if (videos.length < numberOfVideos) {
        const additionalVideos = await Video.aggregate([
          {
            $match: {
              _id: { $nin: [...videoIds, ...excludeVideoIds, ...videos.map(v => v._id)] }
            }
          },
          { $sample: { size: numberOfVideos - videos.length } }, // Randomly sample remaining videos.
          {
            $project: {
              comments: 0,
              video: 0,
            }
          },
        ]);
  
        videos = videos.concat(additionalVideos);
      }
  
      const endQuery = Date.now();
      console.log(`Query execution time: ${endQuery - startQuery}ms`);
      console.log(`Total operation time: ${endQuery - startQuery + latency}ms`);
      return videos;
    } catch (error) {
      console.log("Error fetching suggested videos");
      throw error;
    }
  }
  

  static async getUnchosenVideos(numberOfVideos, chosenVideos) {
    try {
      if (!Array.isArray(chosenVideos)) {
        throw new Error("chosenVideos must be an array");
      }

      const chosenIds = chosenVideos.map((v) => v._id).filter(Boolean);
      const query = { _id: { $nin: chosenIds } };
      const projection = { comments: 0, video: 0 };

      const unchosenVideos = await Video.find(query, projection).limit(numberOfVideos).lean();

      return unchosenVideos;
    } catch (error) {
      console.error("Error in getUnchosenVideos:", error);
      throw error;
    }
  }

  static async getUserVideoList(userId) {
    const user = await User.findById({ _id: userId });
    const cutUser = {
      _id: user._id,
      username: user.username,
      photo: user.photo,
    };
    const userVideoList = await Video.find({ user: cutUser }).sort({ title: 1 });
    return userVideoList;
  }

  static async measureDatabaseLatency() {
    const start = Date.now();
    try {
      await mongoose.connection.db.admin().ping();
      const end = Date.now();
      return end - start;
    } catch (error) {
      console.error("Error pinging database:", error);
      return null;
    }
  }
}

module.exports = VideoService;
