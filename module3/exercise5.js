// Exercise 5: Rewrite the following function using: a) function expression syntax, and b) arrow function syntax. Test each version to make sure they work the same.

console.log ("Exercise 5: Rewrite the following function.")


console.log ("function declaration syntax:")
// 1) FUNCTION DECLARATION (classic syntax)
// "function getGreeting(name)" creates a named function.
// - "name" is a parameter (input to the function)
// - "return" sends the result back to where the function was called

function getGreeting(name) { return 'Hello ' + name + '!'; }

// Call the function and print the result
console.log (getGreeting("Freddy Function"))


console.log ("function expression syntax:")
// 2) FUNCTION EXPRESSION
// Here, a function is created and stored in a variable.
// You can think of it like: "put this function inside getGreetingExpression".

let getGreetingExpression = function(name) { return 'Hello ' + name + '!'; }

// Call the function and print the result
console.log (getGreetingExpression("Emily ExpressionF"))


console.log ("arrow function syntax:")
// 3) ARROW FUNCTION (modern shorter syntax, works like a function expression)
// "(name) => { ... }" is another way to write a function.
// It works similarly here: takes "name", returns a greeting.

let getGreetingArrow = (name) => { return 'Hello ' + name + '!'; }

// Call the function and print the result
console.log (getGreetingArrow("Andrew ArrowF"))











