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


},{timestamps:true})

const File = mongoose.model('File',fileSchema)
module.exports = File;