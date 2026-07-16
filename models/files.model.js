const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    FileName:{
        type:String,
        trim:true,
        required:true
    },
    Size:{
        type:String,
        trim:true,
        required:true,
    },
    Type:{
        type:String,
        trim:true,
        required:true
    },
    FilePath:{
        type:String,
        trim:true,
        required:true
    },
    fileCreatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }


},{timestamps:true})

const File = mongoose.model('File',fileSchema)
module.exports = File;