const history = require('../models/history.model')
const fechhistory =async(req,res)=>{
 try{
    
   const userId = req.params._id;
   console.log("userId",userId)     
     const historydata = await history.find({user: userId},{reciver:1,_id:0,createdAt:1}).populate('file','FileName').sort({createdAt:-1})

    res.status(200).json({sucess:true,history:historydata})


 }catch(err){
    console.log(err.response? err.response.data:err.message)
 } 

}

module.exports = {fechhistory}