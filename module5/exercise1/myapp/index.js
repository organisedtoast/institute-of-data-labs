// EXERCISE 1: Create a basic back-end application with multiple web servers running on different ports.

// 1. Create a new directory myapp for your project and navigate into it.


// 2. Initialize a new Node.js project by running `npm init -y` in the terminal.


// 3. Install the Express framework by running `npm install express`.


// 4. Create a new file named `index.js` and add the following code to create a web server that listens on port 3000:

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from server 1!');
});

app.listen(3000, () => {
  console.log('Server 1 is running on port 3000');
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
const calculatorRoutes = require('./routes/calculatorRoutes');

// use the calculator routes with a base path of /calculator
app.use('/calculator', calculatorRoutes);

// start the server on port 3000

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// 4. Test the calculator route by navigating to `http://localhost:3000/calculator/add?num1=5&num2=10` in your web browser. You should see a JSON response with the result of the addition.

// You should see a response like this:
// {"result":15}







