const express = require("express");
const { createUserForLogin, verifyToken } = require("../controllers/users");

const tokenRouter = express.Router();

tokenRouter.post("/", createUserForLogin);
tokenRouter.get("/", verifyToken);

module.exports = tokenRouter;
