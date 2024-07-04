const express = require("express");
const videoController = require("../controllers/videoController");
const commentRouter = require("./commentRoutes");

const videoRouter = express.Router({ mergeParams: true });

videoRouter.get("/", videoController.getUserVideoList);
videoRouter.post("/", videoController.createVideo);
videoRouter.get("/:pid", videoController.getVideo);
videoRouter.patch("/:pid", videoController.updateVideo);
videoRouter.delete("/:pid", videoController.deleteVideo);
videoRouter.post("/:pid/action", videoController.pushLikeOrDisLike);

videoRouter.use("/:pid/comments", commentRouter);

module.exports = videoRouter;
