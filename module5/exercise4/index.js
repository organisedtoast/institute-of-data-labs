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
const express = require("express"); 

// import the friendRoutes router from the routes folder
const friendRoutes = require('./routes/friendRoutes');

// create an instance of the express application
const app = express(); 

// parse incoming JSON requests
app.use(express.json());

// serve static files from the public folder
app.use('/', express.static('public'));

// mount the friendRoutes router at /friends
app.use('/friends', friendRoutes);


// SERVER.JS SECTION

/*
server.js runs the app. It normally contains:

importing the app

defining the port

starting the server with listen()
*/

// define the port number for the backend server to listen on
const port = 3000; 

// start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});