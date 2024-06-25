const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const mongoose = require('mongoose');
const { error } = require("console");
const commentRouter = require("./routes/comments")
require('dotenv').config({path:`./config/.env.local`});

const app = express();
console.log(process.env.PORT)
mongoose.connect(process.env.MONGO_LINK)
  .then(() => {
    app.use(cors());
    app.use(express.static(path.join(__dirname, "../Web/youtube-clone/build"))); // server recognizes the build
    app.use(express.static(path.join(__dirname, "../Web/youtube-clone/public"))); // server recognizes public
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/", commentRouter);

    app.post("/api/users/:userId/video", (req, res) => {
      console.log(req.params.userId);
      try {
        res.status(201).json({
          ok: true,
          message: "Video uploaded successfully",
        });
      } catch (error) {
        console.error("Error uploading video:", error);
        res.status(500).json({
          ok: false,
          message: "Failed to upload video",
          error: error.message,
        });
      }
      console.log(req.body);
    });

    app.listen(process.env.PORT, () => console.log("Server running on port " + process.env.PORT));
  })
  .catch((error) => {
  console.log(error)
})