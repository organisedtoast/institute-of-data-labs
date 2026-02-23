console.log('Exercise 10');

// Exercise 10: The following code creates a new Map object for storing names beginning with A, B, or C with their phone numbers.

const phoneBookABC = new Map();  // An empty Map to begin with
phoneBookABC.set('Annabelle', '0412312343');
phoneBookABC.set('Barry', '0433221117');
phoneBookABC.set('Caroline', '0455221182');

console.log('Exercise 10a');
// Exercise 10a: print the total number of minutes that have passed so far today

const now = new Date();

const minutesPassed = now.getHours() * 60 + now.getMinutes();

console.log(`Minutes passed today: ${minutesPassed}`);


console.log('Exercise 10b');
// Exercise 10b: print the total number of seconds that have passed so far today

const secondsPassed = minutesPassed * 60 + now.getSeconds();

console.log(`Seconds passed today: ${secondsPassed}`);



console.log('Exercise 10c');
// Exercise 10c: calculate and print your age as: 'I am x years, y months and z days old'

const birthDate = new Date('1990-02-01'); // Replace with your actual birth date
const today = new Date();

let ageYears = today.getFullYear() - birthDate.getFullYear();
let ageMonths = today.getMonth() - birthDate.getMonth();
let ageDays = today.getDate() - birthDate.getDate();

// Adjust for negative months or days
if (ageDays < 0) {
  ageMonths -= 1;
  ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // Get days in previous month
}
if (ageMonths < 0) {
  ageYears -= 1;
  ageMonths += 12;
}

console.log(`I am ${ageYears} years, ${ageMonths} months and ${ageDays} days old.`);    


console.log('Exercise 10d');
// Exercise 10d: write a function daysInBetween(date1, date2) which calculates and returns the amount of days in between the two given dates.

function daysInBetween(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const diffDays = Math.abs((date2 - date1) / oneDay);
  return diffDays;
}

// example usage:
const date1 = new Date('2020-01-01');
const date2 = new Date('2020-01-31');
console.log(daysInBetween(date1, date2)); // Output: 30

