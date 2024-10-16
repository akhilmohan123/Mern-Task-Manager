const taskModel = require("../model/taskmodel");


const createTask = async (req, res) => {
  try {
    console.log(req.body)
    const { title, description } = req.body;

    
    if (!title || !description) {
      return res.status(400).json({ message: "Task and description are required." });
    }

  
    const newTask = new taskModel({ title, description });

    
    const savedTask = await newTask.save();


    res.status(201).json({ message: "Task created successfully", task: savedTask });
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(500).json({ message: "Failed to create task", error: error.message });
  }
};

const updateTask=async (req,res)=>{
   const id=req.params.id
   try {
    const data=req.body
     await taskModel.findByIdAndUpdate(id,data).then((ress)=>res.status(200).json({ress}))
   } catch (error) {
     res.status(500).json({message:"cant update",error:error.message})
   }
}

const getAlltask=async (req,res)=>{
    try {
        let tasks=await taskModel.find({})
        res.status(200).json({data:tasks})
        if (!tasks){
            res.status(400).json({message:"Task is not found"})
        }
    } catch (error) {
        res.status(500).json({message:"failed to get all tasks",error:error.message})
    }
}
const deletetask = async (req, res) => {
  const { id } = req.params; 
  try {
    const deletedTask = await taskModel.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' }); 
    }
    res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
}
const getspecefic=async (req,res)=>{
 const id =req.params.id
  let task=await taskModel.find({_id:id})
  if(!task){
    res.status(500).json({message:"failed to get the tasks"})
  }else{
    res.status(200).json({task})
  }
}
module.exports = { createTask,updateTask,getAlltask,deletetask,getspecefic};
