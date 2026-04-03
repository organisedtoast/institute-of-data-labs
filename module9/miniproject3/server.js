require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

// Import routes (These will be created later as I develop the application)



const app = express();

// Connect to MongoDB
connectDB();

// Use middleware to parse JSON bodies from incoming requests.
app.use(express.json());

// Use middleware to parse URL-encoded bodies (for form submissions).
app.use(express.urlencoded({ extended: true }));


// This codespace is a placeholder for using the routes that we will create later in the development process. For now, it simply sets up the server and connects to the database. As we build out the application.





// Start the server and listen on the specified port. 
// The port can be set in the .env file or defaults to 3000 if not specified.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
