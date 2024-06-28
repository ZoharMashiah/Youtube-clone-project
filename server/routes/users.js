const express = require("express")
const router = express.Router()
const {
     createUser,
     getAllUsers,
     getUser,
     deleteUser,
     updateUser,
     createUserForLogin
     } = require("../controllers/Users")

//Create a new User
router.post("/signup", createUser);

//Login to a User with another path to avoid confusion
router.post("/login", createUserForLogin);

//Create a new User
router.post("/", createUser)

//Delete a user
router.delete("/:id", deleteUser)

//Update a User
router.patch("/:id", updateUser)

//Get User by ID
router.get("/:id", getUser)

//Get all Users
router.get("/", getAllUsers)

module.exports = router

