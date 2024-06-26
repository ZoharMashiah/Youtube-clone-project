const express = require("express");
const videoController = require("../controllers/videoController");
const router = express.Router();

router.get("/api/users/:userId/videos/:pid", videoController.getVideo);
router.patch("/api/users/:userId/videos/:pid", videoController.editVideo);
router.patch("/api/users/:userId/videos/:pid", videoController.updateVideo);
router.delete("/api/users/:userId/videos/:pid", videoController.deleteVideo);

module.exports = router;
