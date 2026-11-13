// this is for creating user schema

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true,'Name is required'],
        trim: true // to remove whitespaces
    },
    email:{
        type:String,
        required : ['true', 'Email is required'],
        unique : true,
        lowercase : true,
        trim: true
    },
    password:{  
        type:String,
        required : ['true', 'Password is required'],
    },
    isVerified: {
        type : String,
        default : null
    },
    otp:{
        type : String,
        default : 0
    },
    otpExpiry:{
        type : Date,
        default : null
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;