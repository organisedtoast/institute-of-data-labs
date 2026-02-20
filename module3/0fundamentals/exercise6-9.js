

const Garnacho = { name: 'Garnacho', poorperformerrank: 1 } 

const Bruno = { name: 'Bruno Fernandes', poorperformerrank: 0 } 

const DTrump = {
  firstName: 'Donald',
  lastName: 'Trump',
    
greeting(person) {
    let greeting = `Hello ${person.name}, my name is ${this.firstName} ${this.lastName}. `;
    console.log(greeting + this.youarefired(person));
  },


 youarefired(person) {
    if (person.poorperformerrank === 1) {
      return "You were the worst performer at the UEL final. You're fired!";
    }
    return "Well done on a great season at Man Utd. You're hired!";
  }
};  

DTrump.greeting(Garnacho)

DTrump.greeting(Bruno)



// Exercise 6a: Complete the DTrump object by adding a lastName property.

// added lastName property to DTrump object "lastName: 'Trump'"


// Exercise 6a: Add the lastName property to greeting so that it prints the full name of the person greeting in the console.

// added "my name is ${this.firstName} ${this.lastName}" to the greeting variable in the greeting method of the DTrump object


// Exercise 6b: Complete youarefired so that if the person argument has poorperformerrank === 1, it prints his famous catch phrase to the console.


// Exercise 6c: Now use arrow function syntax and ternary conditional operator to rewrite the youarefired method. Test that it still works as expected.

/*const Garnacho = { name: 'Garnacho', poorperformerrank: 1 };
const Bruno = { name: 'Bruno Fernandes', poorperformerrank: 0 };
*/

const DTrump2 = {
  firstName: 'Donald',
  lastName: 'Trump',

  greeting: (person) =>
    console.log(
      `Hello ${person.name}, my name is ${DTrump2.firstName} ${DTrump2.lastName}. ` +
      DTrump2.youarefired(person)
    ),

  youarefired: (person) =>
    person.poorperformerrank === 1
      ? "You were the worst performer at the UEL final. You're fired!"
      : "Well done on a great season at Man Utd. You're hired!"
};

DTrump2.greeting(Garnacho);
DTrump2.greeting(Bruno);



/* Exercise 7: The following object represents a basketball game and keeps track of the score as the game progresses. 

const basketballGame = { 
  // Stores the current score for the team.
  score: 0, 

  // Adds 1 point for a free throw.
  freeThrow() { 
    this.score++; 
  },
  
  // Adds 2 points for a regular basket.
  basket() { 
    this.score += 2; 
  }, 
  
  // Adds 3 points for a three-point shot.
  threePointer() { 
    this.score += 3; 
  }, 
  
  // Prints the score at halftime.
  halfTime() {
    console.log('Halftime score is '+this.score); } 
  }

*/

// Exercise 7a) Modify each of the methods so that they can be ‘chained’ together and the last line of the example code works*/

const basketballGame = {
  score: 0,   // ← add this to keep track of the current score
  fouls: 0,   // ← add this to keep track of fouls

  freeThrow() {
    this.score++;
    return this;   // ← allows chaining
  },

  basket() {
    this.score += 2;
    return this;   // ← allows chaining
  },

  threePointer() {
    this.score += 3;
    return this;   // ← allows chaining
  },

  addFoul() {
    this.fouls++;
    return this; // ← allows chaining
  },

  halfTime() {
    console.log('Half time score is ' + this.score + ' and fouls are ' + this.fouls);
    return this;   // ← allows chaining
  },

  fullTime() {
    console.log('Full time score is ' + this.score + ' and fouls are ' + this.fouls);
    return this;  // ← allows chaining
  }

};


// Calls methods one after another (method chaining).
basketballGame
  .freeThrow()
  .basket()
  .threePointer()
  .halfTime();


// Exercise 7b) Add a new method to print the full time final score

// Add a new function called fullTime to the existing basketballGame object.

/* This is the long way to do it. 

basketballGame.fullTime = function() {
  // Show the current score when the game is finished.
  // `this.score` means "the score inside basketballGame".
  console.log('Full time score is ' + this.score);
  // Return the object itself so more methods can be chained after this one.
  return this;
};

*/

/*The short way to do it is to add a fullTime method directly to the basketballGame object when we define it, as shown above re fullTime */

basketballGame
  .freeThrow()
  .basket()
  .threePointer()
  .halfTime()
  .fullTime();



// Exercise 7c) Add a new object property to keep track of the number of fouls. Add a method to increment it, similar but separate to the score. 
// Include the foul count in the half time and full time console messages

