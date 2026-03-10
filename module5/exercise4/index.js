
// import the express package
const express = require("express"); 

// import the friendRoutes router from the routes folder - this is where we will define all the routes related to friends
const friendRoutes = require('./routes/friendRoutes');

// create an instance of the express application
const app = express(); 

// define the port number for the backend server to listen on - this is where the frontend will send requests to
const port = 3000; 

// parse requests of content-type - application/json (needed for POST and PUT requests using req.body)
// this is a built in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

// this will serve the static files in the 'public' folder at the root path of the app, so for example the index.html file will be available at http://localhost:3000/index.html
app.use('/', express.static('public'))

// this will serve the friendRoutes router at the path '/friends', so for example the GET route defined in friendRoutes will be available at http://localhost:3000/friends/search
app.use('/friends', friendRoutes);

// this starts the server and listens for incoming requests on the defined port, and logs a message to the console when the server is running
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});




