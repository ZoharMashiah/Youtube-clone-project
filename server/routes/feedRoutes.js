const express = require("express");
const videoController = require("../controllers/videoController");
const feedRouter = express.Router();
const { createUser, createUserForLogin } = require("../controllers/users");

feedRouter.get("/api/videos", videoController.getFeed);
feedRouter.post("/api/videos/filter", videoController.filterVideos);

//Create a new User
feedRouter.post("/signup", createUser);

//Login to a User with another path to avoid confusion
feedRouter.post("/login", createUserForLogin);

module.exports = feedRouter;
