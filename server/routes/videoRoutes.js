const express = require("express");
const feedController = require("../controllers/videoController");

const router = express.Router;

router.get("/", feedController.getVideoList());
