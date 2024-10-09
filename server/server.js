const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");

const authMiddleware = require("./middleware/authMiddleware");
const feedRouter = require("./routes/feedRoutes");
const userRouter = require("./routes/userRoutes");
const tokenRouter = require("./routes/tokenRoutes");

require("dotenv").config({ path: `./config/.env.local` });

const app = express();
mongoose
  .connect(process.env.MONGO_LINK)
  .then(async () => {
    app.use(cors());
    app.use(express.static(path.join(__dirname, "../Web/youtube-clone/build")));
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    app.use(fileUpload());
    app.use(authMiddleware);
    app.use("/", feedRouter);
    app.use("/api/users", userRouter);
    app.use("/api/tokens", tokenRouter);

    const User = require("./models/User.js");
    const {sendStringToServer} = require('./tcpClient.js');
    let users = await User.find({})

    let message = "0"
    for (let i = 0; i < users.length; i++) {
      let user = users[i]
      if (user.history.length == 0) {
        continue
      }
      message += "|"
      for (let j = 0; j < user.history.length; j++) {
        message += user.history[j]
        if (j != user.history.length - 1) {
          message += ","
        }
      }
    }
    sendStringToServer(message)

    app.get("*", (req, res) => {
      res.sendFile(path.resolve("../Web/youtube-clone", "build", "index.html"));
    });

    app.listen(process.env.PORT, () => console.log("Server running on port " + process.env.PORT));
    console.log("Connected to mongoose");
  })
  .catch((error) => {
    console.log("Error connecting to mongoose: ", error);
  });
