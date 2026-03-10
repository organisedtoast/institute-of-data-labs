// this file is only for Exercise 7B, the code for Exercise 7A should be in calculator.js file

// Step 1: Import the Calculator class from the calculator.js file 
const Calculator = require('./libraries/calculator')

// this is code for Exercise 7C to integrate the Logger class into the Calculator class to log each operation performed
const Logger = require('./libraries/logger')


// Step 2: Create an instance of the Calculator class
const calculator = new Calculator()


// this is code for Exercise 7C to create an instance of the Logger class to log messages to the console
const logger = new Logger()


// Step 3: Perform various operations and log the results to the console, include the calculator's id for better traceability

calculator.add(5, 3) // should log [Calculator :<id>]:8
calculator.subtract(10, 4) // should log [Calculator :<id>]:6
calculator.multiply(7, 6) // should log [Calculator :<id>]:42
calculator.divide(20, 5) // should log [Calculator :<id>]:4
calculator.divide(10, 0) // should log [Calculator :<id>]:Error: Division by zero

// this is code for Exercise 7C to log the start of the calculations and the completion of each operation, including the calculator's id for better traceability.
logger.log('Starting calculations...')
calculator.add(5, 3)
logger.log('Addition complete')

// Step 4: Run the myapp.js file to see the output of the operations performed by the Calculator class.

// type node myapp.js in the terminal to run the file and see the output

// Note: The actual id of the calculator will be generated randomly
// So the output will show the specific id for each operation.

// EXERCISE 7c: Create a generic library for logging
// Pass a message to be logged
// This will contain the ID of the caller, and the result.
// Log to the console every call made.

// Step 1: Create a Logger class that generates a unique ID for each instance
// and has a method to log messages to the console, including the instance's ID for better traceability.

// see logger.js file

// Step 2: Implement methods for addition, subtraction, multiplication, and division. 
// Each method should log the result to the console using a private method #log.

// see calculator.js file

// Step 2a: use a private method #log to log the results of each operation to the console, 
// including the calculator's id for better traceability.

// see calculator.js file

// Step 3: Integrate the Logger class into the Calculator class to log each operation performed

// see calculator.js file

// Step 4: connect myapp.js to the calculator.js and logger.js files to see the output of the operations performed by the Calculator class

// add const Logger = require('./libraries/logger') at the top of myapp.js file to import the Logger class

// add const logger = new Logger() to create an instance of the Logger class

/* add this code above to log the start of the calculations and the completion of each operation, including the calculator's id for better traceability.
logger.log('Starting calculations...')
calculator.add(5, 3)
logger.log('Addition complete')
*/

// Step 4: Run the myapp.js file to see the output of the operations performed by the Calculator class