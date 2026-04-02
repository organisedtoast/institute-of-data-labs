// This file sets up the Express server and mounts the routes defined in microserviceRoutes.js

// It imports Express, creates an app, and listens on a specified port.

//  It also uses express.json() middleware to parse JSON request bodies, 
// and mounts the routes from microserviceRoutes.js under the /api/microservice path.

// To run this server, use the command: nodemon server.js or node server.js in the terminal.
// If you have nodemon installed, it will automatically restart the server
// when you make changes to the code. This is useful for development. 
// If you don't have nodemon, you can just use node server.js.

const express = require('express');          // import Express
const app = express();                        // create the app
const PORT = 3001;                            // pick a port

app.use(express.json());                      // allow JSON request bodies

// Import the route file
const microserviceRoutes = require('./routes/microserviceRoutes');

// Mount routes: all URLs starting with /api/microservice
// will be handled by microserviceRoutes
app.use('/api/microservice', microserviceRoutes);

// Start listening for requests
app.listen(PORT, () => {
  console.log(`Microservice running on http://localhost:${PORT}`);
});
