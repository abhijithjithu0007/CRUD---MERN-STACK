const express = require('express')

const {create,getAllUser, getUserById, updateUser, deleteUser} = require('../controller/userController')
const route = express.Router()

route.post('/user',create)
route.get('/alluser', getAllUser)
route.get('/user/:id',getUserById)
route.put('/update/user/:id',updateUser)
route.delete('/delete/user/:id',deleteUser)



module.exports=route