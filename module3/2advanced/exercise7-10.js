console.log('EXERCISE 7');
// EXERCISE 7: The following DigitalClock class uses an interval to print the time every second once started, until stopped.

// Step 1: define a class called DigitalClock - a blueprint for creating clock objects
class DigitalClock {

  // Step 2: define a constructor method that runs when a new instance of DigitalClock is created
  // The constructor should take a parameter 'prefix' which will be used to customize the output when displaying the time
    constructor(prefix) {
  
  
      // Step 2: store the prefix as a property on this clock instance so it can be accessed in other methods
    this.prefix = prefix;
  } // Step 3: close the constructor method


  // Step 4: define a method called display that will be responsible for getting the current time and printing it in a formatted way 
  display() {
    
    // Step 5: create a new Date object to get the current date and time when display() is called
    let date = new Date();
    // date = this is the current date and time, and we can use its methods to extract hours, minutes, and seconds
    // new Date() = this creates a new Date object with the current date and time when display() is called

    // Step 6: extract hours, minutes and seconds from the date object using array destructuring to create three variables in one line
    let [hours, mins, secs] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    // [hours, mins, secs] = this is a destructuring assignment that creates three variables (hours, mins, secs) and assigns them the values from the array on the right
    // date.getHours() = this method returns the current hour (0-23) from the date object
    // date.getMinutes() = this method returns the current minute (0-59) from the date object
    // date.getSeconds() = this method returns the current second (0-59) from the date object


    // Step 7: add a leading zero to hours if less than 10 (e.g., 9 becomes "09")
    if (hours < 10) hours = '0' + hours;

    // Step 8: add a leading zero to minutes if less than 10
    if (mins < 10) mins = '0' + mins;

    // Step 9: add a leading zero to seconds if less than 10
    if (secs < 10) secs = '0' + secs;

    // Step 10: print the formatted time with the prefix (e.g., "my clock: 14:05:09")
    console.log(`${this.prefix} ${hours}:${mins}:${secs}`);
  } // Step 11: close the display method

  // Step 12: define a method called stop that will be responsible for stopping the clock from updating
  stop() {
    
    // Step 13: use clearInterval to stop the timer that was set in the start method (we will define this timer property in the start method)
    clearInterval(this.timer);

  } // Step 14: close the "stop" method

  // Step 15: define a method called "start" that will be responsible for starting the clock
  start() {
    
    // Step 16: call display once immediately so we don't wait 1 second for the first update
    this.display();
    // this.display(); = this calls the display method on this clock instance to print the current time immediately when start() is called, before setting up the interval for subsequent updates

    // Step 17: set up an interval to call display every 10000 milliseconds (10 seconds)
    // Store the timer ID so we can stop it later with stop()
    this.timer = setInterval(() => this.display(), 10000);
    // this.timer = this is the timer ID returned by setInterval, which we can use to clear the interval later in the stop method

  } // Step 18: close the "start" method using a closing curly brace

  } // Step 19: close the DigitalClock class definition a closing curly brace


// Step 20: create a new DigitalClock instance with the prefix 'my clock:'
const myClock = new DigitalClock('my 10s clock update:');

// Step 21: Start the clock - it will now print the time every 10 seconds with the specified prefix until stopped
myClock.start();


// Here is the above code again, free of comments

/*

class DigitalClock {
  constructor(prefix) {
    this.prefix = prefix;
  }

  display() {
    let date = new Date();
    // create 3 variables in one go using array destructuring
    let [hours, mins, secs] = [date.getHours(), date.getMinutes(), date.getSeconds()];

    if (hours < 10) hours = '0' + hours;
    if (mins < 10) mins = '0' + mins;
    if (secs < 10) secs = '0' + secs;

    console.log(`${this.prefix} ${hours}:${mins}:${secs}`);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.display();
    this.timer = setInterval(() => this.display(), 1000);
  }
}

const myClock = new DigitalClock('my clock:');
myClock.start();

*/

console.log('Exercise 7a');
// Exercise 7a: Create a new class PrecisionClock that inherits from DigitalClock and adds the parameter precision – the number of ms between 'ticks'.
// This precision parameter should default to 1 second if not supplied.

