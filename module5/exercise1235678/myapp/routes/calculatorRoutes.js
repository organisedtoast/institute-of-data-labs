// import the express module by using require function and assign it to a variable called express
const express = require('express');

// import the functions defined in the calculatorController.js file located in the controllers directory.
const { addNumbers, subtractNumbers, multiplyNumbers, divideNumbers } = require('../controllers/calculatorController');

// create a new router object by calling the Router method on the express object and assign it to a variable called router
const router = express.Router();

// define routes for the calculator operations (add, subtract, multiply, divide) using the router object and the get method. 
// each route will call the corresponding function from the calculatorController and pass in the request and response objects as arguments.


// define a route for the addition operation that listens for GET requests at the /add endpoint.
router.get('/add', (req, res) => {
    // call the addNumbers function from the calculatorController and pass in the request and response objects as arguments
    addNumbers(req,res)
})

router.get('/subtract', (req, res) => {
    subtractNumbers(req,res)
})

router.get('/multiply', (req, res) => {
    multiplyNumbers(req,res)
})

router.get('/divide', (req, res) => {
    divideNumbers(req,res)
})

// export the router object as a module so that it can be used in other parts of the app
module.exports = router;  

