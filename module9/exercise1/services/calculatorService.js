// This service file contains the calculator's business logic.
// A service sits between the controller and the underlying rules of the app.
// In a larger application, this makes the controller easier to read and test.

// Add two numbers and return the result.
const add = (number1, number2) => number1 + number2;

// Subtract the second number from the first number.
const subtract = (number1, number2) => number1 - number2;

// Multiply two numbers together.
const multiply = (number1, number2) => number1 * number2;

// Divide the first number by the second number.
// We keep the divide-by-zero rule here because it is a business rule,
// not an HTTP rule.
const divide = (number1, number2) => {
  if (number2 === 0) {
    return { error: 'Cannot divide by zero' };
  }

  return { result: number1 / number2 };
};

module.exports = {
  add,
  subtract,
  multiply,
  divide,
};
