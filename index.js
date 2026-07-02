const dotenv = require('dotenv').config()

const mongoose = require('mongoose')
 mongoose.connect(process.env.DB)

 const express = require('express')
 const cors = require('cors')
 const multer  = require('multer')
 const {v4:uniqueId} = require('uuid')
 const Storage = multer.diskStorage({
    destination:(req,files,next)=>{
       
        next(null,'uploads/')
    },
    filename:(req,files,next)=>{
        const originalname = files.originalname;
        const uniquename  = uniqueId()+originalname

        next(null,uniquename)
}
 })
const upload = multer({storage:Storage})


 const {registerUser,LoginUser} = require('./controller/user.controller.js')
 const {uploadFfile,fetchFile,deleteFile,downloadFile} = require('./controller/files.controller.js')
 const {fetchDashboardDetails } = require('./controller/dashboard.controller.js')
 const app = express()
 const path = require('path')
 const Port = process.env.PORT || 8080;
  app.listen(Port,()=>console.log("server is listening on Port:",Port))
 
 app.use(express.json());
 app.use(express.static('view'))
 app.use(cors({
    origin:"*"
 }))

 const pathfinder = (filename)=>{

    return path.join(process.cwd(),'view',filename)
 }

 
// Routes frontend
 app.get('/login',(req,res)=>{
    res.sendFile(pathfinder('index.html'))
 })
 app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/view')
 })
 app.get('/dashboard',(req,res)=>{
    res.sendFile(pathfinder('app/dashboard.html'))
 })
 app.get('/signup',(req,res)=>{
    res.sendFile(pathfinder('sinup.html'))
 })
 app.get('/files',(req,res)=>{
    res.sendFile(pathfinder('app/files.html'))
 })
 app.get('/history',(req,res)=>{
    res.sendFile(pathfinder('app/history.html'))
 })

// Routes backend

 app.post('/api/user',registerUser)
 app.post('/api/login',LoginUser)
 app.post('/api/file',upload.single('image'),uploadFfile)
 app.get('/api/file/:id',fetchFile)
 app.delete('/api/file/:id',deleteFile)
 app.get('/api/file/download/:id',downloadFile)
 app.get('/api/dashboard',fetchDashboardDetails )




  