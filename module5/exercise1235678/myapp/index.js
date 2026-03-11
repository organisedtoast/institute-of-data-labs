// This is the main entry point of the application. It sets up the Express server, defines routes, and connects Swagger for API documentation.

// EXERCISE 1: Create a basic back-end application with multiple web servers running on different ports.

// 1. Create a new directory myapp for your project and navigate into it.


// 2. Initialize a new Node.js project by running `npm init -y` in the terminal.


// 3. Install the Express framework by running `npm install express`.


// 4. Create a new file named `index.js` and add the following code to create a web server that listens on port 3000:
// The code below sets up an Express server that listens on port 3000 and serves a simple response at the root URL.
// It also serves a static HTML file for the calculator and imports routes for handling calculator operations.

// import the CORS middleware to enable Cross-Origin Resource Sharing,
// which allows your server to handle requests from different origins.
const cors = require('cors');

// Import the Express module from the 'express' package and create an instance of an Express application.

const express = require('express');
// const app = express();
const path = require('path');

// code below is for Exercise 6 to do unit testing with Jest and Supertest. We will import the Express application instance from the app.js file to use it in our tests.
const app = require('./app');


// code below is for Exercise 8: connect Swagger to your Express application
const swaggerUi = require('swagger-ui-express');

// code below is for Exercise 8 to import the Swagger document (which is typically a JSON file that defines your API documentation) into your `index.js` file.
swaggerDocument = require('./swagger.json');


// code below is for Exercise 8 to set up Swagger documentation for your Express application by defining a route that serves the Swagger UI at the /api-docs endpoint.


app.use(
'/api-docs',
swaggerUi.serve,
swaggerUi.setup(swaggerDocument)
);
// app = this is the Express application instance that we created earlier. It is used to define routes and middleware for our server.
// .use() = a method in Express that allows us to add middleware functions to our application.
// '/api-docs' = this is the base path for the Swagger UI. When users navigate to http://localhost:3000/api-docs, they will see the Swagger documentation.


// define a route for the root URL that sends a simple response "Hello from server 1!" when accessed.
app.get('/', (req, res) => {
  res.send('Hello from server 1!');
});


// Serve calculator.html when the user navigates to /calculator.html by sending the file located at the specified path.
app.get('/calculator.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'calculator.html'));
});

// Serve static files (CSS, JS, etc.) from the current directory
app.use(express.static(__dirname));

// Import and use calculator routes from the calculatorRoutes.js file located in the routes directory. 
// this allows the server to handle requests to the /calculator endpoint using the defined routes in that file.

/*
const calculatorRoutes = require('./routes/calculatorRoutes');
app.use('/calculator', calculatorRoutes);
*/

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// 5. Create another file named `index2.js` and add the following code to create a second web server that listens on port 4000:

/*
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from server 2!');
});

app.listen(4000, () => {
  console.log('Server 2 is running on port 4000');
});
*/

// 6. Start both servers by running `node index.js` and `node index2.js` in separate terminal windows.

// this can be done by opening two terminal windows, navigating to the myapp directory in both, and running the respective commands in each terminal.

// In the first terminal, run:
// node index.js

// In the second terminal, run:
// node index2.js

// You should see console messages confirming that both servers are running on their respective ports.



// 7. Open your web browser and navigate to `http://localhost:3000` to see the response from the first server
// Then go to `http://localhost:4000` to see the response from the second server.

// You should see "Hello from index server!" when you visit the first URL.
// You should see "Hello from index2 server!" when you visit the second URL.
// This confirms both servers are running successfully on different ports.

// Congrats mate! You've successfully created a basic back-end application with multiple web servers running on different ports.

// NB: Remember to stop the servers by pressing Ctrl + C in the terminal when you're done.


// EXERCISE 2: Create a simple calculator application with a front-end and back-end component.

// 1. In the myapp directory, create a new folder named `routes` and inside it, create a file named `calculatorRoutes.js`.

// 2. Add the following code to `calculatorRoutes.js` to create a route for adding two numbers:

/*

const express = require('express');
const router = express.Router();

router.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const result = num1 + num2;
    res.json({ result });
})

module.exports = router;  

*/


// 3. Access the calculator route from `index.js` by importing the routes and using them in your Express app.


// import the calculator routes

/*
const calculatorRoutes = require('./routes/calculatorRoutes');

// use the calculator routes with a base path of /calculator
app.use('/calculator', calculatorRoutes);

// start the server on port 3000

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
*/



// 4. Test the calculator route by navigating to `http://localhost:3000/calculator/add?num1=5&num2=10` in your web browser. You should see a JSON response with the result of the addition.

