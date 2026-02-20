

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

// Exercise 3e Write a function findMatchingAnimals(beginsWith) that returns a new array containing all the animals that begin with the beginsWith string.
// Try to make it work regardless of upper/ lower case.

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


// Exercise 4 Write a function camelCase(cssProp) that changes dash-separated CSS properties like 'margin-left' into camel-cased 'marginLeft'.

function camelCase(cssProp) {
  
  // Step 1: Split the text wherever there is a dash '-'.
  // Example: "margin-left" becomes ["margin", "left"].
  const parts = cssProp.split('-');

  // Step 2: Start from index 1 (the second word), not 0.
  // We keep the first word lowercase in camelCase.
  for (let i = 1; i < parts.length; i++) {

    // Step 3: Make the first letter of each next word uppercase,
    // then add the rest of that word unchanged.
    // Example: "left" becomes "Left".
    
    parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
  }

  // Step 4: Join all words back together with no spaces or dashes.
  // Example: ["margin", "Left"] becomes "marginLeft".
  return parts.join('');
}

