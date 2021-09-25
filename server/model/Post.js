const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    desc:{
        type: String
    },
    image:{
        type: String,
        default:""
    },
    likes:{
        type: Array,
        default:[]
    },
},{timestamps:true})

module.exports = mongoose.model("Post", PostSchema)