const User = require('../model/userModel')

const create = async (req, res) => {
    try {
        const newUser = new User(req.body)
        const { email } = newUser

        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({ message: 'User Already Exist' })
        }
        const saveUser = await newUser.save()
        res.status(200).json({message:"User Created Succesfully"})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


const getAllUser = async (req, res) => {
    try {
        const userData = await User.find()
        if (!userData || userData.length === 0) {
            return res.status(404).json({ message: "User Data not found" })
        }
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const userExist = await User.findById(id)
        if (!userExist) {
            return res.status(404).json({ message: "User Data not found" })
        }
        res.status(200).json(userExist)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const userExist = await User.findById(id)
        if (!userExist) {
            return res.status(404).json({ message: "User not found" })
        }
        const update = await User.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({message:"Updated Succesfully"})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const userExist = await User.findById(id)
        if (!userExist) {
            return res.status(404).json({ message: "User not found" })
        }
        await User.findByIdAndDelete(id)
        res.status(200).json({message:"User Deleted succesfully"})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}



module.exports = {
    create,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
}

