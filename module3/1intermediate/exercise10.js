console.log('Exercise 10');

// Exercise 10: The following code creates a new Map object for storing names beginning with A, B, or C with their phone numbers.

const phoneBookABC = new Map();  // An empty Map to begin with
phoneBookABC.set('Annabelle', '0412312343');
phoneBookABC.set('Barry', '0433221117');
phoneBookABC.set('Caroline', '0455221182');

console.log('Exercise 10a');
// Exercise 10a: print the total number of minutes that have passed so far today

// Step 1: Create a new Date object that represents the current date and time
const now = new Date();
// `new Date()` with no arguments gives you "right now"

// Step 2: Get the current hour (0-23) and multiply by 60 to convert to minutes
// Step 3: Get the current minute (0-59) and add it to the result
// This gives us the total minutes that have passed since midnight today
const minutesPassed = now.getHours() * 60 + now.getMinutes();

// Step 4: Print the result using a template literal (backticks allow ${} variable insertion)
console.log(`Minutes passed today: ${minutesPassed}`);

console.log('Exercise 10b');
// Exercise 10b: print the total number of seconds that have passed so far today

// Step 1: Take the minutes we already calculated and multiply by 60 to convert to seconds
// Step 2: Get the current second (0-59) using getSeconds() and add it to the result
// This gives us the total seconds that have passed since midnight today
const secondsPassed = minutesPassed * 60 + now.getSeconds();

// Step 3: Print the result using a template literal
console.log(`Seconds passed today: ${secondsPassed}`);


console.log('Exercise 10c');
// Exercise 10c: calculate and print your age as: 'I am x years, y months and z days old'

// Step 1: Create a Date object for your birth date (replace the string with your actual birth date in 'YYYY-MM-DD' format)
const birthDate = new Date('1990-02-01'); // Replace with your actual birth date

// Step 2: Create a Date object for today's date (we can reuse the `now` variable we created earlier, or create a new one)
const today = new Date(); // Get today's date

// Step 3: get the full year (eg 2026) from both dates and subtract to get age in years
let ageYears = today.getFullYear() - birthDate.getFullYear();

// Step 4: get the month (0-11, where 0 = January) from both dates and subtract to get month difference
let ageMonths = today.getMonth() - birthDate.getMonth();

// Step 5: get the day of the month (1-31) from both dates and subtract to get day difference
let ageDays = today.getDate() - birthDate.getDate();

// Step 6: Adjust the year and month calculations if the current month/day is before the birth month/day

// Step 7: Check if ageDays is negative (e.g., birth day was 25th but today is the 10th)
if (ageDays < 0) {

  // Step 8: Subtract 1 from months because we haven't completed the current month yet
  ageMonths -= 1;

  // Step 9: Add the total days from the previous month to ageDays
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  // `new Date(year, month, 0)` gives the last day of the previous month
  // `.getDate()` extracts that day number (e.g., 31 for January)

} // Step 10: close the if statement for negative ageDays

// Step 11: Check if ageMonths is negative (e.g., birth month was October but today is March)
if (ageMonths < 0) {
  // Step 12: Subtract 1 from years because we haven't reached the birth month yet this year
  ageYears -= 1;
  // Step 13: Add 12 months to get the correct positive month difference
  ageMonths += 12;
} // Step 14: close the if statement for negative ageMonths


// Step 15: Print the result using a template literal
console.log(`I am ${ageYears} years, ${ageMonths} months and ${ageDays} days old.`);    



console.log('Exercise 10d');
// Exercise 10d: write a function daysInBetween(date1, date2) which calculates and returns the amount of days in between the two given dates.

// Step 1: Define a function that takes two Date objects as parameters
function daysInBetween(date1, date2) {

  // Step 2: Calculate the number of milliseconds in one day
  // 24 hours × 60 minutes × 60 seconds × 1000 milliseconds
  const oneDay = 24 * 60 * 60 * 1000;
  
  // Step 3: Calculate the absolute difference in days between the two dates
  const diffDays = Math.abs((date2 - date1) / oneDay);
  // (date2 - date1) = difference in milliseconds
  // "/ oneDay" = converts milliseconds to days
  // Math.abs() = ensures the result is always positive (absolute value)

  // Step 4: Return the calculated number of days
  return diffDays;
  } // Step 5: close the function definition


// example usage:
const date1 = new Date('2020-01-01');
const date2 = new Date('2020-01-31');
console.log(daysInBetween(date1, date2)); // Output: 30

