const express=require('express')
var app=express()
var connectDB=require("./connection/connection.js")
var {userrouter} =require("./routes/user.js")
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
connectDB()
app.use('',userrouter)


app.listen(3001,()=>{
    console.log("Server is listening to the port")
})
