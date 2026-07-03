const File = require('../models/files.model.js')
const fs = require('fs')

const uploadFfile =async(req,res)=>{
    try{
        const file = req.file;
        const {Filename} =req.body;
        console.log(file)

        const payload = {
            FileName:Filename,
            Size:file.size,
            Type:file.mimetype,
            FilePath:file.path
        }
   const filedescription =    await File.create(payload);

       res.status(200).json({message:"uploaded",filedescription})
     
    }catch(err){
        res.status(500).json({message:err.message})
    }
} 

const fetchFileById = async(req,res)=>{
    try{
        
      const {id } = req.params;

    const file =  await File.findById(id);

    if(!file)
        return res.status(404).json({message:"file not found"})

    res.status(200).json({file})
  
    }catch(err){
        res.status(500).json({message:err.message})
    }

}

const deleteFile =async(req,res)=>{
    try{
          const {id} =req.params;

          const file = await File.findById(id)

          const filedeleted =  await File.findByIdAndDelete(id);

          if(!filedeleted)
            return res.status(404).json({message:"file not found"})


          fs.unlinkSync(file.FilePath,(err)=>{
              console.log(err)
          })

          

          res.status(200).json({message:"Sucessfully deleated"})


    }catch(err){
        res.status(500).json({message:err.message})
    }

}

const downloadFile = async(req,res)=>{
    try{
       const {id} = req.params;

       const file = await File.findById(id);
       if(!file)
        res.status(404).json({message:"File not found"})

      const absolutePath = `${process.cwd()}/${file.FilePath}`

      res.status(200).download(absolutePath)

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const fetchFile = async(req,res)=>{
    try{
        const files = await File.find().sort({createdAt:-1}).limit(10);
        res.status(200).json({files})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
 
module.exports = {
    uploadFfile,
    fetchFile,
    deleteFile,
    downloadFile,
    fetchFileById
}



// {
//   fieldname: 'image',
//   originalname: 'Screenshot 2026-06-16 at 4.12.12 PM.png',
//   encoding: '7bit',
//   mimetype: 'image/png',
//   path: 'uploads/2ff9b103-6410-4781-8be6-5dc56ee968f4Screenshot 2026-06-16 at 4.12.12 PM.png',
//   destination: 'uploads/',
//   filename: '2ff9b103-6410-4781-8be6-5dc56ee968f4Screenshot 2026-06-16 at 4.12.12 PM.png',
//   size: 452060
// }