console.log("Exercise 2");

// EXERCISE 2: The following delayMsg function is intended to be used to delay printing a message until some time has passed.

function delayMsg(msg) {
  console.log(`This message will be printed after a delay: ${msg}`);
}

setTimeout(delayMsg, 100, "#1: Delayed by 100ms");
setTimeout(delayMsg, 20, "#2: Delayed by 20ms");
setTimeout(delayMsg, 0, "#3: Delayed by 0ms");
delayMsg("#4: Not delayed at all");


// Exercise 2a: What order will the four tests above print in? Why?

// The expected order of the printed messages will be:

// 1. "#4: Not delayed at all" (printed immediately)
// 2. "#3: Delayed by 0ms" (scheduled to run after the current call stack is cleared, but with no actual delay)
// 3. "#2: Delayed by 20ms" (scheduled to run after a delay of 20 milliseconds)
// 4. "#1: Delayed by 100ms" (scheduled to run after a delay of 100 milliseconds)

// The reason for this order is that the setTimeout function schedules the execution of the provided callback function after the specified delay. 
// The message with no delay is printed immediately, while the others are scheduled to run after their respective delays. 
// The message with a delay of 0ms will still be executed after the current call stack is cleared, which is why it comes after the immediate message.



console.log("Exercise 2b");
// Exercise 2b: Rewrite delayMsg as an arrow function and use it in the setTimeout calls.

const delayMsgArrow = (msg) => {
  console.log(`This message will be printed after a delay: ${msg}`);
}

setTimeout(delayMsgArrow, 100, "#1: Delayed by 100ms");
setTimeout(delayMsgArrow, 20, "#2: Delayed by 20ms");
setTimeout(delayMsgArrow, 0, "#3: Delayed by 0ms");
delayMsgArrow("#4: Not delayed at all");        

console.log("Exercise 2c");
// Exercise 2c: Add a fifth test which uses a large delay time (greater than 10 seconds)

setTimeout(delayMsgArrow, 10000, "#5: Delayed by 10 seconds");

console.log("Exercise 2d");
// Exercise 2d: Use clearTimeout to prevent the fifth test from printing at all.

const timeoutId = setTimeout(delayMsgArrow, 10000, "#5: Delayed by 10 seconds");
clearTimeout(timeoutId);


console.log("Exercise 3");
// EXERCISE 3 Debouncing is a concept that refers to 'putting off' the execution of multiple, fast-timed, similar requests until there's a brief pause...
// Then only executing the most recent of those requests. 

// It's often used to handle fast-firing scrolling events in a browser, or to prevent multiple server requests being initiated if a user clicks repeatedly on a button.

function printMe() { console.log('printing debounced message') } printMe = debounce(printMe); 
//create this debounce function for a) 

//fire off 3 calls to printMe within 300ms - only the LAST one should print, after 1000ms of no calls 
setTimeout( printMe, 100); 
setTimeout( printMe, 200); 
setTimeout( printMe, 300);

console.log("Exercise 3a");
// Exercise 3a: Create a debounce(func) decorator
// This is a wrapper that takes a function func and suspends calls to func until there's 1000 milliseconds of inactivity. 
// After this 1 second pause, the most recent call to func should be executed and any others ignored.

function debounce(func) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, 1000);
  };
} 

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
function printFibonacci() {
  let a = 0, b = 1;
  console.log(a); // Print the first number in the sequence
  setInterval(() => {
    console.log(b); // Print the next number in the sequence
    [a, b] = [b, a + b]; // Update a and b to the next two numbers in the sequence
  }, 1000);
}

printFibonacci();

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