// Step 1: define a new class called PrecisionClock that inherits from DigitalClock
class PrecisionClock extends DigitalClock {
// 'extends' = a JS keyword that sets up inheritance, allowing PrecisionClock to use the methods and properties of DigitalClock while also adding its own functionality 
// class PrecisionClock = this defines a new class called PrecisionClock
// DigitalClock { = this indicates that PrecisionClock is a subclass of DigitalClock, meaning it inherits all the methods and properties of DigitalClock, but can also have its own unique features

  // Step 3: define a constructor method that takes the same prefix parameter as DigitalClock, and also a new precision parameter with a default value of 20000ms (20 seconds)
  constructor(prefix, precision = 20000) {
    // constructor( ) { = this defines the constructor method for the PrecisionClock class, which is called when a new instance of PrecisionClock is created
    // prefix = this parameter is passed to the parent class (DigitalClock) constructor to set the prefix for the clock display
    // precision = this parameter sets how often the clock updates (in milliseconds), and defaults to 20000ms if not provided when creating a new PrecisionClock instance

    
    // Step 4: call the parent class's constructor using 'super' to ensure the prefix is set up correctly in the DigitalClock part of this class
    super(prefix);
    // 'super' = gives us access to the parent class's methods and properties
    //  (prefix) = this calls the constructor of the parent class (DigitalClock) with the prefix argument, allowing us to reuse the initialization logic for the prefix property defined in DigitalClock without having to rewrite it in PrecisionClock

    // Step 5: store the precision as a property on this clock instance so it can be accessed in the start method
    this.precision = precision;
// this.precision this is a new property on the PrecisionClock instance that stores the value of the precision parameter passed to the constructor
// it allow us to use this value later in the start method to set the update interval for the clock


  } // Step 6: close the constructor method using a closing curly brace

  // Step 7: override the start method to use the precision property instead of a fixed 20000ms interval
  // This replaces the parent's start behavior with our custom version
  start() {

    // Step 8: call display once immediately so we don't wait for the first update, just like in the parent class
    this.display();

    // Step 9: set up an interval using 'this.precision' instead of fixed 20000ms
    // This will allow the clock to update at the specified precision interval when start() is called
        this.timer = setInterval(() => this.display(), this.precision);
  
    } // Step 10: close the start method using a closing curly brace

} // Step 11: close the PrecisionClock class definition using a closing curly brace

// PrecisionClock is now a subclass of DigitalClock that allows us to create clocks with customizable update intervals by passing a precision value when creating an instance.
// If no precision is provided, it defaults to 20 seconds (20000ms) as per the constructor's default parameter in row 125.

//Here is an example of how to create a new PrecisionClock instance with a custom precision of 5 seconds (5000ms) and start it:

const myPrecisionClock = new PrecisionClock('my precision custom clock update:', 5000);
myPrecisionClock.start();



// Here is the above code again, free of comments

/*

class PrecisionClock extends DigitalClock {
  constructor(prefix, precision = 1000) {
    super(prefix);
    this.precision = precision;
  }

  start() {
    this.display();
    this.timer = setInterval(() => this.display(), this.precision);
  }
}

*/



console.log('Exercise 7b');
// Exercise 7b: Create a new class AlarmClock that inherits from DigitalClock and adds the parameter wakeupTime in the format hh:mm.
// When the clock reaches this time, it should print a 'Wake Up you Bum' message and stop ticking.
// This wakeupTime parameter should default to 07:00 if not supplied.

// Step 1: define a new class called AlarmClock that inherits from DigitalClock
// This clock will display time and trigger an alarm at a specified wake-up time
class AlarmClock extends DigitalClock {

    // Step 2: define a constructor method that takes the same prefix parameter as DigitalClock and also a new wakeupTime parameter with a default value '07:00'
  constructor(prefix, wakeupTime = '07:00') {
    
    // Step 3: call the parent class's constructor using 'super' to ensure the prefix is set up correctly in the AlarmClock part of this class
    super(prefix);
    // 'super' = gives us access to the parent class's methods and properties
    //  (prefix) = this calls the constructor of the parent class (DigitalClock) with the prefix argument, allowing us to reuse the initialization logic for the prefix property defined in DigitalClock without having to rewrite it in AlarmClock


    // Step 4: store the wakeupTime as a property on this clock instance so it can be accessed in the start method
    this.wakeupTime = wakeupTime;
    // this.wakeupTime = this is a new property on the AlarmClock instance that stores the value of the wakeupTime parameter passed to the constructor
    // it allows us to use this value later in the start method to check if the current time matches the wake-up time and trigger the alarm    
    
  } // Step 5: close the constructor method using a closing curly brace


