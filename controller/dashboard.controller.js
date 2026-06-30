const File = require('../models/files.model.js')

const fetchDashboardDetails =async (req,res)=>{
    try{
        const result = await File.aggregate([
            {$group:{_id: "$Type", total : {$sum:1}}},
            {
                $project:{
                    Type:"$_id",
                    total :1,
                    _id:0
                }
            }
            
        ])
 res.json(result)
    }catch(err){
        res.status(500).json({message:err.message})
    }

}

module.exports ={
    fetchDashboardDetails 
}