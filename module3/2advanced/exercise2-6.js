console.log("Exercise 2");

// EXERCISE 2: The following delayMsg function is intended to be used to delay printing a message until some time has passed.

// Step 1: Define a function called delayMsg that takes one parameter 'msg'
function delayMsg(msg) {
  
    // Step 2: Print a message to the console using a template literal
    console.log(`This message will be printed after a delay: ${msg}`);
    // The ${msg} placeholder is replaced with the actual message value
  
  } // Step 3: close the function definition with a closing curly brace. 
  // The function is now defined and can be used to print delayed messages to the console.
  // The function is defined but NOT yet executed


// Step 3: Schedule delayMsg to run after 100 milliseconds (0.1 seconds)
setTimeout(delayMsg, 100, "#1: Delayed by 100ms");
// Arguments are (function, delay in ms, argument-to-pass-to-function)

// Step 4: Schedule delayMsg to run after 20 milliseconds
setTimeout(delayMsg, 20, "#2: Delayed by 20ms");
// This will fire BEFORE Step 3 because 20ms < 100ms

// Step 5: Schedule delayMsg to run after 0 milliseconds
setTimeout(delayMsg, 0, "#3: Delayed by 0ms");
// Even with 0ms delay, it still goes to the back of the queue and will run after the current call stack is cleared, which is why it will run after the immediate message in Step 6.

// Step 6: Call delayMsg DIRECTLY (no delay)
delayMsg("#4: Not delayed at all");
// This executes IMMEDIATELY, before any of the setTimeout calls above because it's a direct function call, it's not scheduled to run after a delay.



// Exercise 2a: What order will the four tests above print in? Why?

// The expected order of the printed messages will be:

// 1. "#4: Not delayed at all" (printed immediately)
// 2. "#3: Delayed by 0ms" (scheduled to run after the current call stack is cleared, but with no actual delay)
// 3. "#2: Delayed by 20ms" (scheduled to run after a delay of 20 milliseconds)
// 4. "#1: Delayed by 100ms" (scheduled to run after a delay of 100 milliseconds)

// The reason for this order is that the setTimeout function schedules the execution of the provided callback function after the specified delay. 
// The message with no delay #4 is printed immediately, while the others are scheduled to run after their respective delays. 
// The message #3 with a delay of 0ms will still be executed after the current call stack is cleared, which is why it comes after the immediate message #4.




console.log("Exercise 2b");
// Exercise 2b: Rewrite delayMsg as an arrow function and use it in the setTimeout calls.


// Step 1: Declare a constant variable called delayMsgArrow
// This uses an ARROW FUNCTION syntax instead of the 'function' keyword
const delayMsgArrow = (msg) => {
  
  // Step 2: Print the message to the console (same as before)
  // Arrow functions automatically bind 'this' from the surrounding context
  console.log(`This message will be printed after a delay: ${msg}`);
} // Step 3: close the function definition with a closing curly brace.

// Arrow functions are a shorter, modern way to write functions in JS compared to traditional function expressions. They also have different behavior with respect to the 'this' binding, which can be useful in certain contexts.

// Step 4: Schedule the arrow function to run after 100ms
setTimeout(delayMsgArrow, 100, "#1: Delayed msgArrow arrow by 100ms");

// Step 5: Schedule the arrow function to run after 20ms
setTimeout(delayMsgArrow, 20, "#2: Delayed msgArrow by 20ms");

// Step 6: Schedule the arrow function to run after 0ms
setTimeout(delayMsgArrow, 0, "#3: Delayed msgArrow by 0ms");

// Step 7: Call the arrow function DIRECTLY (no delay)
// This executes immediately, before any setTimeout callbacks
delayMsgArrow("#4: msgArrow not delayed at all");        



console.log("Exercise 2c");
// Exercise 2c: Add a fifth test which uses a large delay time (greater than 10 seconds)

setTimeout(delayMsgArrow, 10000, "#5: Delayed by 10 seconds");


console.log("Exercise 2d");
// Exercise 2d: Use clearTimeout to prevent the #5 test from printing at all.

// Step 1: Schedule a delayed call and store the returned ID
const timeoutId = setTimeout(delayMsgArrow, 10000, "#5: Delayed by 10 seconds");
// setTimeout returns a unique identifier that can be used to cancel the timer

