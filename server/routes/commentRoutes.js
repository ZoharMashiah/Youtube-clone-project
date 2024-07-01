const express = require("express");
const {
  postComment,
  postCommentInsideComment,
  getAllComments,
  getOneComment,
  deleteOneComment,
  updateOneComment,
  deleteComments
} = require("../controllers/comments");
const commentRouter = express.Router({ mergeParams: true });

commentRouter.post("/", postComment);
commentRouter.get("/", getAllComments);
commentRouter.post("/:commentId", postCommentInsideComment);
commentRouter.get("/:commentId", getOneComment);
commentRouter.delete("/:commentId", deleteOneComment);
commentRouter.patch("/:commentId", updateOneComment);
commentRouter.delete("/", deleteComments)

module.exports = commentRouter;
