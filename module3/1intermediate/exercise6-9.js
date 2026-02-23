
console.log("EXERCISE 6");

// EXERCISE 6 Create a function unique(duplicatesArray) which takes an array parameter that may include duplicates.
// Your function should return an array containing only the unique values from duplicatesArray.
// Test with the following arrays and create another one of your own.

// Step 1: define a function called unique that accepts an array (duplicatesArray) as input
function unique(duplicatesArray) {
  // Step 2: inside the function, create a new Set from the input array to remove duplicates
  return [...new Set(duplicatesArray)];

  // duplicatesArray = this is the input array passed to the function

  // Set(duplicatesArray) = Set is a built-in JavaScript data structure that stores UNIQUE values only
  //   passing an array to Set automatically removes duplicates
  //   example: Set(['red', 'green', 'blue', 'red']) → {'red', 'green', 'blue'}

  // new Set(duplicatesArray) = creates a new Set object from the input array duplicatesArray, which contains only unique values

  // ... = (spread syntax) converts the Set back into an array
  //   a Set is not an array, so we need to convert it back to an array to return the result
  //   the spread operator (...) expands each item from the Set
  //   wrapping in [...] collects those items into a new array
  //   Example: [...{'red', 'green', 'blue'}] → ['red', 'green', 'blue']

  // return = sends the final unique array back to the caller
} // Step 3: close the Set function

// 6. Create an array of colour strings with some duplicate values
const colours = ['red', 'green', 'blue', 'yellow', 'orange', 'red', 'blue', 'yellow'];

// 7. Create an array of test scores with some duplicate values
const testScores = [55, 84, 97, 63, 55, 32, 84, 91, 55, 43];

// 8. Create your own array with duplicate numbers
const myArray = [1, 2, 3, 4, 5, 1, 1, 3];

// 9. Call unique() with colours array and print the result
console.log(unique(colours)); // [ 'red', 'green', 'blue', 'yellow', 'orange' ]

// 10. Call unique() with testScores array and print the result
console.log(unique(testScores)); // [ 55, 84, 97, 63, 32, 91, 43 ]

// 11. Call unique() with myArray and print the result
console.log(unique(myArray)); // [ 1, 2, 3, 4, 5 ]



console.log("EXERCISE 7");

// EXERCISE 7 Use the following array of book objects to practice the array functions for map, find and filter.
// Test each of your answers to the below tasks.

const books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
  { id: 3, title: '1984', author: 'George Orwell', year: 1949 },
  { id: 4, title: 'Brave New World', author: 'Aldous Huxley', year: 1932 },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 1951 },
];


console.log("map book titles");
// Use map array function to create an array of book titles from the books array
// map() is an array method or functionality that creates a new array by applying a function to each element of the original array
// it is exactly the same as a for…of loop when iterating through an array 

const bookTitles = books.map(book => book.title);

console.log(bookTitles); // [ 'The Great Gatsby', 'To Kill a Mockingbird', '1984', 'Brave New World', 'The Catcher in the Rye' ]

console.log("find book titles");
// Use find array function to get the book object with the title '1984'

const book1984 = books.find(book => book.title === '1984');

console.log(book1984); // { id: 3, title: '1984', author: 'George Orwell', year: 1949 }

console.log("filter books before 1950");
// Use filter array function to get all books published before 1950

const booksBefore1950 = books.filter(book => book.year < 1950);

console.log(booksBefore1950); // [ { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 }, { id: 3, title: '1984', author: 'George Orwell', year: 1949 }, { id: 4, title: 'Brave New World', author: 'Aldous Huxley', year: 1932 } ]

console.log('Exercise 7a');
// Exercise 7a: write a function getBookTitle(bookId) that uses the find function to return the title of the book object with the matching id.

function getBookTitle(bookId) {
  const book = books.find((book) => book.id === bookId);
  return book ? book.title : null;
}

console.log(getBookTitle(3)); // '1984'

console.log('Exercise 7b');
// Exercise 7b: write a function getOldBooks() that uses the filter function to return all book objects written before 1950.

function getOldBooks() {
  return books.filter((book) => book.year < 1950);
}

console.log(getOldBooks());

console.log('Exercise 7c');
// Exercise 7c: write a function addGenre() that uses the map function to add a new genre property to all of the above books, with the value 'classic'.

function addGenre() {
  return books.map((book) => ({ ...book, genre: 'classic' }));
}

console.log(addGenre());

console.log('Exercise 7d ext');
// Exercise 7d ext: write a function getTitles(authorInitial) that uses map and filter together to return an array of book titles for books written by authors whose names start with authorInitial

function getTitles(authorInitial) {
  return books
    .filter((book) => book.author.startsWith(authorInitial))
    .map((book) => book.title);
}

console.log(getTitles('G')); // [ '1984' ]

console.log('Exercise 7e ext');
// Exercise 7e ext: write a function latestBook() that uses find and forEach to get the book with the most recent publication date.

