const User = require("../models/User");
const videoController = require("./videoController");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//get a single user
const getUser = async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ message: `User with id ${userId} not valid` });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ message: `User with id ${userId} not found` });
  }
  res.status(200).json(user);
};

//create a user
const createUser = async (req, res) => {
  try {
    const { username, password, firstName, middleName, lastName, birthdate, photo, videos, settings } = req.body;
    let picture;
    if (photo == null) {
      picture = process.env.DEFAULT_PHOTO;
    } else {
      picture = photo;
    }
    const user = await User.create({
      username,
      password,
      firstName,
      middleName,
      lastName,
      birthdate,
      photo: picture,
      videos,
      settings,
    });
    const token = jwt.sign({ userId: user._id }, "SECRET_KEY", { expiresIn: "5h" });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update a user
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const authUser = req.user;
  console.log(" au", authUser);

  if (authUser._id.toString() !== userId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ message: `User with id ${userId} not valid` });
  }
  const user = await User.findByIdAndUpdate({ _id: userId }, { ...req.body }, { new: true });
  if (!user) {
    return res.status(400).json({ message: `User with id ${userId} not found` });
  }
  res.status(200).json(user);
};

//delete a user
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const authUser = req.user;
  console.log(" au", authUser);

  if (authUser._id.toString() !== userId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ message: `User with id ${userId} not valid` });
  }
  const userCheck = await User.findById({ _id: userId });
  if (!userCheck) {
    return res.status(400).json({ message: `User with id ${userId} not found` });
  }
  const videosDeleted = await videoController.deleteAllVideos(userId);
  if (!videosDeleted) {
    return res.status(400).json({ message: `Error deleting videos for user with id ${userId}` });
  }
  const user = await User.findByIdAndDelete({ _id: userId });
  if (!user) {
    return res.status(400).json({ message: `User with id ${userId} not found` });
  }
  res.status(200).json(user);
};

const createUserForLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log("Finding user");
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    if (password !== user.password) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    console.log("Found:", user.username);

    const token = jwt.sign({ userId: user._id }, "SECRET_KEY", { expiresIn: "5h" });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyToken = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(404).json({ message: "Invalid token" });
  }
};

module.exports = {
  createUser,
  getUser,
  deleteUser,
  updateUser,
  createUserForLogin,
  verifyToken,
};
