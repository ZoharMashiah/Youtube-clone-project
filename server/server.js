const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const mongoose = require("mongoose");

const feedRouter = require("./routes/feedRoutes");
const userRouter = require("./routes/userRoutes");
require("dotenv").config({ path: `./config/.env.local` });
console.log("Starting server...");

const app = express();
mongoose
  .connect(process.env.MONGO_LINK)
  .then(() => {
    app.use(cors());
    console.log("Starting server...");
    app.use(express.static(path.join(__dirname, "../Web/youtube-clone/build")));
    console.log("Starting server...");
    app.use(bodyParser.json({ limit: "50mb" }));
    console.log("Starting server...");
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    console.log("Starting server...");
    app.use(fileUpload());
    console.log("Starting server...");
    app.use("/", feedRouter);
    console.log("Starting server...");
    app.use("/api/users", userRouter);

    app.listen(process.env.PORT, () => console.log("Server running on port " + process.env.PORT));
    console.log("Connected to mongoose");
  })
  .catch((error) => {
    console.log("Error connecting to mongoose: ", error);
  });
