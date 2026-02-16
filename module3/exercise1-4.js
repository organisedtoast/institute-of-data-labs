// Exercise 1: What are the results of these expressions?

console.log ("Exercise 1 : What are the results of these expressions?")

console.log ("" + 1 + 0)
//10 inplicit conversion into string, the plus does not work as addition but as concatenation

console.log ("" - 1 + 0)
//-1 implicit conversion into number because of the minus operator

console.log (true + false)
//1 boolean true is converted to 1 and false is converted to 0

console.log (!true)
//false logical ! not operator converts true to false


console.log (6 / "3")
//2 the string "3" is converted to number 3 because of the / implicit conversion

console.log ("2" * "3")
//6 both strings are converted to numbers because of the * implicit conversion

console.log (4 + 5 + "px")
//9px the first two numbers are added together and then converted to string because of the + operator with a string operand

console.log ("$" + 4 + 5)
//$45 the existing string is "$" . It implicitly converts the 4 into string which is then concatenated with $. The number 5 is converted to string and concatenated with the result

console.log ("4" - 2)
//2 the string "4" is converted to number 4 because of the - implicit conversion

console.log ("4px" - 2)
//NaN the string "4px" cannot be converted to a number because the non-numeric characters "px" are neither a functionality nor a number, so the result is NaN.

console.log (" -9 " + 5)
//-9 5 the string " -9 " results in an implicit conversion of 5 into a string, hence 5 is concatenated onto " -9 " resulting in " -9 5".

console.log (" -9 " - 5)
//-14 as the - results in an implicit conversion of -9 into a number. -9 - 5 equals -14.

console.log (null + 1)
//1 as null is converted to 0 in numeric contexts, so the result is 0 + 1 which equals 1.

console.log (undefined + 1)
//NaN as undefined is not a number and cannot be converted to a number, so the result is NaN.

console.log (undefined == null)
//true as both undefined and null are EQUIVALENT, even though they are of different types.

console.log (undefined === null)
//false as they are of different types, undefined is of type undefined and null is of type object, therefore not SRICTLY EQUAL.

console.log (" \t \n" - 2)
//-2 the string " \t \n" is converted to 0 because it only contains whitespace characters and is therefore an empty string, and then 0 - 2 equals -2. 


console.log ("t n z" - 2)
//NaN

console.log ("\z" - 2)
//NaN /z it not a functionality nor a number, which means it is a string that cannot be converted to a number, so the result is NaN.

console.log ("\z" + 2)
//\z2 the + results in an implicit conversion of /z into a string, hence 2 is concatenated onto "\z" resulting in "\z2".

console.log (" -9 \t" - 5)
//-14 the string " -9 \t" results in an implicit conversion of "-9 /t" into the number -9. -9 - 5 equals -14.



// Exercise 2: Which of the below are not giving the right answer? Why are they not correct? How can we fix them?

console.log ("Exercise 2: Which of the below are not giving the right answer? Why are they not correct? How can we fix them?")

let three = "3"
let four = "4"
let thirty = "30"

let addition = three + four
let subtraction = three - four
let multiplication = three * four
let division = three / four

let lessThan1 = three < four 
let lessThan2 = thirty < four


console.log (addition)
console.log (subtraction)
console.log (multiplication)
console.log (division)

//The addition is not giving the right answer because it is concatenating the two strings "3" and "4" instead of adding them as numbers. 

// To fix this, we explicitly convert the strings to numbers before performing the addition, by using the Number() function.

let additionFixed = Number(three) + Number(four)
console.log (additionFixed)

//Meanwhile, the subtraction, multiplication and division give the right answers because the - * / operators implicitly convert the strings to numbers.


// Exercise 3: Which of the following conole.log messages will be printed to the console? Why?

console.log ("Exercise 3: Which of the following console.log messages will be printed to the console? Why?")

if (0) console.log('0 is false')//0 is boolean falsy, so the console.log message will not be printed to the console.   

if ("0") console.log('"0" is true')//the string "0" is boolean truthy, so the console.log message will be printed to the console.

if (null) console.log('null is not true')//null is boolean falsy, so the console.log message will not be printed to the console.

if (-1) console.log('negative is true')//-1 is boolean truthy, so the console.log message will be printed to the console.

if (1) console.log('positive is true')//1 is boolean truthy, so the console.log message will be printed to the console.

//Numbers can be falsy.

//Strings are falsy ONLY if empty.


// Exercise 4: Rewrite the following if using the ternary/ conditional operator '?'. Test it with different values for a and b. What does the ‘+=’ do?

console.log ("Exercise 4: Rewrite the following if using the ternary/ conditional operator '?'. Test it with different values for a and b. What does the ‘+=’ do?")

let a = 9, b = 3; let result = `${a} + ${b} is `; 
if (a + b < 10) { result += 'less than 10'; } 
else { result += 'greater than 10'; }

// The += operator is a shorthand for concatenating strings. It appends the right-hand side value to the left-hand side value.
// In the above cases, += appends 'less than 10' or 'greater than 10' to the result string.  

// The ternary operator version of the above if statement would be:
let resultTernary = `${a} + ${b} is ${a + b < 10 ? 'less than 10' : 'greater than 10'}`;

console.log (result)
console.log (resultTernary)

//The ternary operator is a shorter way of writing an if/else. It looks like this:

// condition ? value_if_true : value_if_false;

// If you have more than one condition, you can chain ternary operators together like this:

// condition1 ? value_if_condition1_true : condition2 ? value_if_condition2_true : value_if_all_conditions_false;

// However this can get a bit messy. If first statement is a < b , is a is not less than b, it would be false. Then you in false outcome you have another condition

// b > c. So your false can become a conditional statement. Following that on screen, it can get messy.

// if else is more formal so can be easier to read. Ternary is more concise but can be harder to read if you have multiple conditions.





