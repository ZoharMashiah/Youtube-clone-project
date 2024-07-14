const express = require("express");
const {
  postComment,
  postCommentInsideComment,
  getAllComments,
  getOneComment,
  deleteOneComment,
  updateOneComment,
  deleteComments,
} = require("../controllers/comments");
const commentRouter = express.Router({ mergeParams: true });

commentRouter.get("/", getAllComments);
commentRouter.get("/:commentId", getOneComment);
commentRouter.post("/", postComment);
commentRouter.post("/:commentId", postCommentInsideComment);
commentRouter.patch("/:commentId", updateOneComment);
commentRouter.delete("/", deleteComments);
commentRouter.delete("/:commentId", deleteOneComment);

module.exports = commentRouter;
