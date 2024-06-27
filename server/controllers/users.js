const User = require("../models/users");
const mongoose = require("mongoose");


//get all users

const getAllUsers = async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
}

//get a single user
const getUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: `User with id ${id} not valid`})
    }
    const user = await User.findById(id)
    if(!user){
        return res.status(400).json({message: `User with id ${id} not found`})
    }
    res.status(200).json(user)
}

//create a user
const createUser = async (req, res) => {

    //add doc to db
    try{
        const { username, firstName, middleName, lastName, birthdate, photo, videos, settings } = req.body
        const user = await User.create({ username, firstName, middleName, lastName, birthdate, photo, videos, settings })
        res.status(200).json(user)
    }catch(error){
    res.status(400).json({error: error.message})
    }
}

//update a user
const updateUser = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: `User with id ${id} not valid`})
    }
    const user = await User.findByIdAndUpdate({ _id: id}, { ...req.body}, { new: true})
    if(!user){
        return res.status(400).json({message: `User with id ${id} not found`})
    }
    res.status(200).json(user)

}

//delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: `User with id ${id} not valid`})
    }
    const user = await User.findByIdAndDelete({ _id: id})
    if(!user){
        return res.status(400).json({message: `User with id ${id} not found`})
    }
    res.status(200).json(user)
}

module.exports = { 
    createUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser
 }