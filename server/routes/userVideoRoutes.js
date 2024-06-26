const express = require("express");
const userVideoController = require("../controllers/video-userController");
const router = express.Router();

router.get("/api/users/:userId/video", userVideoController.getUserVideos);
router.post("/api/users/:userId/video", userVideoController.uploadVideo);

module.exports = router;
