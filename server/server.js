const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const mongoose = require('mongoose');
const videoRoutes = require("./routes/videoRoutes");
const commentRouter = require("./routes/comments")
require('dotenv').config({path:`./config/.env.local`});

const app = express();
mongoose.connect(process.env.MONGO_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.use(cors());
    app.use(express.static(path.join(__dirname, "../Web/youtube-clone/build"))); // server recognizes the build
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    app.use(fileUpload());
    app.use(videoRoutes); // server recognizes public

    app.use("/", commentRouter);

    app.listen(process.env.PORT, () => console.log("Server running on port " + process.env.PORT));
  })
  .catch((error) => {
    console.log("Error connecting to mongoose: ", error);
})