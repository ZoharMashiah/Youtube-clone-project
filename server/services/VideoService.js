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
        .limit(numberOfVideos);

      return videos;
    } catch (error) {
      console.log("Error fetching top videos");
      throw error;
    }
  }

  static async getUnchosenVideos(numberOfVideos, notIn) {
    try {
      const videos = await Video.aggregate([
        { $match: { _id: { $nin: notIn.map((v) => v._id) } } },
        {
          $project: {
            comments: 0,
            video: 0,
          },
        },
        { $sample: { size: numberOfVideos } },
      ]);

      // return await this.#addUserToVideos(videos);
      return videos;
    } catch (error) {
      console.log("Error fetching random videos");
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
