
console.log("EXERCISE 1")

// EXERCISE 1a Write a function that takes a string and capitalizes the first letter of each word.


// Step 1: Define a function named CapitalizeFirstLetters that takes one parameter 'str' (the input string)
function CapitalizeFirstLettersString(str) {  

  // Step 2: Split the input string into an array of words, using space as the separator
  let words = str.split(" ");  

  // Step 3: Start a loop that goes through each word in the array 
  // (i starts at 0, continues while i is less than the number of words)
  for (let i = 0; i < words.length; i++) {  


    // Step 4:Take the first character of the current word, make it uppercase, then add the rest of the word unchanged
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);  

  }  // Step 5: End of the for loop

  // Step 6: Join all the words back together into a single string, with spaces between them, and return the result
  return words.join(" ");  

}  // Step 7: End of the function definition

// Step 8: Call the function CapitalizeFirstLettersString with the string "paul pogba" and print the result to the console
console.log(CapitalizeFirstLettersString("paul pogba"));  


/* EXERCISE 1b Write another function that capitalizes the first letter of each word.
 However, this time convert it into an array first before modifying into capital letters.
 Then convert back to string in the end.*/

// Step 1: Define a function named capitalizeFirstLettersArray that takes one parameter 'str' (the input string)
function capitalizeFirstLettersArray(str) {  

  // Step 2: Store words in an array called "wordsArray" , the array is comprised of a string converted into an array
  let wordsArray = Array.from(str.split(" "));
  // let wordsArray = create a new variabe called 'wordsArray'
  // Array.from(...) = create a new array from array-like/ iterable data
  // str.split(" ") = take a variable called 'str' and apply a string method called split which splits the string by " "

  // Step 3: Loop through each word
  for (let i = 0; i < wordsArray.length; i++) {

  // Step 4: Get the current word from the array at position i and store it in the variable 'word'
    let word = wordsArray[i];

    // Step 5: Capitalize first letter and rebuild word
    
        wordsArray[i] = // word.charAt(0).toUpperCase() - gets the first character of the word and makes it uppercase
      word.charAt(0).toUpperCase() +  // word.slice(1) - gets the rest of the word starting from the second character (unchanged)
      word.slice(1);   // The + combines the uppercase first letter with the rest of the word

  } // Step 6: End of the function definition

  // Step 7: Convert array back into string
  return wordsArray.join(" ");

} // Step 8: End of the function definition


// Step 9: Call the function capitalizeFirstLettersArray with the string "michael carrick" and print the result to the console
console.log(capitalizeFirstLettersArray("michael carrick"));  


console.log("EXERCISE 2")

/* EXERCISE 2a Create a function truncate(str, max) that truncates a given string of text if its total length is greater than the max length.
It should return either the truncated text, with an ellipsis (…) added to the end if it was too long, or the original text otherwise.*/

// Step 1: Define a function named truncatesentence that takes 2 parameters: 'str' (the input string) and 'max' (the max allowed length)
function truncatesentence(str, max) {  

  // Step 2: Check if the length of the input string 'str' is greater than the specified 'max' length
  if (str.length > max) {

    // Step 3: If it is too long, return a truncated version of the string with an ellipsis at the end
    return str.slice(0, max) + "…";
// str is your input string
// .slice(0, max) takes characters starting at position 0 (the start) up to max.
// Then + "…" adds an ellipsis at the end.


  } else {  // Step 4: If the string is NOT too long (length is less than or equal to max), execute this block

    // Step 5: If it is not too long, return the original string unchanged
    return str;
  }

} // Step 6: End of the function definition

// Step 7: Call the function truncate with the string "This is a long string that needs to be truncated." and a max length of 20, then print the result
console.log(truncatesentence("Arsenal have no chance of winning the EPL this season.", 36));


/* EXERCISE 2b Write another variant of the truncate function that uses a conditional operator.*/

// Step 1: Define a function named truncateWithConditionalOperator that takes two parameters: 'str' (the input string) and 'max' (the maximum allowed length)
function truncateWithConditionalOperator(str, max) {  

  // Step 2: Write a conditional/ ternary operator in the format: condition ? value_if_true : value_if_false
  // Condition ? = is the string longer than the maximum allowed length?
  // value_if_true = keep only the first 'max' characters and add an ellipsis ...
  // // value_if_false = return the original string as it is
  return str.length > max ? str.slice(0, max) + "…" : str;

} // Step 3: End of the function definition

