const express = require("express")
const {postComment, postCommentInsideComment, getAllComments, getOneComment, deleteOneComment, updateOneComment, deleteComments} = require("../controllers/comments")
const router = express.Router()

router.post("/api/users/:userId/video/:videoId/comment", postComment)
router.get("/api/users/:userId/video/:videoId/comment", getAllComments)
router.post("/api/users/:userId/video/:videoId/comment/:commentId", postCommentInsideComment)
router.get("/api/users/:userId/video/:videoId/comment/:commentId", getOneComment)
router.delete("/api/users/:userId/video/:videoId/comment/:commentId", deleteOneComment)
router.patch("/api/users/:userId/video/:videoId/comment/:commentId", updateOneComment)
router.delete("/api/users/:userId/video/:videoId/comment", deleteComments)

module.exports = router