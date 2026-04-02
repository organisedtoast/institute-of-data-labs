// The controller handles HTTP details such as reading query parameters
// and returning JSON responses. The calculator rules themselves live in the service layer.
const calculatorService = require('../services/calculatorService');

// Helper function to convert query string values into numbers.
// Query parameters arrive as text, so we convert them before calling the service.
const getNumbersFromQuery = (req) => ({
    number1: parseFloat(req.query.num1),
    number2: parseFloat(req.query.num2),
});

// Define a function called addNumbers that takes in a request and response object as parameters.
const addNumbers = (req, res) => {
    const { number1, number2 } = getNumbersFromQuery(req);
    const result = calculatorService.add(number1, number2);

    res.status(200);
    res.json({ result });
};

// Define a function called subtractNumbers that takes in a request and response object as parameters.
const subtractNumbers = (req, res) => {
    const { number1, number2 } = getNumbersFromQuery(req);
    const result = calculatorService.subtract(number1, number2);

    res.status(200);
    res.json({ result });
};

// Define a function called multiplyNumbers that takes in a request and response object as parameters.
const multiplyNumbers = (req, res) => {
    const { number1, number2 } = getNumbersFromQuery(req);
    const result = calculatorService.multiply(number1, number2);

    res.status(200);
    res.json({ result });
};

// Define a function called divideNumbers that takes in a request and response object as parameters.
const divideNumbers = (req, res) => {
    const { number1, number2 } = getNumbersFromQuery(req);
    const outcome = calculatorService.divide(number1, number2);

    if (outcome.error) {
        res.status(400);
        res.json({ error: outcome.error });
        return;
    }

    res.status(200);
    res.json({ result: outcome.result });
};

// Export the 4 controller functions so the router can use them.
module.exports = {
    addNumbers,
    subtractNumbers,
    multiplyNumbers,
    divideNumbers
};

