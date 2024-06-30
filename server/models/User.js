const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
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
  videos: [Schema.Types.ObjectId],
  settings: {
    type: Object,
    required: true,
  },
});

// const userSchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   firstName: {
//     type: String,
//     required: true,
//   },
//   middleName: {
//     type: String,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
//   birthdate: {
//     type: String,
//     required: true,
//   },
//   photo: {
//     type: String,
//   },
//   videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "video" }],
//   settings: {
//     type: Object,
//     required: true,
//   },
//   history: [{ type: mongoose.Schema.Types.ObjectId, ref: "video" }],
//   settings: {
//     type: Object,
//     required: true,
//   },
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
//   settings: {
//     type: Object,
//     required: true,
//   },
//   dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
//   settings: {
//     type: Object,
//     required: true,
//   },
// });

module.exports = mongoose.model("User", userSchema);