// You should see a response like this:
// {"result":15}


// 5. Create a new file named `calculator.html` in the myapp directory and add the following code to create a simple front-end interface for the calculator:

/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Calculator</title>
    <link rel="stylesheet" href="calculator.css"> <!-- This line links to a CSS file for styling the calculator. -->
</head>
<body>
    <h1>Simple Calculator</h1>
    <input type="number" id="num1" placeholder="Enter first number">
    <input type="number" id="num2" placeholder="Enter second number">
    <button id="addButton">Add</button>
    <p id="result"></p>

    <script src="calculator.js" defer></script> <!-- This line links your HTML to a JavaScript file that will handle the calculator's functionality. -->
</body>
</html>
*/

// 6. Create a new file named `calculator.js` in the myapp directory and add the following code to handle the button click event and make an API call to the back-end calculator route:

/*
document.getElementById('addButton').addEventListener('click', () => {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;

    fetch(`/calculator/add?num1=${num1}&num2=${num2}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').textContent = `Result: ${data.result}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
*/

// 7. Open `calculator.html` in your web browser, enter two numbers, and click the "Add" button to see the result displayed on the page.

// You should see the result of the addition displayed below the button when you click it. For example, if you enter 5 and 10, it should display "Result: 15".

// Congrats mate! You've successfully created a simple calculator application with a front-end and back-end component.


// EXERCISE 2: Create a simple calculator application with a front-end and back-end component.

// In this exercise, you will create a simple calculator application that consists of a front-end interface and a back-end server. The front-end will allow users to input two numbers and select an operation (addition, subtraction, multiplication, division), while the back-end will perform the calculation and return the result.

// Step 1: Create a new file named `calculatorRoutes.js` in the `routes` directory and add the following code to define routes for each calculator operation:

/*
const express = require('express');
const router = express.Router();

router.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const result = num1 + num2;
    res.json({ result });
})

router.get('/subtract', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const result = num1 - num2;
    res.json({ result });
})

router.get('/multiply', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const result = num1 * num2;
    res.json({ result });
})

router.get('/divide', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if (num2 === 0) {
        return res.status(400).json({ error: 'Cannot divide by zero' });
    }
    const result = num1 / num2;
    res.json({ result });
})

module.exports = router;
*/

// Step 2: Import the calculator routes in `index.js` and use them with a base path of `/calculator` to enable the back-end server to handle requests for calculator operations.

// Import the calculator routes
const calculatorRoutes = require('./routes/calculatorRoutes');

// Use the calculator routes with a base path of /calculator
app.use('/calculator', calculatorRoutes);

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Step 3: Create a front-end interface in `calculator.html` that allows users to input two numbers and select an operation. Use JavaScript to handle the button click event, make an API call to the back-end server, and display the result on the page.

// The code for `calculator.html` and `calculator.js` can be found in the previous steps of this exercise.

// Step 4: To open app, start the server by running `nodemon index.js` in the terminal
// Then navigate to `http://localhost:3000/calculator.html`


// EXERCISE 6: Adjust index.js to suppose Express being used in both dev and test environments

// declare a variable called app and assign it the value of the imported app module from app.js
// we us './' to indicate that the app.js file is in the same directory as index.js

// const app = require('./app');

// declare a variable called port and assign it the value of 3000
const port = 3000

// start the server and listen on the specified port. 
// when the server starts successfully, log a message to the console indicating it's running and on which port.
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
   })

   


// EXERCISE 8: connect Swagger to your Express application

// Swagger is a common way to present any backend application to the outside world.
// It provides a user interface to interact with the API endpoints and also serves as documentation for the API.

// Step 1. At the top of the code, install the necessary packages for Swagger by running `npm install swagger-ui-express swagger-jsdoc` in the terminal.

// const swaggerUi = require('swagger-ui-express');



// Step 2. Import the Swagger UI package and the Swagger document (which is typically a JSON file that defines your API documentation) into your `index.js` file.
// swaggerDocument = require('./swagger.json');


/*
app.use(
'/api-docs',
swaggerUi.serve,
swaggerUi.setup(swaggerDocument)
);
*/

// Step 3. Add code to swagger.json file to define your API documentation. 
// This file should include information about your API endpoints, request parameters, and response formats.
// You can use the Swagger Editor (https://editor.swagger.io/) to create and edit your Swagger document easily.

// See swagger.json file for the code to define API documentation for the calculator routes.


// Step 4. Access the Swagger documentation by navigating to `http://localhost:3000/api-docs` in your web browser.
// You should see the Swagger UI with your API documentation displayed.

