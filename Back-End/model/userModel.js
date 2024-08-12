const mongoose = require('mongoose')
const userSchemas = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
})

const userSchema = mongoose.model('User', userSchemas);
module.exports = userSchema;

