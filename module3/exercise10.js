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

let john = new Person("James", 22);

// Exercise 10b: Create a second person using different name and age values and store it in a separate variable

let jane = new Person("Jane", 8);

// Exercise 10c: Print out the properties of each person object to the console

printObjectProperties(john);

printObjectProperties(jane);

// Exercise 10d: Replace the constructor function with a class. 

// A class is another way to create object templates in JavaScript.

// `PersonClass` is the chosen template name.
class PersonClass {
  
  // `constructor` runs automatically when you create an object with `new PersonClass('Name', 20)`
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