// Step 2: Cancel the scheduled timer using the stored ID
clearTimeout(timeoutId);
// This prevents the message from ever being printed



console.log("Exercise 3 debouncing - don't worry too much about this one, it's a common pattern but can be a bit tricky to understand at first. Focus on the concept of debouncing and how the timer is reset on each call to the debounced function.");
// EXERCISE 3 Debouncing is a concept that refers to 'putting off' the execution of multiple, fast-timed, similar requests until there's a brief pause...
// ... then only executing the most recent of those requests. 

// It's often used to handle fast-firing scrolling events in a browser, or to prevent multiple server requests being initiated if a user clicks repeatedly on a button.

// Step 1: Define a simple function that prints a message
// Breakdown of: function printMe() { console.log('printing debounced message') }
// ┌──────────┐ ┌───────┐ ┌──┐ ┌────────────────────────────────────────────┐
// │ function │ │printMe│ │()│ │{ console.log('printing debounced message') }│
// └──────────┘ └───────┘ └──┘ └────────────────────────────────────────────┘
//    │            │       │                      │
//    │            │       │                      └─ Function body: the code that runs when called
//    │            │       │                         - console.log() prints to the browser console
//    │            │       │                         - '...' is a string literal (text)
//    │            │       │
//    │            │       └─ Empty parentheses: this function takes NO parameters/arguments
//    │            │
//    │            └─ Function name: how we refer to and call this function
//    │
//    └─ Keyword: tells JavaScript we are creating a function
function printMe() { console.log('printing debounced message') }

// Step 2: Wrap printMe with the debounce function
printMe = debounce(printMe);
// this replaces printMe with a debounced version that waits for inactivity

// Step 3: Fire off 3 calls to printMe within 300ms
// Because of debouncing, only the LAST call will actually execute (after 1000ms of no calls)
// Timeline:
//   - 100ms: First call arrives, timer starts (will fire at 1100ms)
//   - 200ms: Second call arrives, timer is CLEARED and restarted (will fire at 1200ms)
//   - 300ms: Third call arrives, timer is CLEARED and restarted (will fire at 1300ms)
//   - 1300ms: No more calls, so the message finally prints
setTimeout( printMe, 100);
setTimeout( printMe, 200);
setTimeout( printMe, 300);



console.log("Exercise 3a");
// Exercise 3a: Create a debounce(func) decorator
// This is a wrapper that takes a function func and suspends calls to func until there's 1000 milliseconds (1 sec) of inactivity.
// After this 1 second pause, the most recent call to func should be executed and any others ignored.

// Step 1: Define the debounce function that takes another function func as a parameter
function debounce(func) {
  
  // Step 2: Declare a variable timeoutId to hold the ID of the timer
  // This is in the closure, so it persists between calls to the returned function and allows us to clear the timer if a new call comes in before it fires
    let timeoutId;
  
  // Step 3: Return a new anonymous function that wraps the original function
  // This is the function that will be called instead of the original function and will handle the debouncing logic
    return function(...args) {
  // ...args = collects all arguments passed to the debounced function into an array called args, allowing us to pass them to the original function later
  
      // Step 4: Clear any existing timer - this cancels the previous scheduled call
        clearTimeout(timeoutId);
      // This is the key to debouncing: reset the timer on every call

    // Step 5: Set a new timer for 1000ms (1 second)
    // When the timer expires, call the original function with the stored arguments

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, 1000); 

  }; // Step 6: Close the debounce function definition with a closing curly brace.
} // Step 7: Close the inner anonymous function definition with a closing curly brace. This is the function that will be returned by debounce and will handle the debouncing logic when called. 


// ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
// │ DEBOUNCE FUNCTION BREAKDOWN                                                                        │
// └────────────────────────────────────────────────────────────────────────────────────────────────────┘

// Line 173: function debounce(func) {
// ┌──────────┐ ┌─────────┐ ┌──────┐
// │ function │ │debounce │ │(func)│
// └──────────┘ └─────────┘ └──────┘
//    │            │           │
//    │            │           └─ Parameter: the function to be debounced
//    │            │
//    │            └─ Function name
//    │
//    └─ Keyword: declares a function

