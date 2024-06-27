const express = require("express");
const videoController = require("../controllers/videoController");
const commentRouter = require("./commentRoutes");

const videoRouter = express.Router({ mergeParams: true });

videoRouter.get("/", videoController.getUserVideoList);
videoRouter.post("/", videoController.createVideo);
videoRouter.get("/:videoId", videoController.getVideo);
videoRouter.patch("/:videoId", videoController.updateVideo);
videoRouter.delete("/:videoId", videoController.deleteVideo);

videoRouter.use("/:videoId/comments", commentRouter);

module.exports = videoRouter;
