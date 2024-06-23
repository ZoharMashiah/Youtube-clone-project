const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const session = require("express-session");

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "../Web/youtube-clone/build"))); // server recognizes the build
app.use(express.static(path.join(__dirname, "../Web/youtube-clone/public"))); // server recognizes public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/users/:userId/video", (req, res) => {
  console.log(req.body);
});

app.get("/api/test", (req, res) => {
  console.log("Connected to the react app");
  res.json({ message: "Connection successful!" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
