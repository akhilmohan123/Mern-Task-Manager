const taskModel = require("../model/taskmodel");


const createTask = async (req, res) => {
  try {
    const { task, description } = req.body;

   
    if (!task || !description) {
      return res.status(400).json({ message: "Task and description are required." });
    }

  
    const newTask = new taskModel({ task, description });

    
    const savedTask = await newTask.save();


    res.status(201).json({ message: "Task created successfully", task: savedTask });
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(500).json({ message: "Failed to create task", error: error.message });
  }
};

const updateTask=async (req,res)=>{
    console.log(req.body)
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

const deletetask=async (req,res)=>{
    console.log("ready to delete tasks")
}
module.exports = { createTask,updateTask,getAlltask,deletetask};
