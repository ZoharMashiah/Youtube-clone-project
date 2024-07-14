const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  videos: {
    type: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    default: [],
  },
  likes: {
    type: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    default: [],
  },
  dislikes: {
    type: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    default: [],
  },
  settings: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
