const User = require('../models/user.model.js')
const bcrypt = require('bcrypt')

const registerUser =async(req,res)=>{
    try{
      
        const {Name,Email,Mobile,Password} = req.body;

        if(!Name || !Email || !Mobile ||!Password)
            return res.json("Please Filled The Creadential")

        const payload = {
            Name,
            Email,
            Password,
            Mobile
        }

        await User.create(payload)

        res.status(200).json({message:"User Registered Sucessfully"})
        

    }catch(err){
       
      res.status(500).json({message:err.message})
      
    }
}

const LoginUser = async(req,res)=>{
     try{

        const {Password,Email} = req.body;
        if(!Password || !Email)
          return  res.status(400).json({message:"Please fill the creadentials"})

        const user = await User.findOne({Email},{createdAt:0,updatedAt:0,Mobile:0});

        const isLogin = bcrypt.compare(Password,user.Password)

        if(!isLogin)
            res.status(401).json({message:"Invailed Creadentials"})

        res.status(200).json({message:"Loginn Sucessfully",user})

     }catch(err){
        res.status(500).json({message:err.message})
     }
} 
 

module.exports = {
    registerUser,
    LoginUser
}