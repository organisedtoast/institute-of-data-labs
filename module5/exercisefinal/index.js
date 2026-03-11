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

// import swagger-ui-express to serve Swagger UI
const swaggerUi = require('swagger-ui-express');

// import the swagger document from the swagger folder
const swaggerDocument = require('./swagger/swagger');

// import cors middleware to enable Cross-Origin Resource Sharing
// CORS allows your API to accept requests from different domains (e.g., a frontend on localhost:3001 calling this API on localhost:3000)
const cors = require('cors');

// create an instance of the express application
const app = express();

// use express.static() middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// use express.json to parse incoming JSON requests
app.use(express.json());

// use cors middleware to enable CORS for all routes
// this allows your API to be accessed from different origins (domains/ports)
app.use(cors());


// route handlers for the app
const productRoutes = require('./routes/productRoutes');

// Root route - serve index.html
// this route will serve the homepage of the app when the user navigates to the root URL (http://localhost:3000/)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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


// INSTRUCTIONS

// To access the website, open a web browser and navigate to http://localhost:3000. 
// You should see the homepage of your app. 
// You can use Swagger to document your API endpoints.
// You can also test the API endpoints using tools like Postman or curl.