  // Step 6: override the start method to check the time against the wakeupTime and trigger the alarm when they match
  // This replaces the parent's start behavior with our custom version
  start() {
    
    // Step 7: display the time immediately when starting the clock so we don't wait for the first update, just like in the parent class 
    this.display();
    
    // Step 8: set up an interval to check the time every second (1000ms) and compare it to the wakeupTime
    this.timer = setInterval(() => {
      
        // Step 9: display the current time on each tick so we can see the time updating as it checks for the wake-up time
      this.display();
      
      // Step 10: create a new Date object to get the current time on each tick of the clock
      let date = new Date();
      
      // Step 11: build a string representing the current time in 'h:m' format to compare against the wakeupTime (which is in 'hh:mm' format)
      let currentTime = `${date.getHours()}:${date.getMinutes()}`;
      
      // Step 12: check if the current time matches the wake-up time and if so, print the alarm message and stop the clock
      if (currentTime === this.wakeupTime) {
               
        console.log('Wake Up you Bum');
        
        // Step 13: call the stop method to clear the interval and stop the clock from updating after the alarm goes off
        this.stop();
      } // Step 14: close the if statement and the setInterval callback function with closing curly braces
    } // Step 15: close the setInterval function and set the interval to check every 1000ms (1 second)
    , 1000); // Step 16: set the interval to check every 1000ms (1 second) then close the start method with a closing curly brace
  } // Step 17: close the start method with a closing curly brace
} // Step 18: close the AlarmClock class definition with a closing curly brace


// Here is the above code again, free of comments

/*

class AlarmClock extends DigitalClock {
  constructor(prefix, wakeupTime = '07:00') {
    super(prefix);
    this.wakeupTime = wakeupTime;
  }

  start() {
    this.display();
    this.timer = setInterval(() => {
      this.display();
      let date = new Date();
      let currentTime = `${date.getHours()}:${date.getMinutes()}`;
      if (currentTime === this.wakeupTime) {
        console.log('Wake Up you Bum');
        this.stop();
      }
    }, 1000);
  }
}     


*/

console.log('EXERCISE 8');
// EXERCISE 8: Using the starter code provided, create a decorator function to validate function arguments as strings.

console.log('Exercise 8a')
// Exercise 8a: Create a decorator function validateStringArg(fn) which will validate an argument passed to fn to ensure that it is a string
// It should throw an error if the argument is not a string
// Test it by decorating the given orderItems function below which takes an item name as an argument and returns a string, confirming the order.

// Step 1: below is a simple function from the exercise. 
// It takes an item name as an argument, and returns a string confirming the order for that item
function orderItems(itemName) { return `Order placed for: ${itemName}`; }


// Step 2: below is a simple decorator function "validateStringArg" that takes another function "fn" as an argument
// It then returns a new unnamed function which validates the argument "arg" passed to the original function "fn" to ensure it is a string
// An error will be thrown if the argument "arg" is not a string, otherwise it will call the original function "fn" with the argument "arg" and return its result
// Please note this decorator can only validate a single argument
// For multiple arguments, we will need to create a different decorator function, which we will do in Exercise 8b

function validateStringArg(fn) {
  return function(arg) {
    if (typeof arg !== 'string') {
      throw new Error('Argument must be a bloody string you abject moron!');
    }
    return fn(arg);
  }
}

// Step 3: decorate the orderItems function with the validateStringArg decorator
// This will create a new function that will validate its argument before calling the original orderItems function and returning its result
const validatedOrderItem = validateStringArg(orderItems); 


// Step 4: test the decorated function with a valid string argument to confirm it works as expected
console.log(validatedOrderItem("Apple Watch")); // This should print "Order placed for: Apple Watch" since the argument is a valid string


// Step 5: test the decorated function with an invalid argument (not a string) to confirm it throws an error and is caught in the catch block
try {
  console.log(validatedOrderItem(123)); // This should throw an error since the argument "123" is not a string, and the error message will be printed in the catch block below
} catch (error) {
  console.error('CATASTROPHIC SHOP ORDER MALFUNCTION:', error.message);
}

// Here is the above code again, free of comments for your convenience

