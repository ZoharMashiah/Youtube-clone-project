const express = require("express");
const videoController = require("../controllers/videoController");
const feedRouter = express.Router();

feedRouter.get("/api/videos", videoController.getFeed);

module.exports = feedRouter;
