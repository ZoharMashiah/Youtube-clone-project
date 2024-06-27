const express = require("express");
const videoController = require("../controllers/videoController");
const router = express.Router();

router.get("/", videoController.getFeed);

router.get("/api/users/:userId/videos", videoController.getUserVideoList);
router.post("/api/users/:userId/videos", videoController.createVideo);

router.get("/api/users/:userId/videos/:pid", videoController.getVideo);
router.patch("/api/users/:userId/videos/:pid", videoController.updateVideo);
router.delete("/api/users/:userId/videos/:pid", videoController.deleteVideo);

module.exports = router;
