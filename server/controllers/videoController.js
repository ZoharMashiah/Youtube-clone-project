exports.uploadVideo = (req, res) => {
  console.log(req.params.userId);
  try {
    res.status(201).json({
      ok: true,
      message: "Video uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({
      ok: false,
      message: "Failed to upload video",
      error: error.message,
    });
  }
  console.log(req.body);
};
