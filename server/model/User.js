const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        deafult:""
    },
    desc: {
        type: String,
        default:""
    },
    mobileNumber: {
        type: Number,
        unique: true,
        default:""
    },
    link: {
        type: String,
        default:""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    subtitle:{
        type:String,
        default:""
    },
    work:{
        type:String,
        default:""
    }
}, { timestamps: true })

module.exports = mongoose.model("User", UserSchema)