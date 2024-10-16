const express=require("express")
const taskModel = require("../model/taskmodel")
const { createTask, updateTask, getAlltask, deletetask, getspecefic } = require("../controllers/taskcontrollers")

const router=express.Router()



router.get("/get-tasks",getAlltask)

router.post("/create-tasks",createTask)

router.put("/update-tasks/:id",updateTask)

router.delete("/delete-tasks/:id",deletetask)

router.get("/get-specefic/:id",getspecefic)



module.exports = { userrouter: router };