exports.uploadVideo = (req, res) => {
  console.log("Reached server");
  try {
    // Access text fields
    console.log("req.body:", req.body);
    const { id, title, description, user, category, publication_date, views, like, dislike, comments, icon, video } =
      req.body;

    const videoData = {
      id,
      title,
      description,
      user,
      category,
      publication_date,
      views,
      like: likeArray,
      dislike: dislikeArray,
      comments: commentsArray,
      icon,
      video,
    };

    // Parse JSON strings back into objects
    // const likeArray = JSON.parse(like || "[]");
    // const dislikeArray = JSON.parse(dislike || "[]");
    // const commentsArray = JSON.parse(comments || "[]");

    // let icon = null;
    // let video = null;
    // let iconPath = "";
    // let videoPath = "";
    // if (req.files) {
    //   if (req.files.icon) {
    //     icon = req.files.icon;
    //     iconPath = req.body.iconPath;
    //   }
    //   if (req.files.video) {
    //     video = req.files.video;
    //     videoPath = req.body.videoPath;
    //   }
    // }
    // when theres a db, save the iconpath video path and everything to the db, and just return video id to the react
    // iconPath = `/uploads/icons/${Date.now()}_${icon.name}`;
    // icon.mv(`.${iconPath}`, (err) => {
    //   if (err) throw err;
    // });

    // videoPath = `/uploads/videos/${Date.now()}_${video.name}`;
    // video.mv(`.${videoPath}`, (err) => {
    //   if (err) throw err;
    // });
    console.log("Received data:", videoData);
    res.status(201).json({
      ok: true,
      message: "Video uploaded successfully",
      videoData: videoData,
    });
    console.log("Video upload processed successfully");
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({
      ok: false,
      message: "Failed to upload video",
      error: error.message,
    });
  }
};
