const express = require("express");
const userVideoController = require("../controllers/userVideoController");
const router = express.Router();

router.get("/api/users/:userId/videos", userVideoController.getUserVideos);
router.post("/api/users/:userId/videos", userVideoController.uploadVideo);

module.exports = router;
