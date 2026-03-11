// APP.JS SECTION

/*
app.js builds the app. It normally contains:
importing Express
creating the app
middleware
static file serving
routes
*/

// import the express package
const express = require('express');

// import the path package to work with file and directory paths
const path = require('path');

// create an instance of the express application
const app = express();

// use express.static() middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// use express.json to parse incoming JSON requests
app.use(express.json());

// route handlers for the app
const productRoutes = require('./routes/productRoutes');

// API routes
app.use('/api/products', productRoutes);



// SERVER.JS SECTION

/*
server.js runs the app. It normally contains:

importing the app

defining the port

starting the server with listen()
*/

// Import the app from app.js (this is not required here since we are writing all the code in one file
// , but in a real project, you would separate these concerns into different files)

// const app = require('./app');


// define the port number for the backend server to listen on
const PORT = 3000;

// start the server
app.listen(PORT, () => {
    // log a message to the console when the server is running
    console.log(`Server running on port ${PORT}`);
});


// EXPORT SECTION

// Export the configured app for use in other files in the project

module.exports = app; 







