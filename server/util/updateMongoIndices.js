const mongoose = require("mongoose");
const Video = require("../models/Video");
const User = require("../models/User");
const Comment = require("../models/Comment");
require("dotenv").config({ path: `../config/.env.local` });

async function updateMongoIndices() {
  try {
    await mongoose.connect(process.env.MONGO_LINK);
    console.log("Connected to MongoDB");

    console.log("Syncing Video indices...");
    const videoResult = await Video.syncIndexes();
    console.log("Video indices synced:", videoResult);

    console.log("Syncing User indices...");
    const userResult = await User.syncIndexes();
    console.log("User indices synced:", userResult);

    console.log("Syncing Comment indices...");
    const commentResult = await Comment.syncIndexes();
    console.log("Comment indices synced:", commentResult);

    console.log("All indices updated successfully");
  } catch (error) {
    console.error("Error updating indices:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

updateIndices();
