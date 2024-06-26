const videoModel = require("../models/videoModel");

async function getVideo(req, res) {
  const videoId = req.params.pid;
  try {
    const video = await videoModel.getVideo(videoId);

    console.log("Fetched video successfully");
    res.status(200).json(video);
  } catch (error) {
    console.error("Error fetching video:", videoId, error);
    res.status(500).json({
      error: error.message,
    });
  }
}

// views, likes, dislikes
async function updateVideo(req, res) {
  const videoId = req.params.pid;
  const newData = req.body;

  try {
    const updatedVideo = await videoModel.updateVideo(videoId, newData);

    console.log("Updated video successfully");
    res.status(200).json(updatedVideo);
  } catch (error) {
    console.error("Error updating video:", videoId, error);
    res.status(500).json({
      error: error.message,
    });
  }
}

// detail editing by the owner, such as title, description, category or thumbnail. requires authemtication.
async function editVideo(req, res) {
  const videoId = req.params.pid;
  const newData = req.body;

  try {
    const editedVideo = await videoModel.editVideo(videoId, newData);

    console.log("Edited video successfully");
    res.status(200).json(editedVideo);
  } catch (error) {
    console.error("Error editing video:", videoId, error);
    res.status(500).json({
      error: error.message,
    });
  }
}

async function deleteVideo(req, res) {
  const videoId = req.params.pid;
  const userId = req.params.userId;

  try {
    await videoModel.deleteVideo(videoId, userId);

    console.log("Deleted video successfully");
    res.status(200);
  } catch (error) {
    console.error("Error deleting video:", videoId, error);
    res.status(500).json({
      error: error.message,
    });
  }
}

export { getVideo, updateVideo, editVideo, deleteVideo };
