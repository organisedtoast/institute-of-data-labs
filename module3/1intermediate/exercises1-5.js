

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

  // Step 2: Turn string into an array of words
  let wordsArray = Array.from(str.split(" "));

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


/* EXERCISE 2a Create a function truncate(str, max) that truncates a given string of text if its total length is greater than the max length.
It should return either the truncated text, with an ellipsis (…) added to the end if it was too long, or the original text otherwise.*/

// Step 1: Define a function named truncatesentence that takes 2 parameters: 'str' (the input string) and 'max' (the max allowed length)
function truncatesentence(str, max) {  

  // Step 2: Check if the length of the input string 'str' is greater than the specified 'max' length
  if (str.length > max) {

    // Step 3: If it is too long, return a truncated version of the string with an ellipsis at the end
    return str.slice(0, max) + "…";

  } else {  // Step 4: If the string is NOT too long (length is less than or equal to max), execute this block

    // Step 5: If it is not too long, return the original string unchanged
    return str;
  }

}

// Call the function truncate with the string "This is a long string that needs to be truncated." and a max length of 20, then print the result
console.log(truncatesentence("Arsenal have no chance of winning the EPL this season.", 20));


/* EXERCISE 2b Write another variant of the truncate function that uses a conditional operator.*/

// Define a function named truncateWithConditionalOperator that takes two parameters: 'str' (the input string) and 'max' (the maximum allowed length)
function truncateWithConditionalOperator(str, max) {  

  // The ternary operator works like a compact if-else:
  // Condition: str.length > max (check if string length exceeds max)
  // If true: str.slice(0, max) + "…" (truncate and add ellipsis)
  // If false: str (return the original string unchanged)
  return str.length > max ? str.slice(0, max) + "…" : str;

} // End of the function definition

// Call the function truncateWithConditionalOperator with the string "Manchester United are struggling this season." and a max length of 25, then print the result
console.log(truncateWithConditionalOperator("Manchester United are struggling this season because they have a bad manager.", 25));