/*

// Create a new property on basketballGame to store foul count.
basketballGame.fouls = 0;

// Add a method that increases fouls by 1 each time it is called.
basketballGame.addFoul = function() {
  // `this.fouls` means the fouls value inside basketballGame.
  this.fouls++;
  // Return the object so we can chain another method call.
  return this;
};

// Replace/update halfTime so it prints both score and fouls.
basketballGame.halfTime = function() {
  // Show the current halftime score and total fouls.
  console.log('Halftime score is ' + this.score + ' and fouls are ' + this.fouls);
  // Return the object to keep method chaining possible.
  return this;
};

// Replace/update fullTime so it also prints both score and fouls.
basketballGame.fullTime = function() {
  // Show the final score and total fouls at the end of the game.
  console.log('Full time score is ' + this.score + ' and fouls are ' + this.fouls);
  // Return the object to allow chaining after this method too.
  return this;
};

*/

//the short way is to add the fouls property and addFoul method directly to the basketballGame object when we define it, as shown above re addFoul halfTime and fullTime methods

//I finally added addFoul to the method chain example for BasketballGame below to test that it works as expected.

basketballGame
  .freeThrow()
  .basket()
  .halfTime()
  .addFoul()
  .threePointer()
  .fullTime()
  ;

 
// Exercise 7d) Test your object by chaining all the method calls together in different combinations.

// When I change location of addFoul, the foul count changes as expected in the half time and full time messages, so I know that the method is working as expected. I have also tested that the score is updating as expected when I call the freeThrow, basket and threePointer methods in different combinations.


// All basketballGame freeThrow, basket, threePointer, addFoul entries in this script are CUMULATIVE to the respective halfTime and fullTime console.log messages
 
// The score and foul counts will increase for halfTime and fullTTime each time I call those methods. 



// Exercise 8 here is an object Sydney, which has properties name, population, state, founded and timezone.

const sydney = {
  name: 'Sydney',
  population: 5_121_000,
  state: 'NSW',
  founded: '26 January 1788',
  timezone: 'Australia/Sydney'
};

// Exercise 8a: Write a function that takes an object as an argument and uses a for…in loop to access and print to the console each of those object properties and their values.

// Create a function named printObjectProperties. It expects one input: an object (here it is called `city`).
function printObjectProperties(city) {

  // `for...in` goes through each property name (key) in the object.
  for (let key in city) {

    // Print the property name and its matching value. `city[key]` here means "get the value stored at this key".
    console.log(key + ": " + city[key]);
  }
}


// Exercise 8b: Create a new object for Tokyo with different properties as Sydney.

const tokyo = {
  name: 'Tokyo',
  population: 13_960_000,
  famousfor: 'Technology and sushi'
};


//Then call your function to print the properties of both Sydney and Tokyo to the console.

printObjectProperties(sydney);
printObjectProperties(tokyo);


// EXERCISE 9 STORING OBJECTS BY REFERENCE

// An array of team sports.
let teamSports = ['Hockey', 'Cricket', 'Volleyball'];

// A string value (primitive type).
let dog1 = 'Brian'; 

// An object with two properties.
let cat1 = { name: 'Harry', breed: 'Bengal' };

// Exercise 9a: Create a new moreSports variable equal to teamSports. Add some brand new sport values to it (using push and unshift)

// `moreSports` does not create a new array. It just points to the SAME array in memory as `teamSports`.
// let moreSports = teamSports; 

let moreSports = [...teamSports];

// Add soccer to the end of the shared array.
moreSports.push('Soccer');

// Add tennis to the beginning of the shared array.
moreSports.unshift('Tennis');



// Exercise 9b: Create a new dog2 variable equal to dog1 string value. Give dog2 a new value. Does this change dog1?

// Copy the value of dog1 into dog2. Because strings are primitive values, this makes an independent copy.
let dog2 = dog1;

// Change only dog2. This does NOT change dog1!
dog2 = 'Charlie';
  


// Exercise 9c: Create a new cat2 variable equal to cat1 object and change its name property. Does this change cat1?

// cat2 variable now points to the same object as cat1 (i.e. a shared reference).
let cat2 = cat1;

// Change the `name` property on that shared object. This means cat1.name will also become 'Henry'.
cat2.name = 'Henry';

// Exercise 9d: Print the original teamSports, dog1 and cat1 variables to the console.
console.log('teamSports:', teamSports);
console.log('dog1:', dog1);
console.log('cat1:', cat1);

// Exercise 9e: Change the way the moreSports and cat2 variables are created to ensure the originals remain independent

// Create a new array that is a copy of teamSports (not a reference to it).

// I inserted let moreSports = [...teamSports]; into Exercise 9a above to create a new array that is a copy of teamSports instead of a reference to it.
// `...teamSports` shallow copies each item into a brand-new array. Now changes to moreSports will NOT change teamSports.


// Create a new object that is a copy of cat1 (not a reference to it).

// `...cat1` shallow copies each property into a brand-new object. This means changes to cat1copy will NOT change cat1.
let cat1copy = { ...cat1 };

cat1copy.name = 'Doraemon';
cat1copy.breed = 'Robot Cat';

// Exercise 9f: Print the cat1copy variable to the console.
console.log('cat1copy:', cat1copy);
