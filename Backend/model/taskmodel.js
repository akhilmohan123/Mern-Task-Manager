const mongoose=require("mongoose")

const taskSchema=new mongoose.Schema({
    task:{
        type:String
    },
    description:{
        type:String
    }
})

const taskModel = new mongoose.model("Tasks", taskSchema)
module.exports=taskModel