// Step 1: define a function called latestBook that takes no parameters
function latestBook() {

// Step 2: inside the function, create a variable called latest and initialize it to the first book in the books array
  let latest = books[0];

// Step 3: use forEach to iterate through each book in the books array
  books.forEach((book) => {

    // Step 4: inside the loop, compare the year of the current book with the year of the latest book
    if (book.year > latest.year) {
      
      // Step 5: if the current book is more recent, update the latest variable to the current book
      latest = book;

    } // Step 6: close the if statement

  } // Step 7: close the forEach loop
) // Step 8: close the forEach function call

;

  // Step 8: after the loop finishes, return the latest variable which now holds the most recent book
  return latest;
} // Step 9: close the function definition



// Step 10: call the latestBook function and print the result to verify it returns the correct book object
console.log(latestBook()); // { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 }



console.log('Exercise 8');
// EXERCISE 8: The following code creates a new Map object for storing names beginning with A, B, or C with their phone numbers.
// A Map is a collection of key-value pairs where each key is unique.
// A Map is like an object but with keys that can be any data type (not just strings) and it maintains the order of entries.
// Maps are rarely used.

// Step 1: Create a new Map object called phoneBookABC
const phoneBookABC = new Map();

// Step 2: Add entries to the Map using .set(key, value)
// The first argument is the key (name), the second is the value (phone number)
phoneBookABC.set('Annabelle', '0412312343');  // Adds Annabelle's phone number
phoneBookABC.set('Barry', '0433221117');      // Adds Barry's phone number
phoneBookABC.set('Caroline', '0455221182');   // Adds Caroline's phone number


// Exercise 8a) Create a new phoneBookDEF Map to store names beginning with D, E or F
// Create another empty Map called phoneBookDEF
const phoneBookDEF = new Map();


// Exercise 8b) Initialise the contents of phoneBookDEF by passing in an array of keys/values
// Add three contacts to phoneBookDEF using .set()
phoneBookDEF.set('David', '0412345678');   // David's phone number
phoneBookDEF.set('Emma', '0423456789');    // Emma's phone number
phoneBookDEF.set('Frank', '0434567890');   // Frank's phone number

// Exercise 8c) Update the phone number for Caroline in phoneBookABC to '0400000188'

// .set() also updates existing keys - Caroline's number is changed
phoneBookABC.set('Caroline', '0400000188');

console.log('Exercise 8d');
// Exercise 8d) Write a function printPhoneBook(contacts) that prints the names and phone numbers in the given Map

// Step 1: define a function that accepts a Map as input and prints all entries
function printPhoneBook(contacts) {

    // Step 2: use forEach to iterate through each entry in the Map and print the name and phone number
    contacts.forEach((phoneNumber, name) => {
    // forEach iterates over each entry in the Map
    // For Maps, the callback receives (value, key) - note: value comes first!
    // phoneNumber = the value (phone number string)
    // name = the key (person's name)


        // Step 3: inside the loop, print the name and phone number in a readable format
        console.log(`${name}: ${phoneNumber}`);
        // ${name} = template literal inserts the name variable into the string
        // ${phoneNumber} = template literal inserts the phoneNumber variable into the string

  } // Step 4: close the forEach loop 
) // Step 5: close the forEach function call
;
  // After the loop finishes, all contacts have been printed
} // Step 6: close the function definition


console.log('Phone Book ABC:');
printPhoneBook(phoneBookABC);

console.log('Phone Book DEF:');
printPhoneBook(phoneBookDEF);



console.log('Exercise 8e');
// Exercise 8e) Combine the contents of the two individual Maps into a single phoneBook Map

// Step 1: Create a new Map called phoneBook
const phoneBook = new Map([...phoneBookABC, ...phoneBookDEF]);
  // Use spread syntax (...) to convert both Maps into arrays of entries, then merge them
  // [...phoneBookABC, ...phoneBookDEF] creates an array of all key-value pairs from both Maps
  // new Map() converts the combined array back into a single Map


console.log('Combined Phone Book:');

// Step 2: Print the contents of the combined phoneBook Map to verify it contains all entries from both Maps
printPhoneBook(phoneBook);

console.log('Exercise 8f names in combined phone book');
// Exercise 8f) Print out the full list of names in the combined phone book

// Use forEach to iterate and print only the names (keys)

phoneBook.forEach((phoneNumber, name) => {
  console.log(name);  // Print just the name, not the phone numbers
});



console.log('Exercise 9');

// EXERCISE 9: Here is an ordinary object called salaries that stores the names and salaries of some employees.

let salaries = { "Timothy" : 35000, "David" : 25000, "Mary" : 55000, "Wayne Rooney" : 30_000_000, "James" : 43000 };

console.log('Exercise 9a');
// Exercise 9a: write a function sumSalaries(salaries) that calculates and returns the total of all salaries