/*

function orderItems(itemName) {
  return `Order placed for: ${itemName}`;
}

function validateStringArg(fn) {
  return function(arg) {
    if (typeof arg !== 'string') {
      throw new Error('Argument must be a bloody string you abject moron, "123" is not a valid item name!');
    }
    return fn(arg);
  };
}

const validatedOrderItem = validateStringArg(orderItems);

console.log(validatedOrderItem("Apple Watch"));

console.log(validatedOrderItem(123));

*/



console.log('Exercise 8b');
// Exercise 8b: Extend orderItems to use the ... rest operator, allowing multiple item name arguments
// Include them all in the returned string

// Step 1: define a new function "orderItemsMultiple" that accepts any number of arguments using the rest operator
function orderItemsMultiple(...itemNames) {
  // (...itemNames) = this is called a rest parameter
  // it allows the function to accept any number of arguments and stores them in an array called itemNames
  

    // Step 2: join all item names with a comma and space, then return a formatted string confirming the order for all items
    // For example: "Order placed for: Vision Pro, iPad Pro, Mac Studio"
    // Step 1: Use template literal to create the return message
    // Step 2: Call itemNames.join(', ') to convert the array into a comma-separated string
    // Step 3: Insert the joined string into the template literal
    return `Order placed for: ${itemNames.join(', ')} you lucky bastard!`;

} // Step 3: close the orderItems function with a closing curly brace

// Step 4: Create a new decorator function validateMultipleStringsArg(fn) which can validate MULTIPLE arguments passed to fn to ensure that they are strings
// A decorator is a function that takes another function and extends its behavior without modifying it
// This decorator will check that ALL arguments passed to the wrapped function are strings

// Step 5: create decorator function called validateMultipleStringsArg that takes a function "fn" as an argument
function validateMultipleStringsArg(fn) {
  
  // Step 6: return a new function that uses the rest operator to accept any number of arguments (e.g., ...args)
  return function(...args) {
  // (...args) = collects all arguments into an array called 'args' that we can then loop through to validate each one

    // Step 7: loop through each argument in the "args" array and check if it is a string
    for (let arg of args) {
      
      // Step 8a: Check if the current argument is NOT a string type
      if (typeof arg !== 'string') {
        // Step 8b: If any argument is not a string, throw an error to stop execution
        throw new Error(`Arguments must be bloody strings you abject moron!`);
      } // Step 8c: close the if statement with a closing curly brace
    } // Step 9: close the for loop with a closing curly brace

    // Step 10: if all arguments passed validation, call the original function "fn" with the validated arguments and return its result
    return fn(...args);
    // fn(...) = this calls the original function "fn" that we are decorating, and passes the validated arguments to it
    // (...args) = this spreads the array of arguments back into individual arguments when calling the original function "fn", allowing us to pass all the validated arguments to it as separate parameters

  }; // Step 11: close the returned function with a closing curly brace
} // Step 12: close the validateMultipleStringsArg function with a closing curly brace



// Step 13: decorate the orderItemsMultiple function with validateMultipleStringsArg
// This creates a new function called validatedOrderItemsMultiple that will validate its arguments, before calling the original orderItemsMultiple function and returning its result
// Now when validatedOrderItemsMultiple is called, it will first check all arguments are strings
const validatedOrderItemsMultiple = validateMultipleStringsArg(orderItemsMultiple);


// Step 14: call the decorated function "validatedOrderItemsMultiple" with multiple string arguments to confirm it works as expected

// All arguments (e.g. "Vision Pro") will be validated
// They will then be passed to orderItemsMultiple as an "itemNames" array, which will join them into a single string and return the formatted string confirming the order for all items

console.log(validatedOrderItemsMultiple("Vision Pro", "iPad Pro", "Mac Studio"));

// Here is the above code again, free of comments for your convenience

/*
function orderItemsMultiple(...itemNames) {
  return `Order placed for: ${itemNames.join(', ')} you lucky bastard!`;
}

function validateMultipleStringsArg(fn) {
  return function(...args) {
    for (let arg of args) {
      if (typeof arg !== 'string') {
        throw new Error(`Arguments must be bloody strings you abject moron!`);
      }
    }
    return fn(...args);
  };
}

const validatedOrderItemsMultiple = validateMultipleStringsArg(orderItemsMultiple);

console.log(validatedOrderItemsMultiple("Vision Pro", "iPad Pro", "Mac Studio"));

*/




console.log('Exercise 8c');
// Exercise 8c: Extend the decorator function to validate as strings all arguments passed to fn
// This means that if any argument passed to the decorated function is not a string, an error will be thrown and the original function will not be called at all