// Step 4: Call the function truncateWithConditionalOperator with the string "Manchester United are struggling this season." and a max length of 25, then print the result
console.log(truncateWithConditionalOperator("Arsenal have no chance of winning the EPL this season.", 36));



console.log("EXERCISE 3")

/* EXERCISE 3 Here is an array.*/

const animals = ['Tiger', 'Giraffe'] 

console.log(animals)

// Exercise 3a Add 2 new values to the end
animals.push("Elephant", "Penguin");

// Exercise 3b Add 2 new values to the beginning
animals.unshift("Echidna", "Wombat");

// Exercise 3c Sort the values alphabetically
animals.sort();

console.log(animals)

console.log("EXERCISE 3d")
// Exercise 3d Write a function replaceMiddleAnimal(newValue) that replaces the value in the middle of the animals array with newValue

// Step 1: Define a function named replaceMiddleAnimal that takes one parameter 'newValue' (the new animal to replace the middle one)
function replaceMiddleAnimal(newValue) {
// function means you are creating a reusable block of code.
// replaceMiddleAnimal is the function’s name (what you call to run it).
// newValue is an input (parameter) the function receives.
// { starts the function body, where the instructions go.

  // Step 2: Calculate the index of the middle position in the animals array.
    const middleIndex = Math.floor(animals.length / 2);
// const middleIndex = store that number in a variable middleIndex that won’t be reassigned
// Math.floor(...) = round down to a whole number
// animals.length = how many items are in the animals array (6)
// / 2 = move to the halfway point, so 6 / 2 = 3, which is the 4th item (index 3) in the array (since counting starts at 0)

  // Step 3: Replace the middle item in the animals array with the new value.
  animals[middleIndex] = newValue;
// animals[middleIndex] = “the item in the animals array at position middleIndex”.
// = means “set this to”.
// newValue = the new item you want to put there

} // Step 4: End of the function definition


// Step 5: Call the function replaceMiddleAnimal with the argument "Koala"
// This replace the middle animal in the array, being Penguin (4th animal out of 6, at index 3) with Koala
replaceMiddleAnimal("Koala");

// Step 6: Print the updated animals array to the console to see the change
console.log(animals);

console.log("EXERCISE 3e")
// Exercise 3e Write a function findMatchingAnimals(beginsWith) that returns a new array containing all the animals that begin with the beginsWith string.
// Try to make it work regardless of upper case letters or lower case letters.

// Step 1: Define a function named findMatchingAnimals that takes one parameter 'beginsWith' (the string to match the beginning of animal names)
function findMatchingAnimals(beginsWith) {

  // Step 2: Convert user input to lowercase.
  // This helps us compare text without worrying about uppercase/lowercase.
  const lowerBeginsWith = beginsWith.toLowerCase();
// const lowerBeginsWith = stores that lowercase version in a new variable
// beginsWith = some text input (for example "C").
// .toLowerCase() = changes that text to lowercase (so "C" becomes "c").


  // Step 3: Use filter to check every animal in the animals array.
  // Keep only the animals whose lowercase name starts with lowerBeginsWith.
  // startsWith(...) checks the beginning of each word.
  return animals.filter(animal => animal.toLowerCase().startsWith(lowerBeginsWith));
// return = gives back the new filtered list
// animals.filter(...) = goes through each animal in the animals array and keeps only those that match the condition inside the filter
// animal => ... = for each animal, do the following check:
// animal.toLowerCase() = convert the animal name to lowercase for comparison
// .startsWith(lowerBeginsWith) = check if the lowercase animal name starts with the lowercase user input


} // Step 4: End of the function definition


// Step 5: Call the function findMatchingAnimals with various arguments "K" "k" "T" "E" and print the result to the console
console.log(findMatchingAnimals("K"));
console.log(findMatchingAnimals("k"));
console.log(findMatchingAnimals("T"));
console.log(findMatchingAnimals("E"));


console.log("EXERCISE 4a")

// EXERCISE 4a Write a function camelCase(cssProp) that changes dash-separated CSS properties like 'margin-left' into camel-cased 'marginLeft'.
// The function should remove all dashes, and uppercase the first letter of each word after a dash.


