const express = require("express");
const videoController = require("../controllers/videoController");
const router = express.Router();

router.post("/api/users/:userId/video", videoController.uploadVideo);

module.exports = router;
