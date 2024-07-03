const express = require("express");
const { createUser, getAllUsers, getUser, deleteUser, updateUser } = require("../controllers/users");
const videoRouter = require("./videoRoutes");

const userRouter = express.Router({ mergeParams: true });

userRouter.get("/", getAllUsers);
userRouter.post("/signup", createUser);
userRouter.get("/:userId", getUser);
userRouter.patch("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);

userRouter.use("/:userId/videos", videoRouter);

module.exports = userRouter;
