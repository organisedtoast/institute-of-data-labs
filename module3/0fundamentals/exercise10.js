// EXERCISE 10 CONSTRUCTOR FUNCTIONS

// A constructor function is a template for creating new objects.

// By convention, constructor function names should start with a capital letter. 

// Here, the Person constructor function takes two parameters, name and age, which are used to set the properties of the new object being created.
function Person(name, age) {

  // `this` refers to the new object being created with `new Person(...)`. Set the new object's `name` property.
  this.name = name;

  // Set the new object's `age` property.
  this.age = age;

  // Give every Person object a default `human` property.
  this.human = true;
}


// Exercise 10a: Create a new person using the constructor function and store it in a variable

// Create a new Person object and store it in `james`.
let james = new Person("James", 22);

// Exercise 10b: Create a second person using different name and age values and store it in a separate variable

// Create another Person object with different values.
let jane = new Person("Jane the Baby", 3);

// Exercise 10c: Print out the properties of each person object to the console

// This function prints every property and value from any object passed in.
function printObjectProperties(obj) {

  // `for...in` loops through each property name (key) in the object.
  for (let key in obj) {

    // Show "property: value" in the console.
    console.log(key + ": " + obj[key]);
  }
}

// Print all properties of the james object.
printObjectProperties(james);

// Print all properties of the jane object.
printObjectProperties(jane);



// Exercise 10d: Replace the constructor function with a class. 

// A class is the most modern way to create object templates. blueprints in JavaScript.

// “I am defining a type of object called PersonClass.”
class PersonClass {


//`constructor` is a special JS function. It runs automatically when you create a new object with new e.g. `new PersonClass('Name', 20)`
  constructor(name, age) {
  
    // Save the provided name on the new object.
    this.name = name;
  
    // Save the provided age on the new object.
    this.age = age;
  
    // Add a default property that every created object gets.
    this.human = true;
  }
}


// Exercise 10d: Use the PersonClass to create a third person using different name and age values.

let person3 = new PersonClass("Alice", 30);

printObjectProperties(person3);


// Exercise 10e: Add a canDrive method to both the constructor function and the class that returns true if the person is old enough to drive.

// Add a canDrive method to the Person constructor function.

// `prototype` is where shared methods are stored. Any object created with `new Person(...)` can use this method.
Person.prototype.canDrive = function() {
  
  // `this` means "the current person object".
  // Return `true` if age is 16 or more, otherwise return `false`.
  return this.age >= 16;
};



// Add a canDrive method to the PersonClass.
// Same idea for objects created with `new PersonClass(...)`.

PersonClass.prototype.canDrive = function() {
  // Check the current object's age.
  return this.age >= 16;
};

// Test the canDrive method on each person object.
// Call canDrive() on james and print the result.
console.log("James can drive:", james.canDrive());
// Call canDrive() on jane and print the result.
console.log("Jane can drive:", jane.canDrive());

// Call canDrive() on alice/person3 and print the result.
console.log("Alice can drive:", person3.canDrive());
