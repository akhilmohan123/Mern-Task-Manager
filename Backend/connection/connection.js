const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit if connection fails
  }
};

module.exports = connectDB;