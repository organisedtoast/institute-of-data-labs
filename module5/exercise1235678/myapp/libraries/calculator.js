// EXERCISE 7A: create a calculator class with methods for addition, subtraction, multiplication, and division.
// Each method should log the result to the console.


// Step 1: Create a Calculator class with a constructor that initializes an id property that is a unique identifier 
// for each instance of the calculator. 
// Use a random number generator here

class Calculator {
  constructor() {
    this.id = Math.floor(Math.random() * 1000)
    }
    
       

  // Step 2: Implement methods for addition, subtraction, multiplication, and division. 
  // Each method should log the result to the console using a private method #log.

  // Step 2a: use a private method #log to log the results of each operation to the console, 
  // including the calculator's id for better traceability.
  // Integrate logger.js class into the Calculator class to log each operation performed 

    #log(result) {
    console.log(`[Calculator :${this.id}]: ${result}`)
    }
   

  // Step 2b: Implement the add, subtract, multiply, and divide methods to perform the respective operations and log the results.

    add(a, b) {
    const result = a + b
    this.#log(result)
    return result
    } // close the add method definition
    
    subtract(a, b) {
    const result = a - b
    this.#log(result)
    return result
    } // close the subtract method definition
    
    multiply(a, b) {
    const result = a * b
    this.#log(result)
    return result
    } // close the multiply method definition
    
    divide(a, b) {
    if (b === 0) {
      const errorMessage = 'Error: Division by zero'    
        this.#log(errorMessage)
        return errorMessage
    }
    const result = a / b
    this.#log(result)
    return result
    } // close the divide method definition
} // close the Calculator class definition


module.exports = Calculator





// EXERCISE 7B: integrate the Calculator class into myapp.js and demonstrate its functionality
// by creating an instance of the class and performing various operations, logging the results to the console.

// Step 1: Import the Calculator class from the calculator.js file.

// see myapp.js file

// Step 2: Create an instance of the Calculator class and perform various operations, logging the results to the console.

// see myapp.js file


// Step 1: Create a Logger class that generates a unique ID for each instance
// and has a method to log messages to the console, including the instance's ID for better traceability.

// see logger.js file

// Step 2: Implement methods for addition, subtraction, multiplication, and division. 
// Each method should log the result to the console using a private method #log.



// Step 2a: use a private method #log to log the results of each operation to the console, 
// including the calculator's id for better traceability.



// Step 2b: Implement the add, subtract, multiply, and divide methods to perform the respective operations and log the results.



// Step 3: Integrate the Logger class into the Calculator class to log each operation performed





// Step 4: Run the myapp.js file to see the output of the operations performed by the Calculator class

