const express = require("express")
const router = express.Router()

router.post("/api/users/:userId/video/:videoId/comments/:commentsId")

module.exports = router