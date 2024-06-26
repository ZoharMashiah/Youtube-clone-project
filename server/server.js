const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://zoharmashiah:V5BU8uOWvDTWTPr6@zohar.lnkxns4.mongodb.net/api";

const videoRoutes = require("./routes/videoRoutes");
const userVideoRoutes = require("./routes/userVideoRoutes");

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "../Web/youtube-clone/build")));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());

app.use("/api/videos", videoRoutes);
app.use("/api/users/:userId/video", userVideoRoutes);

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongoose");
  })
  .catch((error) => {
    console.log("Error connecting to mongoose: ", error);
  });

app.listen(3000, () => console.log("Server running on port 3000"));
