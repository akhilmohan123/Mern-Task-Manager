const mongoose=require("mongoose")

const taskSchema=new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    }
})

const taskModel = new mongoose.model("Tasks", taskSchema)
module.exports=taskModel