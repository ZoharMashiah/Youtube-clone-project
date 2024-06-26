const express = require("express");
const user_videoController = require("../controllers/video-userController");
const router = express.Router();

router.post("/api/users/:userId/video", user_videoController.uploadVideo);

module.exports = router;
