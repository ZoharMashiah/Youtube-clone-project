const express = require("express");
const { createUserForLogin, getToken } = require("../controllers/Users");

const tokenRouter = express.Router();

tokenRouter.post("/", createUserForLogin);
tokenRouter.get("/:token", getToken);

module.exports = tokenRouter;