const mongoose = require('mongoose')
const user = new mongoose.Schema({
    username:{type: String, required: true, unique: true },
    email:{type: String, required: true, unique: true },
    password:{type: String, required: true},
    Avatar:{type: String , default:"http://localhost:3007/Avatars/male8.png"},
    isOnline:{
        type:Boolean,
        default: 0 
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})
const signupModel = mongoose.model('User',user)
module.exports = signupModel