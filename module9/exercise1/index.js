// This is the main entry point of the application.
// It starts the Express server using the app exported from app.js.

// EXERCISE 6: Adjust index.js to support Express being used in both dev and test environments.
// We import the Express application instance from app.js so tests can use the app
// without starting the server automatically.
const app = require('./app');

// declare a variable called port and assign it the value of 3000
const port = 3000;

// start the server and listen on the specified port.
// when the server starts successfully, log a message to the console indicating it's running and on which port.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// To open the app, start the server by running `nodemon index.js` in the terminal
// Then navigate to `http://localhost:3000/calculator.html`