// Line 175: let timeoutId;
// ┌────┐ ┌───────────┐
// │let │ │timeoutId; │
// └────┘ └───────────┘
//   │          │
//   │          └─ Variable name: stores the timer ID between calls (in closure)
//   │
//   └─ Keyword: declares a block-scoped variable (can be reassigned)

// Line 177: return function(...args) {
// ┌────────┐ ┌─────────┐ ┌──────────┐
// │return  │ │function │ │(...args) │
// └────────┘ └─────────┘ └──────────┘
//    │          │            │
//    │          │            └─ Rest parameter: collects all arguments into 'args' array
//    │          │
//    │          └─ Anonymous function (no name, returned directly)
//    │
//    └─ Returns the wrapper function to the caller

// Line 179: clearTimeout(timeoutId);
// ┌─────────────┐ ┌───────────┐
// │clearTimeout │ │(timeoutId)│
// └─────────────┘ └───────────┘
//       │              │
//       │              └─ Cancels the timer with this ID
//       │
//       └─ Built-in function: cancels a timer created by setTimeout

// Line 181-183: timeoutId = setTimeout(() => { func.apply(this, args); }, 1000);
// ┌───────────┐ ┌────────────┐ ┌─────────────────────────────────────┐
// │timeoutId =│ │setTimeout  │ │(() => { func.apply(this, args); }, 1000)│
// └───────────┘ └────────────┘ └─────────────────────────────────────┘
//     │             │                        │
//     │             │                        └─ Arrow function callback + delay (1000ms = 1 second)
//     │             │
//     │             └─ Schedules code to run after a delay
//     │
//     └─ Stores the timer ID for later cancellation

// Line 182: func.apply(this, args);
// ┌──────┐ ┌─────────┐ ┌────┐ ┌──────────┐
// │func  │ │.apply   │ │(this, args)│
// └──────┘ └─────────┘ └────┘ └──────────┘
//   │         │           │        │
//   │         │           │        └─ Arguments array collected from wrapper
//   │         │           │
//   │         │           └─ 'this' context (preserved from caller)
//   │         │
//   │         └─ Method: calls func with explicit 'this' and arguments
//   │
//   └─ The original function passed to debounce




console.log("Exercise 3b");
// Exercise 3b:Extend the debounce decorator function to take a second argument ms.
// ms should define the length of the period of inactivity instead of hardcoding to 1000ms.

function debounce(func, ms) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, ms);
  };
}



console.log("Exercise 3c");
// Exercise 3c: Extend debounce to allow the original debounced function printMe to take an argument msg which is included in the console.log statement.

function debounce(func, ms) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, ms);
  };
} 

function printMe(msg) { console.log(`printing debounced message: ${msg}`) } 
printMe = debounce(printMe, 1000); 

setTimeout(() => printMe("First call"), 100); 
setTimeout(() => printMe("Second call"), 200); 
setTimeout(() => printMe("Third call"), 300);




console.log("Exercise 4")
// EXERCISE 4: The Fibonacci sequence of numbers is a famous pattern where the next number in the sequence is the sum of the previous 2.

// Exercise 4a: Write a function printFibonacci() using setInterval that outputs a number in the Fibonacci sequence every second.


// ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
// │ FIBONACCI FUNCTION - 8 LINE BREAKDOWN                                                              │
// └────────────────────────────────────────────────────────────────────────────────────────────────────┘

