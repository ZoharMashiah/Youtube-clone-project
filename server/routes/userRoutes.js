const express = require("express");
const { createUser, getUser, deleteUser, updateUser } = require("../controllers/users");
const videoRouter = require("./videoRoutes");

const userRouter = express.Router({ mergeParams: true });

userRouter.get("/:id", getUser);
userRouter.post("/signup", createUser);
userRouter.patch("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

userRouter.use("/:id/videos", videoRouter);

module.exports = userRouter;
