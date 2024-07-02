const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
// const jwt = require("jsonwebtoken");
// const session = require("express-session");
const mongoose = require("mongoose");

const feedRouter = require("./routes/feedRoutes");
const userRouter = require("./routes/userRoutes");
const tokenRouter = require("./routes/tokenRoutes");
require("dotenv").config({ path: `./config/.env.local` });

const app = express();
mongoose
  .connect(process.env.MONGO_LINK)
  .then(() => {
    app.use(cors());
    app.use(express.static(path.join(__dirname, "../Web/youtube-clone/build")));
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    app.use(fileUpload());
    app.use("/", feedRouter);
    app.use("/api/users", userRouter);
    app.use("/api/tokens", tokenRouter);
    app.get("*", (req, res) => {
      res.sendFile(path.resolve('../Web/youtube-clone', 'build', 'index.html'));
    })

    app.listen(process.env.PORT, () => console.log("Server running on port " + process.env.PORT));
    console.log("Connected to mongoose");
  })
  .catch((error) => {
    console.log("Error connecting to mongoose: ", error);
  });