// Line 287: function printFibonacci() {
// ┌──────────┐ ┌─────────────────┐ ┌──┐ ┌─┐
// │ function │ │printFibonacci   │ │()│ │{│
// └──────────┘ └─────────────────┘ └──┘ └─┘
//    │              │                │    │
//    │              │                │    └─ Opening brace: starts the function body (code block)
//    │              │                │
//    │              │                └─ Empty parentheses: this function takes NO parameters
//    │              │
//    │              └─ Function name: descriptive name following camelCase convention
//    │
//    └─ Keyword: tells JavaScript we are defining a function
function printFibonacci() {

  // Line 288: let a = 0, b = 1;
  // ┌────┐ ┌───────┐ ┌──────┐
  // │let │ │a = 0, │ │b = 1;│
  // └────┘ └───────┘ └──────┘
  //   │       │          │
  //   │       │          └─ Variable 'b': initialized to 1 (second Fibonacci number)
  //   │       │
  //   │       └─ Variable 'a': initialized to 0 (first Fibonacci number)
  //   │
  //   └─ Keyword: declares block-scoped variables that can be reassigned
  // NOTE: Two variables declared in one line, separated by a comma
  let a = 0, b = 1;

  // Line 289: console.log(a);
  // ┌───────────────┐ ┌───┐
  // │console.log    │ │(a)│
  // └───────────────┘ └───┘
  //       │              │
  //       │              └─ Argument: prints the value of 'a' (starts at 0)
  //       │
  //       └─ Built-in method: outputs text/values to the browser's console
  // NOTE: Executes IMMEDIATELY when function is called - prints first Fibonacci number
  console.log(a);

  // Line 290: setInterval(() => {
  // ┌─────────────┐ ┌───────────┐
  // │setInterval  │ │(() => {  │
  // └─────────────┘ └───────────┘
  //       │                │
  //       │                └─ Arrow function: modern syntax for anonymous function
  //       │                    - () = no parameters
  //       │                    - => = "arrow" that points to the function body
  //       │
  //       └─ Built-in function: repeatedly calls a function at fixed time intervals
  setInterval(() => {

    // Line 291: console.log(b);
    // ┌───────────────┐ ┌───┐
    // │console.log    │ │(b)│
    // └───────────────┘ └───┘
    //       │              │
    //       │              └─ Argument: prints the value of 'b' (next Fibonacci number)
    //       │
    //       └─ Outputs to console - runs every 1 second after the initial 'a' print
    console.log(b);

    // Line 292: [a, b] = [b, a + b];
    // ┌───────────┐ ┌────┐ ┌───────┐
    // │[a, b] =   │ │[b, │ │a + b];│
    // └───────────┘ └────┘ └───────┘
    //     │                   │
    //     │                   └─ Right side: NEW values as an array
    //     │                        - Position 0: current value of 'b'
    //     │                        - Position 1: sum of 'a + b' (next Fibonacci number)
    //     │
    //     └─ Left side: DESTRUCTURING pattern
    //        - 'a' receives value from position 0 (old 'b')
    //        - 'b' receives value from position 1 (old 'a + b')
    // NOTE: Both assignments happen SIMULTANEOUSLY using the OLD values
    //       Example: if a=0, b=1 → after: a=1, b=1
    //                if a=1, b=1 → after: a=1, b=2
    //                if a=1, b=2 → after: a=2, b=3
    [a, b] = [b, a + b];

    // Line 293: }, 1000);
    // ┌────┐ ┌──────┐
    // │ }, │ │1000);│
    // └────┘ └──────┘
    //   │         │
    //   │         └─ Delay: 1000 milliseconds = 1 second between each execution
    //   │
    //   └─ Closing: ends the arrow function body and setInterval call
    // NOTE: This callback repeats FOREVER (until page closes or clearInterval is called)
  }, 1000);

  // Line 294: }
  // ┌─┐
  // │}│
  // └─┘
  //   │
  //   └─ Closing brace: ends the printFibonacci function definition
}

// Here is a version of the above printFibonacci function without comments for your perusal.

/*

function printFibonacci() {
  let a = 0, b = 1;
  console.log(a);
  setInterval(() => {
    console.log(b);
    [a, b] = [b, a + b];
  }, 1000);
}

*/


printFibonacci();




console.log("Exercise 4a")
// Now, make the function print until 10 seconds have passed, then stop.

function printFibonacciWithLimit() {
  let a = 0, b = 1;
  console.log(a); // Print the first number in the sequence
  const intervalId = setInterval(() => {
    console.log(b); // Print the next number in the sequence
    [a, b] = [b, a + b]; // Update a and b to the next two numbers in the sequence
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalId); // Stop printing after 10 seconds
  }, 10000);
}

printFibonacciWithLimit();  



