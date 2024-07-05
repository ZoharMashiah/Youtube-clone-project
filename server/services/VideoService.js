const Video = require("../models/Video");
const User = require("../models/User");

class VideoService {
  static async getTopVideos(numberOfVideos) {
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
      return videos;
    } catch (error) {
      console.log("Error fetching top videos");
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
}

module.exports = VideoService;
