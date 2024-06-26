const feed = require("../models/videoModel");

exports.getRecommendedList = async (req, res) => {
  try {
    const mostViewed = await feed.getTopVideos(10);
    const randomVideos = await feed.getRandomVideos(10, mostViewed);
    const combinedArray = randomizeArray([...mostViewed, ...randomVideos]);
    console.log("Fetching list ended successfully");
    res.status(200).json(combinedArray);
  } catch (error) {
    console.error("Error fetching video list: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch video list",
      error: error.message,
    });
  }
};

function randomizeArray(arr) {
  len = arr.length;
  for (let i = len - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    let temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}
