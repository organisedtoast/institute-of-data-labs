
// Define a function called addNumbers that takes in a request and response object as parameters. 
const addNumbers = (req, res) => {

    // retrieves two numbers from the query parameters of the request, converts them to integers,
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);

    // adds the two numbers together
    let sum = number1 + number2

    // logs the result to the console for debugging purposes
    console.log(sum)

    // sends the result back as a JSON response with a status code of 200.
    res.status(200)
    res.json({result:sum})
}

// Define a function called subtractNumbers that takes in a request and response object as parameters. 
const subtractNumbers = (req, res) => {

    // retrieves two numbers from the query parameters of the request, converts them to integers,
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);

    // subtracts the second number from the first number
    let difference = number1 - number2

    // logs the result to the console for debugging purposes
    console.log(difference)

    // sends the result back as a JSON response with a status code of 200.
    res.status(200)
    res.json({result:difference})
}

// Define a function called multiplyNumbers that takes in a request and response object as parameters. 
const multiplyNumbers = (req, res) => {
    // retrieves two numbers from the query parameters of the request, converts them to integers,
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);
    // multiplies the two numbers together
    let product = number1 * number2
    // logs the result to the console for debugging purposes
    console.log(product)
    // sends the result back as a JSON response with a status code of 200.
    res.status(200)
    res.json({result:product})
}   


// Define a function called divideNumbers that takes in a request and response object as parameters. 
const divideNumbers = (req, res) => {
    // retrieves two numbers from the query parameters of the request, converts them to integers,
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);
    // checks if the second number is zero to avoid division by zero errors
    if (number2 === 0) {
        // if the second number is zero, sends an error message back as a JSON response with a status code of 400.
        res.status(400)
        res.json({error: "Cannot divide by zero"})
    } else {
        // if the second number is not zero, divides the first number by the second number
        let quotient = number1 / number2
        // logs the result to the console for debugging purposes
        console.log(quotient)
        // sends the result back as a JSON response with a status code of 200.
        res.status(200)
        res.json({result:quotient})
    }   
}

// export the 4 functions above as a module so that they can be used in other parts of the app
module.exports = {
    addNumbers,
    subtractNumbers,
    multiplyNumbers,
    divideNumbers
}

// to run the server, we will need to import these functions into our route file 
// (`calculatorRoutes.js`) and set up the corresponding routes to handle the API requests for each calculator operation

