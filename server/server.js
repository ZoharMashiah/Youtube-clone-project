const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const jwt = require("jsonwebtoken");
const session = require("express-session");

const videoRoutes = require("./routes/videoRoutes");

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "../Web/youtube-clone/build")));
app.use(express.static(path.join(__dirname, "../Web/youtube-clone/public")));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(videoRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