// I feel like I did this already in exercise 8c.





console.log('Exercise 8d');
// Exercise 8d: When testing the decorated function, use try-catch blocks to handle errors thrown for non-string arguments

// I feel like I did this already in exercise 8a.


console.log('EXERCISE 9');
// EXERCISE 9: We can delay execution of a function using setTimeout, where we need to provide both the callback function and the delay after which it should execute.

function randomDelay() { 

}

try {
  randomDelay().then(() => console.log('Bro, there appears to have been a delay.'));
} catch (error) {
  console.error('Exercise 9: DISASTROUS MALFUNCTION.', error.message);
}


console.log('Exercise 9a');
// Exercise 9a: Create a promise-based alternative to randomDelay() that delays execution for a random amount of time (between 1 and 20 seconds)
// It should then return a promise we can use via .then()

function randomDelayPromise() {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 20) + 1;
    setTimeout(() => {
      resolve(delay);
    }, delay * 1000);
  });
}   

randomDelayPromise().then(() => console.log('Exercise 9a: Bro, there has been a successful delay.'))


// Here is the above code again, free of comments for your convenience

/*

function randomDelayPromise() {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 20) + 1;
    setTimeout(() => {
      resolve(delay);
    }, delay * 1000);
  });
}   

randomDelayPromise().then(() => console.log('Exercise 9a: There has been a successful delay.'))

*/

console.log('Exercise 9b');
// Exercise 9b: Create a promise-based alternative randomDelayEvenOnlyPromise() similar to randomDelayPromise  
// However, if the random delay is even number, consider this a successful delay and resolve the promise.
// If the random number is odd, consider this a failure and please reject it

function randomDelayEvenOnlyPromise() {
  return new Promise((resolve, reject) => {
    
    const delay = Math.floor(Math.random() * 20) + 1;

    setTimeout(() => {

      if (delay % 2 === 0) {
        resolve(`Exercise 9b/c: SUCCESS. Delay was ${delay} seconds. We dig even people. Welcome to Australia.`);
      } else {
        reject(new Error(`Delay was ${delay} seconds, we don't accept odd people. Fuck right off.`));
      }

    }, delay * 1000);

  });
}


console.log('Exercise 9c');
  // Exercise 9c: Update the testing code to catch rejected promises and print a different message

randomDelayEvenOnlyPromise()
  .then(message => console.log(message))
  .catch(error => console.error('Exercise 9b/c: DISASTROUS MALFUNCTION.', error.message)); 
 


console.log('Exercise 9d');
// Exercise 9d: Try to update the then and catch messages to include the random delay value

try {
  randomDelayEvenOnlyPromise()
    .then(message => console.log(message))
    .catch(error => console.error('Exercise 9d: DISASTROUS MALFUNCTION.', error.message));
} catch (error) {
  console.error('Exercise 9d: DISASTROUS MALFUNCTION.', error.message);
} 



console.log('EXERCISE 10');
// EXERCISE 10: Fetch is a browser-based function to send a request and receive a response from a server, which uses promises to handle the asynchronous response.

// The below fetchURLData uses fetch to check the response for a successful status code
// It returns a promise containing the JSON sent by the remote server if successful, or an error if it failed

// run 'npm init' and accept all the defaults
// run 'npm install node-fetch'
// run 'npm pkg set type=module'

import fetch from 'node-fetch';
globalThis.fetch = fetch;

function fetchURLData(url) {
  let fetchPromise = fetch(url).then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  });
  return fetchPromise;
}

fetchURLData('https://jsonplaceholder.typicode.com/todos/1')
  .then(data => console.log(data))
  .catch(error => console.error(error.message));


// Here is the above code again, free of comments

/*
import fetch from 'node-fetch';
globalThis.fetch = fetch;

function fetchURLData(url) {
  let fetchPromise = fetch(url).then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  });
  return fetchPromise;
}

fetchURLData('https://jsonplaceholder.typicode.com/todos/1')
  .then(data => console.log(data))
  .catch(error => console.error(error.message));

*/

console.log('Exercise 10a');
// Exercise 10a: Write a new version of this function using async/await





console.log('Exercise 10b');
// Exercise 10b: Test both functions with valid and invalid URLs





console.log('Exercise 10c extension');
// Exercise 10c extension: Extend your new function to accept an array of URLs and fetch all of them, using Promise.all to combine the results.