// Step 1: Create a function named `camelCase`.
// This function takes one input called `cssProp` (a CSS property string)
// and will run code inside to convert/ handle that value.
function camelCase(cssProp) {
  
  // Step 2: Split the text wherever there is a dash '-'.
  // Example: "margin-left" becomes ["margin", "left"].
  const parts = cssProp.split('-');
// const parts = create a variable 'parts' that cannot be reassigned.
// cssProp = an input variable, in this case a CSS property string
// .split('-') = “break this string at every -”

  // Step 3: Start a stadard for loop that repeats code from each item in 'parts', commencing from index 1 (the second item).
  // We keep the first word lowercase in camelCase.
  for (let i = 1; i < parts.length; i++) {
// let i = 1 = start counting at index 1 (not 0).
// i < parts.length = keep going while i is still a valid position in the array.
// i++ = add 1 to i after each loop.


    // Step 4: Make the first letter of each next word uppercase,
    // then add the rest of that word unchanged.
    // Example: "left" becomes "Left".
        parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
  }
// parts[i] = the current word (like "color").
// .charAt(0) = gets the first letter ("c").
// .toUpperCase() = turns it into uppercase ("C").
// .slice(1) = gets the rest of the word after the first letter ("olor").
// + joins the C with the olor ("Color")
// 'parts[i] =' = this saves the new word back into the array

  // Step 5: Join all words back together with no spaces or dashes.
  // Example: ["margin", "Left"] becomes "marginLeft".
  return parts.join('');
} 

// Step 6: Call the function camelCase with different CSS properties and print the results to the console
console.log(camelCase('margin-left')) // marginLeft 
console.log(camelCase('background-image')) // backgroundImage
console.log(camelCase('display')) // display

console.log("EXERCISE 4b")
// EXERCISE 4b Create a variant of the camelCase function that uses a for...in loop, WITH the conditional/ternary operator

// Step 1: declare a function named 'camelCaseWithForIn' that takes in one parameter 'cssProp' (the input CSS property string)

function camelCaseWithForIn(cssProp) {
//   - cssProp = a CSS property string in kebab-case (e.g., 'border-radius')

  // Step 2: Split the CSS property string into an array of parts
  //   - split('-') divides the string at each hyphen
  //   - Example: 'border-radius' becomes ['border', 'radius']
  const parts = cssProp.split('-');
  
  // Step 3: Loop through each index of the parts array using for...in
  //   - 'i' is the index (0, 1, 2, ...)
  //   - 'parts' is the array being looped through
  for (let i in parts) {
    
    // Step 4: Use ternary operator to conditionally transform each part
    // format of ternary operator: condition ? value_if_true : value_if_false

    parts[i] = i > 0 ? parts[i].charAt(0).toUpperCase() + parts[i].slice(1) : parts[i];
    
    //   Condition = i > 0 (is this NOT the first word?)

    //   If true: Capitalize first letter + keep rest of word
    //   parts[i].charAt(0).toUpperCase() = gets first letter and makes it uppercase

    //   If false: Keep the word as-is (first word stays lowercase) 
    //   parts[i].slice(1) = gets the rest of the word (from index 1 to end)

  } // Step 5: close the for...in loop with a curly brace
  
  // Step 6: join all parts back into a single string (no separator)
    return parts.join('');
//   Example: ['border', 'Radius'] becomes 'borderRadius'

} // Step 7: close the function definition with a curly brace 


// Step 8: Call the function camelCaseWithForIn with different CSS properties and print the results to the console
console.log(camelCaseWithForIn('border-radius')) // borderRadius
console.log(camelCaseWithForIn('font-size')) // fontSize
console.log(camelCaseWithForIn('color')) // color


console.log("EXERCISE 4c")
// EXERCISE 4c Create a variant of the camelCase function that uses a for...in loop, WITHOUT the conditional/ ternary operator

// Step 1: declare function named 'camelCaseWithForInNoConditional' that takes one parameter 'cssProp' (the input CSS property string)

function camelCaseWithForInNoConditional(cssProp) {

  // Step 2: Split the CSS property string into an array of parts
  //   - split('-') divides the string at each hyphen
  //   - Example: 'border-radius' becomes ['border', 'radius']
  const parts = cssProp.split('-');
  
  // Step 3: Loop through each index of the parts array using for...in

  for (let i in parts) {
  //   - 'i' is the index (0, 1, 2, ...)
  //   - 'parts' is the array being looped through

    // Step 4: Use if statement to check if this is NOT the first word
    
    if (i > 0) {
    //   - i > 0 means we skip the first word (index 0)
    //   - Only words after the first get capitalized

      // Step 5: Transform the word to start with uppercase
            parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
      //   - parts[i].charAt(0).toUpperCase() - gets first letter and makes it uppercase
      //   - parts[i].slice(1) - gets the rest of the word (from index 1 to end)
      //   - Example: 'radius' becomes 'Radius'

    } // Step 6: close the if statement with a curly brace

  } // Step 7: close the for...in loop with a curly brace
  
  // Step 8: Join all parts back into a single string (no separator)
    return parts.join('');
    //   Example: ['border', 'Radius'] becomes 'borderRadius'

} // Step 9: close the function definition with a curly brace

