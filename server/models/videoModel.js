const mongoose = require("mongoose");
const VideoModel = require("./userVideoModel/VideoModel");

async function getVideo(videoId) {
  try {
    return await async function updateVideo(videoId, newData) {
      try {
        const video = await video.findById(videoId);
        const updatedVideo = await video.findByIdAndUpdate(videoId, { $set: newData }, { new: true });

        return updatedVideo;
      } catch (error) {
        throw error;
      }
    }.findById(videoId);
  } catch (error) {
    throw error;
  }
}

async function updateVideo(videoId, newData) {
  try {
    const updatedVideo = await video.findByIdAndUpdate(videoId, { $set: newData }, { new: true });
    return updatedVideo;
  } catch (error) {
    throw error;
  }
}

async function editVideo(videoId, newData) {
  try {
    const editedVideo = await video.findByIdAndUpdate(videoId, { $set: newData }, { new: true });

    return editedVideo;
  } catch (error) {
    throw error;
  }
}

async function deleteVideo(videoId, userId) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await user.findById(userId);
    const video = await video.findById(videoId);

    const result = await video.deleteOne({ _id: videoId, user_id: userId }).session(session);
    if (result.deletedCount === 0) {
      throw new Error("Video not found");
    }

    await user.updateOne({ _id: userId }, { $pull: { videos: videoId } }).session(session);
    await session.commitTransaction();

    return 0;
  } catch (error) {
    throw error;
  }
}

export { getVideo, updateVideo, editVideo, deleteVideo };
