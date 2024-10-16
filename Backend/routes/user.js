const express=require("express")
const taskModel = require("../model/taskmodel")
const { createTask, updateTask, getAlltask, deletetask } = require("../controllers/taskcontrollers")

const router=express.Router()



router.get("/get-tasks",getAlltask)

router.post("/update-tasks",createTask)

router.put("/update-tasks",updateTask)

router.delete("/delete-tasks",deletetask)




module.exports = { userrouter: router };