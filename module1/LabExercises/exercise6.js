// objects in JavaScript contain keys (or properties) with corresponding values

const bfernandes = {
    firstName: "Bruno", // keys of a JavaScript object can be quoted or unquoted if they are valid identifiers
    lastName: "Fernandes",
    age: 31,
    xfollowers: 4500000
}

const ppogba = {
    firstName: "Paul",
    lastName: "Pogba",
    age: 32,
    xfollowers: 9900000
}

const hmaguire = {
    firstName: "Harry",
    lastName: "Maguire",
    age: 32,
    xfollowers: 2400000
}

const lshaw = {
    firstName: "Luke",
    lastName: "Shaw",
    age: 30,
    xfollowers: 2500000
}

console.log("To get firstName for ppogba, hmaguire and lshaw objects, we use dot notation to access the firstName key for each object. The first names are thus: ");

console.log(ppogba.firstName); // Paul
console.log(hmaguire.firstName); // Harry
console.log(lshaw.firstName); // Luke


console.log("We can also store objects in an array. In this example, the manutdsquad array contains bfernandes, ppogba, hmaguire, lshaw objects.");
const manutdsquad = [bfernandes, ppogba, hmaguire, lshaw]

console.log("All objects in manutdsquad array:");
console.log(manutdsquad)

// for (let i = 0; i < manutdsquad.length; i++) {
//   console.log(manutdsquad[i]);
// this is a loop that will print each object in the manutdsquad array, but we can also print specific keys for each object in the array using dot notation. For example, to print the firstName key for the first object in the manutdsquad array, we can use: ");}


console.log("The first element of the manutdsquad array is the bfernandes object, which contains Bruno's stats. bfernandes's first name is: ");
console.log(manutdsquad[0].firstName);


console.log("To get stats for Harry Maguire, print the hmaguire object. Harry's stats are:");
console.log(hmaguire);  // { firstName: 'Harry', lastName: 'Maguire', age: 32, xfollowers: 2400000 }

console.log("Harry Maguire's X followers went down from 2.5m to 13 after a string of embarrassing gaffes for Man Utd.");

// To update for this fact, insert the following line of code to update the "followers" key for the "hmaguire" object:
hmaguire.xfollowers = 13

console.log("Now we want to print the whole updated stats for Harry Maguire, we can do that by printing the hmaguire object again. Updated stats for Harry Maguire are: ");

console.log(hmaguire); // { firstName: 'Harry', lastName: 'Maguire', age: 32, xfollowers: 13 }

