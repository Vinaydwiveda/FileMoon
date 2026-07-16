const mongoose =require('mongoose')

const emailSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    reciver:{
        type:String,
        required:true,
        trim:true
    },
    file:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"File",
        required:true
    }
},{timestamps:true})

const history = mongoose.model('Email',emailSchema)

module.exports = history; 