/*

console.log("Exercise 4b")
// Exercise 4b: Write a new version printFibonacciTimeouts() that uses nested setTimeout calls to do the same thing.

function printFibonacciTimeouts() {
  let a = 0, b = 1;
  console.log(a); // Print the first number in the sequence

  function printNext() {
    console.log(b); // Print the next number in the sequence
    [a, b] = [b, a + b]; // Update a and b to the next two numbers in the sequence
    setTimeout(printNext, 1000);
  }

  setTimeout(printNext, 1000);
}

printFibonacciTimeouts(); 

console.log("Exercise 4c")
// Exercise 4c: Extend one of the above functions to accept a limit argument, which tells it how many numbers to print before stopping.

function printFibonacciTimeouts(limit) {
  let a = 0, b = 1;
  let count = 1;
  console.log(a); // Print the first number in the sequence

  function printNext() {
    if (count >= limit) return;
    console.log(b); // Print the next number in the sequence
    [a, b] = [b, a + b]; // Update a and b to the next two numbers in the sequence
    count++;
    setTimeout(printNext, 1000);
  }

  setTimeout(printNext, 1000);
}

printFibonacciTimeouts(10);


console.log("Exercise 5")
// EXERCISE 5: The following car object has several properties and a method which uses them to print a description.

let car = {
  make: "Porsche",
  model: "911",
  year: 1964,

  description() {
    console.log(`This car is a ${this.make} ${this.model} from ${this.year}`);
  },
};

car.description(); // works
setTimeout(car.description, 200); // fails

// Why does the setTimeout call fail to print the description of the car?

// The setTimeout call fails to print the description of the car because when the description method is passed as a callback to setTimeout, it loses its context (the value of 'this'). 
// In JavaScript, the value of 'this' inside a function depends on how the function is called. 
// When setTimeout calls the description function, it does so without any context, so 'this' inside the description function does not refer to the car object, resulting in undefined values for make, model, and year.

console.log("Exercise 5a")
// Exercise 5a: Fix the setTimeout call so that it correctly prints the description of the car after 200 milliseconds.

setTimeout(() => car.description(), 200); 

console.log("Exercise 5b")
// Exercise 5b: Change the year for the car by creating a clone of the original and overriding it.

let carClone = { ...car, year: 2020 };
carClone.description(); // This will print the description with the updated year  


console.log("Exercise 5c")
// Exercise 5c: Does the delayed description() call use the original values or the new values from b)? Why?

// The delayed description() call uses the original values from the car object, not the new values from carClone. 
// This is because the setTimeout call was made with a reference to the original description method of the car object, which uses the properties of the car object. 
// The carClone is a separate object with its own properties, and the setTimeout call does not have any reference to it.
// So it continues to use the original car object's properties when it executes the description method after the delay.

console.log("Exercise 5d")
// Exercise 5d: Use bind to fix the description method so that it can be called from within setTimeout without a wrapper function

setTimeout(car.description.bind(car), 200);


console.log("Exercise 5e")
// Exercise 5e: Change another property of the car by creating a clone and overriding it, and test that setTimeout still uses the bound value from d)

let carClone2 = { ...car, model: "Cayenne" };

carClone2.description(); // This will print the description with the updated model

setTimeout(car.description.bind(car), 200); // This will still use the bound value from d)



console.log("Exercise 6")
// Exercise 6: Use the Function prototype to add a new delay(ms) function to all functions, which can be used to delay the call to that function by ms milliseconds.

function delay(func, ms) {
  return function(...args) {
    setTimeout(() => func.apply(this, args), ms);
  };
}


Function.prototype.delay = function(ms) {
  const fn = this;
  return function(...args) {
    setTimeout(() => fn.apply(this, args), ms);
  };
}; 

console.log("Exercise 6a")
// Exercise 6a: use the example multiply function below to test it with, as above, and assume that all delayed functions will take two parameters

function multiply(a, b) 
{ console.log( a * b ); } multiply.delay(500)(5, 5); // prints 25 after 500 milliseconds

console.log("Exercise 6b")
// Exercise 6b: Use apply to improve your solution so that delayed functions can take any number of parameters


console.log("Exercise 6c")
// Exercise 6c: Modify multiply to take 4 parameters and multiply all of them, and test that your delay prototype function still works.

function multiply(a, b, c, d) {
  console.log(a * b * c * d);
}

multiply.delay(500)(2, 3, 4, 5); // prints 120 after 500 milliseconds 




*/


