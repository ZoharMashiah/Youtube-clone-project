const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Comment = new Schema({
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  videoId: {
    type: Schema.Types.ObjectId,
    ref: "Video",
    required: true,
    index: true,
  },
  childrenIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  user: {
    type: Schema.Types.Object,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    default: Date.now,
  },
});
module.exports = mongoose.model("Comment", Comment);
