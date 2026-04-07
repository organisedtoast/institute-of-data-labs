// This module handles the connection between our app and MongoDB. 
// We use Mongoose, which is a library that provides a structured
// way to interact with MongoDB from JavaScript.
 
const mongoose = require("mongoose");
 
const connectDB = async () => {
  try {
    // mongoose.connect() opens a connection to the database.
    // The MONGO_URI comes from our .env file. 
    // We do not hardcode it here for security reasons (we don't want to expose our DB credentials in the code).
    const conn = await mongoose.connect(process.env.MONGO_URI);
 
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
  
    // If the connection fails (wrong URI, MongoDB not running, etc.), we log the error and stop the app. 
    // There is no point running a server that cannot reach its database.
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};
 

// Export the connectDB function so that we can use it in our main server file (server.js)
module.exports = connectDB;
