// app.js - new file at top level
// this file will be the entry point for our application 
// it will set up the Express server and routes for our calculator app

// use const to import the express module and require it from the 'express' package
const express = require('express')

// create an instance of an Express application and assign it to a variable called app
const app = express()

// use the built-in express.json() middleware to parse incoming JSON request bodies
// and make them available under the req.body property.
const port = 3000

// map all routes to the express app

// declare a variable called calculatorRoutes
// assign it the value of the imported routes from the calculatorRoutes.js file located in the routes directory
const calculatorRoutes = require('./routes/calculatorRoutes');
// require = used to import the router object defined in the calculatorRoutes.js file
// './routes/calculatorRoutes' = the path to the calculatorRoutes.js file relative to the current file (app.js)
// the './' indicates that the file is in the same directory as app.js
// 'routes/calculatorRoutes' specifies the path to the file within that directory.

// use the imported calculator routes and mount them at the /calculator path.
app.use('/calculator', calculatorRoutes);

// export the app module so that it can be imported and used in other files
module.exports = app;
// app = the Express application instance that we created earlier in this file
// module.exports = a special object in Node.js that is used to export values from a module
// so that they can be imported and used in other files. 
// By assigning the app variable to module.exports, we are making the Express application instance
// available for import in other files, such as index.js where we will start the server.