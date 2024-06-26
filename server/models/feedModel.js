async function getTopVideos(numberOfVideos) {
  try {
    return await video.find({}).sort({ views: -1 }).limit(numberOfVideos);
  } catch (error) {
    console.log("Error fetching videos");
    throw error;
  }
}

async function getRandomVideos(numberOfVideos, notIn) {
  try {
    const randomVideos = await video.aggregate([{ $match: { $nin: notIn } }, { $sample: { size: numberOfVideos } }]);

    return randomVideos;
  } catch (error) {
    console.log("Error fetching videos random");
    throw error;
  }
}

export { getTopVideos, getRandomVideos };
