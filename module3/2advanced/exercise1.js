console.log('Exercise 1 closures and decorators');

// EXERCISE 1: makeCounter below is a decorator function (makeCounter is the decorator, the defined function that you can call) that creates and returns an anonymous function which increments the counter.
// This means that each time the returned function is called, it will increment (i.e. increase by 1) the counter value and return it
// The initial value of the counter is set to 0 when makeCounter is called
// The counter value is maintained in the closure of the returned function, allowing it to persist across calls


// Step 1: define the makeCounter function - this is a "factory" function that creates counters
function makeCounter() {

  // Step 2: declare a variable currentCount and set it to 0
  let currentCount = 0;
  // This variable is private - it can only be accessed inside makeCounter and the function it returns  

    // Step 3: return an anonymous function (a function without a name)
    return function () {
    // This inner function "remembers" the currentCount variable even after makeCounter finishes running
    
    // Step 4: increment currentCount by 1 (shorthand for currentCount = currentCount + 1)
    currentCount++;

    // Step 5: print the new value to the console
    console.log(currentCount);

    // Step 6: return the new value so it can be used elsewhere if needed
    return currentCount;
  }; // Step 7: close the anonymous function

} // Step 8: close the makeCounter function

// Step 9: Call makeCounter() and store the returned function in counter1
// counter1 is now a function that, when called, will increment and return its own private counter
let counter1 = makeCounter();

// Step 10: Call counter1() - first call: currentCount goes from 0 to 1, logs "1"
counter1(); // 1

// Step 11: Call counter1() again - second call: currentCount goes from 1 to 2, logs "2"
// The key point: currentCount is NOT reset to 0 - it remembers its previous value!
counter1(); // 2


// Here is the same code again, without comments for your perusal.

/* 

function makeCounter() {

  let currentCount = 0;

  return function () {
    currentCount++;
    console.log(currentCount);
    return currentCount;
  };

}

let counter1 = makeCounter();

counter1();
counter1();

*/


// The closure is the inner function below.

/*

return function () {
  currentCount++;
  console.log(currentCount);
  return currentCount;
};

*/

// This is called a "closure" as it CLOSES over the currentCount variable, allowing it to persist and be modified across calls to this inner function


// The function factory above allows us to create multiple independent counters, each with its own private state.
// What exactly is the function factory doing? Each time we call makeCounter(), it creates a new currentCount variable and a new inner function that closes over that variable. This means that each counter we create has its own separate currentCount that is not shared with any other counter. This is the power of closures - they allow us to create private state that persists across function calls, enabling us to build more complex and powerful abstractions like this counter example.

console.log('Exercise 1a')
// Exercise 1a: Create a second counter counter2 using the makeCounter function and test to see if it remains independent to counter1

// Step 1: Call makeCounter() again to create a completely separate counter
// Each call to makeCounter() creates a new, independent closure with its own currentCount variable
let counter2 = makeCounter();

// Step 2: Call counter2() - this starts at 0, increments to 1, logs "1", and returns 1
counter2(); // 1

// Step 3: Call counter2() again - currentCount is now 1, increments to 2, logs "2", and returns 2
counter2(); // 2

// Step 4: Call counter1() again - it remembers its own state (was at 2), increments to 3, logs "3", and returns 3
// counter1 and counter2 are completely independent - they each have their own separate currentCount
counter1(); // 3 (counter1 should continue counting from where it left off, not reset to 1)


console.log('Exercise 1b')
// Exercise 1b: Modify makeCounter decorator function. Call it makeCounterB, make it take an argument 'startFrom' specifying where the counter starts from (instead of always starting from 0)


//Step 1: Add a parameter startFrom with a default value of 0
// The "= 0" means if no argument is provided, startFrom will be 0 by default

function makeCounterB(startFrom = 0) {

    // Step 2: Initialize currentCount with the value of startFrom
    // This allows the counter to start from any number, not just 0
    let currentCount = startFrom;

        // Step 3: Return an anonymous function that will increment and return currentCount
        // It still has access to currentCount through closure

        return function () {
  
          // Step 4: Increment currentCount by 1
        currentCount++;
    
        // Step 5: Print and return the new value
    
        console.log(currentCount);
        
        return currentCount;
  
     }; // Step 6: Close the inner anonymous function
} // Step 7: Close the makeCounter function

// Step 8: Create a new counter that starts from 5 instead of 0

let counter3 = makeCounterB(5);


counter3(); // 6 (as it starts from 5, the first call increments to 6)
counter3(); // 7 (as it continues counting from 6, the second call increments to 7)
counter1(); // 4 (counter1 should continue counting from where it left off, not reset to 1)


// Here is the same code again, without comments for your perusal.

/*
function makeCounterB(startFrom = 0) {
  let currentCount = startFrom;

  return function () {
    currentCount++;
    console.log(currentCount);
    return currentCount;
  };
}

let counter3 = makeCounterB(5);

*/




console.log('Exercise 1c')
// Exercise 1c: Modify makeCounter to take another argument incrementBy, which specifies how much each call to counter() should increase the counter value by

function makeCounterC(startFrom = 0, incrementBy = 1) {
  let currentCount = startFrom;

  return function () {
    currentCount += incrementBy;
    console.log(currentCount);
    return currentCount;
  };
}

let counter4 = makeCounterC(10, 2);

counter4(); // 12
counter4(); // 14
counter1(); // 5 (counter1 should continue counting from where it left off, not reset to 1)


// V IMPORTANT: IN PRACTICE DO NOT DEFINE FUNCTIONS OF THE SAME NAME IN THE SAME FILE, THIS WILL CAUSE ERRORS
// IF YOU WANT TO TEST OUT DIFFERENT VERSIONS OF THE FUNCTION, COMMENT OUT THE PREVIOUS VERSIONS TO AVOID NAME CONFLICTS


console.log('Exercise 1d extension')

function makeCounterD(start) {
  let count = start;
  return function(step) {  
    count = count + step;
    console.log(count);
    return count;
  };
}   

let counter5 = makeCounterD(56);

counter5(2); // 58 (starts from 56, increments by 2)

counter5(10); // 68 (continues from 58, increments by 10)






/* versus the original makeCounter function 

function makeCounter() {

  let currentCount = 0;

  return function () {
    currentCount++;
    console.log(currentCount);
    return currentCount;
  };

}

let counter1 = makeCounter();

counter1();

*/

