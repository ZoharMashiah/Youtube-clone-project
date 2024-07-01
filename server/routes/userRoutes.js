const express = require("express");
const { createUser, createUserForLogin, getAllUsers, getUser, deleteUser, updateUser } = require("../controllers/Users");
const videoRouter = require("./videoRoutes");

const userRouter = express.Router({ mergeParams: true });

userRouter.get("/", getAllUsers);
userRouter.post("/signup", createUser);
userRouter.get("/:userId", getUser);
userRouter.patch("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);

userRouter.use("/:userId/videos", videoRouter);

module.exports = userRouter;

