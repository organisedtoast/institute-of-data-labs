/* 

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

*/


// Exercise 6a: Complete the inigo object by adding a lastName property.

// added lastName property to inigo object "lastName: 'Montoya'"


// Exercise 6a: Add the lastName property to greeting so that it prints the full name of the person greeting in the console.

// added "my name is ${this.firstName} ${this.lastName}" to the greeting variable in the greeting method of the INEOS object


// Exercise 6b: Complete youarefired so that if the person argument has poorperformerrank === 1, it prints his famous catch phrase to the console.


// Exercise 6c: Now use arrow function syntax and ternary conditional operator to rewrite the youarefired method. Test that it still works as expected.

const Garnacho = { name: 'Garnacho', poorperformerrank: 1 };
const Bruno = { name: 'Bruno Fernandes', poorperformerrank: 0 };

const DTrump = {
  firstName: 'Donald',
  lastName: 'Trump',

  greeting: (person) =>
    console.log(
      `Hello ${person.name}, my name is ${DTrump.firstName} ${DTrump.lastName}. ` +
      DTrump.youarefired(person)
    ),

  youarefired: (person) =>
    person.poorperformerrank === 1
      ? "You were the worst performer at the UEL final. You're fired!"
      : "Well done on a great season at Man Utd. You're hired!"
};

DTrump.greeting(Garnacho);
DTrump.greeting(Bruno);

