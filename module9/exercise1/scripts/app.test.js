// app.test.js
// import supertest and the express app
const request = require('supertest');

// declare a variable called app and assign it the value of the imported app module from app.js
const app = require('../app');
// '../' = this indicates that we want to go up one level in the directory structure
// to access the app file
// 'app' = the name of the file we want to import (without the .js extension)

// define a test suite for the calculator routes using an arrow function as the callback to group related tests together
describe('Calculator Routes', () => {

// generate some random numbers to test the calculator
let number1 = Math.floor(Math.random() * 1_000_000);
let number2 = Math.floor(Math.random() * 1_000_000);

// run a test with the given description and a callback function that contains the test logic
test('GET /calculator/add => sum of numbers', () => {

    // use the request function from supertest to make a request to the express app
    return request(app)

    // make a GET request to the /calculator/add endpoint with the two random numbers as query parameters
    .get(`/calculator/add?num1=${number1}&num2=${number2}`)

    // expect the response to have a Content-Type header that matches the regular expression /json/
    .expect('Content-Type', /json/)

    // expect the response to have a status code of 200 (OK)
    .expect(200)

    // when the response is received, execute a callback function that checks if the response body contains the expected result
    .then((response) => {

        // expect the response body to be an object with a result property that equals the sum of the two random numbers
        expect(response.body).toEqual({

            // the result property should equal the sum of number1 and number2
            result: (number1 + number2)
}); // close expect
}); // close then
}); // close test
}); // close describe