// Step 1: define a function called sumSalaries that accepts an object (salaries) as input
function sumSalaries(salaries) {

    // Step 2: Initialize a variable 'total' to 0 to keep track of the running total of salaries
        let total = 0;

    // Step 2: Start a for...in loop to iterate over each property (key) in the salaries object
    
    for (let key in salaries) {
    // for (... in ...) = loops through each 'key' in the 'salaries' object
    // key = will be each employee name on each iteration (eg "Timothy" "David" "Mary")
    // salaries = the object we are iterating over, which contains key-value pairs of employee names and their salaries
      
            
      // Step 3: Add the current salary value to the running total
      total += salaries[key];
      // "total" refers to the variable we initialized to 0 before the loop, which will accumulate the sum of salaries
      // "salaries[key]"" accesses the value associated with the current key
      // Example: if key is "Timothy", then salaries["Timothy"] = 35000
      // "+="" is a shorthand operator that adds the value on the right, to the variable on the left, and updates it with the new value
      // So "total += salaries[key]" is equivalent to "total = total + salaries[key]"


        // After each iteration, the loop moves to the next key in the object
        // Iteration 1: total = 0 + 35000 = 35000 (Timothy)
        // Iteration 2: total = 35000 + 25000 = 60000 (David)
        // Iteration 3: total = 60000 + 55000 = 115000 (Mary)
        // Iteration 4: total = 115000 + 30000000 = 30115000 (Wayne Rooney)
        // Iteration 5: total = 30115000 + 43000 = 30158000 (James)
    } // Step 4: close the for...in loop
    
    // Step 5: After the loop finishes, return the "total" variable which now contains the sum of all salaries
    return total;
} // Step 6: close the function definition

// Step 7: Call the sumSalaries function with the salaries object and print the result
console.log(sumSalaries(salaries)); // 30_000_000 + 35000 + 25000 + 55000 + 43000 = 30_208_000


console.log('Exercise 9b');
// Exercise 9b: Write a function topEarner(salaries) that calculates and returns the name of the person earning the highest salary

// Step 1: define a function called topEarner that accepts an object (salaries) as input
function topEarner(salaries) {
    
    // Step 2: Initialize a variable 'topName' to an empty string
    // This variable will store the name of the person with the highest salary found so far
    // Starting with '' (empty string) means no name is selected initially
    let topName = '';

    // Step 3: Initialize a variable 'topSalary' to 0
    // This variable will store the highest salary value found so far
    // Starting at 0 ensures any positive salary will be greater
    let topSalary = 0;

    // Step 4: Start a for...in loop to iterate over each property (key) in the salaries object
    for (let key in salaries) {
    // 'key' will be each employee name on each iteration (e.g., "Timothy", "David", "Mary", etc.)
    // 'in' is used to loop over the enumerable properties of an object

        // Step 5: Check if the current person's salary is greater than the current top salary
        if (salaries[key] > topSalary) {
        // salaries[key] accesses the value associated with the current key
        // Example: if key is "Timothy", then salaries["Timothy"] = 35000
        // > is the greater than comparison operator

            // Step 5a: Update topSalary to the current person's salary
            // This becomes the new highest salary found so far
            topSalary = salaries[key];

            // Step 5b: Update topName to the current person's name (key)
            // This stores the name of the person with the new highest salary
            topName = key;
        } // Step 5c: close the if statement
        
        // If the condition is false (current salary <= topSalary), skip the if block
        // The loop continues to the next key in the object

        // Iteration trace:
        // Iteration 1: key="Timothy", salaries["Timothy"]=35000, 35000 > 0 → topSalary=35000, topName="Timothy"
        // Iteration 2: key="David", salaries["David"]=25000, 25000 > 35000 → false, no change
        // Iteration 3: key="Mary", salaries["Mary"]=55000, 55000 > 35000 → topSalary=55000, topName="Mary"
        // Iteration 4: key="Wayne Rooney", salaries["Wayne Rooney"]=30000000, 30000000 > 55000 → topSalary=30000000, topName="Wayne Rooney"
        // Iteration 5: key="James", salaries["James"]=43000, 43000 > 30000000 → false, no change
    
      } // Step 6: close the for...in loop

    // Step 7: when the loop finishes (all keys processed), return the name of the top earner
    return topName;
} // Step 8: close the function definition

// Step 9: call the topEarner function with the salaries object and print the result
console.log(topEarner(salaries)); // 'Wayne Rooney' with 30_000_000 salary is the top earner


console.log('Exercise 9c');
// Exercise 9c: write a function averageSalary(salaries) that calculates and returns the average salary

// Step 1: define a function called averageSalary that accepts an object (salaries) as input
function averageSalary(salaries) {
    
  // Step 2: calculate the total sum of all salaries using the sumSalaries function
    let total = sumSalaries(salaries);

    // Step 3: count the number of employees by getting the length of the keys array
    let count = Object.keys(salaries).length;
    // Object.keys(salaries) returns an array of the keys (employee names) in the salaries object
    // .length gives the number of keys, which is the number of employees


    // Step 4: calculate the average by dividing the total by the count
    return total / count;
    // / is the division operator, which divides the total sum of salaries by the number of employees to get the average salary

} // Step 5: close the function definition


// Step 6: call the averageSalary function with the salaries object and print the result
console.log(averageSalary(salaries)); // 30_208_000 / 5 = 6_041_600 

