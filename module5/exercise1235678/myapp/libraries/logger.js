// EXERCISE 7c: Create a generic library for logging
// Pass a message to be logged
// This will contain the ID of the caller, and the result.
// Log to the console every call made.


// Step 1: Create a Logger class that generates a unique ID for each instance
// and has a method to log messages to the console, including the instance's ID for better traceability.

class Logger {

    // use constructor to generate a unique ID for each instance of the Logger class.
    constructor() {
    this.id = Math.random().toString(36).substring(2, 15) 
   } // close the constructor definition

   // implement a log method that takes a message as an argument and logs it to the console
    log(message) {
    console.log(`[Logger :${this.id}]: ${message}`)
  } // close the log method definition
} // close the Logger class definition

// export the Logger class to be used in other files
module.exports = Logger



