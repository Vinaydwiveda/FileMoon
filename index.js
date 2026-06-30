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
 const Port = process.env.PORT || 8080;
  app.listen(Port,()=>console.log("server is listening on Port:",Port))
 
 app.use(express.json());
 app.use(express.static('view'))
 app.use(cors({
    origin:"*"
 }))





 app.post('/user',registerUser)
 app.post('/login',LoginUser)
 app.post('/file',upload.single('image'),uploadFfile)
 app.get('/file/:id',fetchFile)
 app.delete('/file/:id',deleteFile)
 app.get('/file/download/:id',downloadFile)
 app.get('/dashboard',fetchDashboardDetails )




  