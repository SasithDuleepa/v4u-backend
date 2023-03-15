const mongoose = require('mongoose');

const user = mongoose.Schema({
    first_name:{
        type:String,
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    user:{
        type:String,
    }
})

module.exports = mongoose.model("User", user)