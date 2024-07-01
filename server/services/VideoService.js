const Video = require("../models/Video");
const User = require("../models/User")

class VideoService {
  static async getTopVideos(numberOfVideos) {
    try {
      return await Video.find({}).sort({ views: -1 }).limit(numberOfVideos);
    } catch (error) {
      console.log("Error fetching top videos");
      throw error;
    }
  }

  static async getRandomVideos(numberOfVideos, notIn) {
    try {
      const randomVideos = await Video.aggregate([
        { $match: { _id: { $nin: notIn.map((v) => v._id) } } },
        { $sample: { size: numberOfVideos } },
      ]);
      return randomVideos;
    } catch (error) {
      console.log("Error fetching random videos");
      throw error;
    }
  }

  static async getUserVideoList(userId) {
    const user = await User.findById({_id:userId})
    console.log(user)
    const userVideoList = await User.findById(userId, "videos").sort({ title: 1 });
    return userVideoList;
  }
}

module.exports = VideoService;
