// Create a unit test for subtractNumbers function in calculatorController.js using Jest and Supertest
// to test the /calculator/subtract route.

// Run it to ensure the route is working successfully and returns the expected response.

// app.test.js
// import supertest
const request = require('supertest');

// declare a variable called app and assign it the value of the imported app module from app.js
// this imports the Express application instance that we created in app.js so that we can make requests to it in our tests
const app = require('../app');

// define a test suite for the calculator routes using an arrow function as the callback to group related tests together
describe('Calculator Routes', () => {

    // generate some random numbers to test the calculator
let number1 = Math.floor(Math.random() * 1_000_000);
let number2 = Math.floor(Math.random() * 1_000_000);

// run a test with the given description and a callback function that contains the test logic
test('GET /calculator/subtract => difference of numbers', () => {
    
    // use the request function from supertest to make a request to the express app
    return request(app)
    
    // make a GET request to the /calculator/subtract endpoint with the two random numbers as query parameters
    .get(`/calculator/subtract?num1=${number1}&num2=${number2}`)
    
    // expect the response to have a Content-Type header that matches the regular expression /json/
    .expect('Content-Type', /json/)
    
    // expect the response to have a status code of 200 (OK)
    .expect(200)
    
    // when the response is received, execute a callback function that checks if the response body contains the expected result
    .then((response) => {
    
        // expect the response body to be an object with a result property that equals the difference of the two random numbers
        expect(response.body).toEqual({
            
            // the result property should equal the difference of number1 and number2
            result: (number1 - number2)
        }); // close expect
    }); // close then
}); // close test
}); // close describe