// Step 10: Call the function camelCaseWithForInNoConditional with different CSS properties and print the results to the console
console.log(camelCaseWithForInNoConditional('border-radius')) // borderRadius
console.log(camelCaseWithForInNoConditional('font-size')) // fontSize
console.log(camelCaseWithForInNoConditional('color')) // color


console.log("EXERCISE 5")
// EXERCISE 5 Decimal number operations in JavaScript can lead to unexpected results, as in the following:

let twentyCents = 0.20
let tenCents = 0.10 

console.log(`${twentyCents} + ${tenCents} = ${twentyCents + tenCents}`) // 0.30000000000000004

// Reasoning for above answer is because JS (and many programming languages) represents decimal numbers in binary
// Some decimal fractions cannot be represented exactly in binary, leading to small rounding errors when performing arithmetic operations
// In this case, 0.20 and 0.10 cannot be represented precisely, so when they are added together, the result is slightly off from the expected 0.30

console.log("EXERCISE 5a")
// Exercise 5a: We can sometimes avoid this using the toFixed function to force the number of decimal places, but it’s not always useful.
// Explain why the below code returns the wrong answer

let fixedTwenty = twentyCents.toFixed(2);
let fixedTen = tenCents.toFixed(2); 

console.log(fixedTwenty + fixedTen) 

//The toFixed method converts the number into a string representation with a fixed number of decimal places.
//So fixedTwenty and fixedTen are now strings ("0.20" and "0.10"), and when you use the + operator on strings, it concatenates them instead of adding them as numbers.
// Therefore, "0.20" + "0.10" results in "0.200.10" instead of 0.30.

console.log("EXERCISE 5b")
// Exercise 5b: create a function currencyAddition(float1, float2) which safely adds the two decimal numbers float1 and float2 and returns the correct float result
// Assume 2 decimal places for currency values

// Step 1: declare a function by defining a function named 'currencyAddition' that accepts two parameters float1 and float2
function currencyAddition(float1, float2) {
// float1, float2 = the two decimal numbers to be added together
// currencyAddition = the name of the function that will perform the addition and return the correct result

  // Step 2: Add the two numbers together, round to 2 decimal places, and convert back to a number before returning the result
  return parseFloat((float1 + float2).toFixed(2));
  // return = gives back the final result of the function when it is called. In this case, it returns the correctly rounded sum of float1 and float2 as a number.   
  // parseFloat(...) = converts the string back to a number (since toFixed returns a string)
  // float1 + float2 = adds the two numbers together. Problem: JS floating-point math can give imprecise results (eg 0.1 + 0.2 = 0.30000000000000004)
  // .toFixed(2) = converts the result to a string rounded to exactly 2 decimal places. This fixes the floating-point precision issue for currency values


} // Step 3: close the function definition with a curly brace

// Step 4: Call the function currencyAddition with the arguments 0.1 and 0.2, then print the result to the console
console.log(currencyAddition(0.1, 0.2)) // 0.30
console.log(0.3 == currencyAddition(0.1, 0.2)) // true, because currencyAddition correctly rounds the result to 0.30, which is equal to 0.3 in JavaScript (trailing zeros after the decimal point do not affect the value of a number)


console.log("EXERCISE 5c")
// Exercise 5c: create a function currencyOperation(float1, float2, operation) which safely performs the given operation (either +, -, / or *) on the two numbers
// It should return the correct float result
// Assume 2 decimal places for currency values

// Step 1: define a reusable function named 'currencyOperation'
function currencyOperation(float1, float2, operation) {
// Takes 3 parameters:
//   - float1: first number (currency value)
//   - float2: second number (currency value)
//   - operation: a string representing the math operation ('+', '-', '*', '/')

  // Step 2: declare a variable 'result' to store the calculation result
  let result;
  
  // Step 3: open a switch statement to check the value of 'operation' and run different code blocks based on whether it's addition, subtraction, multiplication or division
    switch (operation) {
    // Step 3a: Case '+': perform addition
    case '+':
      result = float1 + float2;  // Add the two numbers
      break;  // Exit the switch (prevents falling through to other cases)
    // Step 3b: Case '-': perform subtraction
    case '-':
      result = float1 - float2;  // Subtract float2 from float1
      break;
    // Step 3c: Case '*': perform multiplication
    case '*':
      result = float1 * float2;  // Multiply the two numbers
      break;
    // Step 3d: Case '/': perform division
    case '/':
      result = float1 / float2;  // Divide float1 by float2
      break;
    // Step 3e: Default: runs if 'operation' doesn't match any case above
    default:
      // Throw an error to stop execution and notify the caller of invalid input
      throw new Error('Invalid operation');
  } // Step 4: close the switch statement using a curly brace
    
    // Step 5: After the switch, round the result to 2 decimal places and convert back to a number before returning
    return parseFloat(result.toFixed(2));
// result.toFixed(2) = rounds to 2 decimal places, returns a STRING
// parseFloat(...) = converts the string back to a number
// return = sends the final value back to the caller

} // Step 6: End of the function definition



// Step 7: Call the function currencyOperation with different operations and print the results to the console
console.log(currencyOperation(0.1, 0.2, '+')) // 0.30
console.log(currencyOperation(0.3, 0.1, '-')) // 0.20
console.log(currencyOperation(0.1, 0.2, '*')) // 0.02
console.log(currencyOperation(0.3, 0.1, '/')) // 3.00

console.log(0.3 == currencyOperation(0.1, 0.2, '+')) // true, because currencyOperation correctly rounds the result to 0.30, which is equal to 0.3 in JS 
// trailing zeros after the decimal point do not affect the value of a number


console.log("EXERCISE 5d extension")
// Exercise 5d: extend the Exercise 5c function to include a fourth argument numDecimals
// This argument should allow the operation to support different amounts of decimal places from 1 to 10

// Step 1: define a reusable function named 'currencyOperationWithDecimals' with 4 parameters: float1, float2, operation, numDecimals
function currencyOperationWithDecimals(float1, float2, operation, numDecimals) {
// 4 parameters description:
// float1: first number (currency value)
// float2: second number (currency value)
// operation: a string representing the math operation ('+', '-', '*', '/')
// numDecimals: number of decimal places to round to (1 to 10)

  // Step 2: declare a variable 'result' to store the calculation result
  let result;

  // Step 3a: open a switch statement to check the value of 'operation' and run different code blocks based on whether it's addition, subtraction, multiplication or division
  switch (operation) {
    // Step 3b: Case '+': perform addition
    case '+':
      result = float1 + float2;  // Add the two numbers
      break;  // Exit the switch (prevents falling through to other cases)
    // Step 3c: Case '-': perform subtraction
    case '-':
      result = float1 - float2;  // Subtract float2 from float1
      break;
    // Step 3d: Case '*': perform multiplication
    case '*':
      result = float1 * float2;  // Multiply the two numbers
      break;
    // Step 3e: Case '/': perform division
    case '/':
      result = float1 / float2;  // Divide float1 by float2
      break;
    // Step 3f: Default: runs if 'operation' doesn't match any case above
    default:
      // Throw an error to stop execution and notify the caller of invalid input
      throw new Error('Invalid operation');
  } // Step 4: close the switch statement using a curly brace


    // Step 5: After the switch, round the result to 'numDecimals' decimal places and convert back to a number before returning
  return parseFloat(result.toFixed(numDecimals));
  // result.toFixed(numDecimals) = rounds the result to the specified number of decimal places (numDecimals e.g. 2 for cents), returns a STRING (e.g., "0.30" not 0.30)
  // parseFloat(...) = converts the string back to a number type
  // return = sends the final value back to the caller

} // Step 6: End of the function definition

// Step 7: Call the function currencyOperationWithDecimals with different operations and numDecimals, then print the results to the console
console.log(currencyOperationWithDecimals(0.1, 0.2, '+', 3)) // 0.300
console.log(currencyOperationWithDecimals(0.3, 0.1, '-', 4)) // 0.2000
console.log(currencyOperationWithDecimals(0.1, 0.2, '*', 5)) // 0.02000
console.log(currencyOperationWithDecimals(0.3, 0.1, '/', 2)) // 3.00  






















