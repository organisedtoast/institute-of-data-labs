//specify the 4 functions here

function add(a, b) {}

function subtract(a, b) {}

function multiple(a, b) {}

function divide(a, b) {}


//write 3 unit tests for each of the 4 functions

if (add(2, 3) !== 5) {
    console.error('1st test failed: add(2, 3) should return 5');
}

if (subtract(5, 3) !== 2) {
    console.error('1st test failed: subtract(5, 3) should return 2');
}

if (multiple(2, 3) !== 6) {
    console.error('1st test failed: multiple(2, 3) should return 6');
}

if (divide(6, 2) !== 3) {
    console.error('1st divide test failed: divide(6, 2) should return 3');
}

if (add(8, 4) == 12) {
    console.log('2nd add test succeeded');
}

if (subtract(8, 4) == 4) {
    console.log('2nd subtract test succeeded');
}

if (multiple(8, 4) == 32) {
    console.log('2nd multiple test succeeded');
}

if (divide(8, 4) == 2) {
    console.log('2nd divide test succeeded');
}

if (add(15, -3) == 12) {
    console.log('3rd add test succeeded');
}

if (subtract(15, -3) == 18) {
    console.log('3rd test succeeded');
}

if (multiple(15, -3) == -45) {
    console.log('3rd multiple test succeeded');
}

if (divide(15, -3) == -5) {
    console.log('3rd divide test succeeded');
}

if (add(1, 0.5) == 1.5) {
    console.log('4th add test succeeded');
}

if (subtract(1, 0.5) == 0.5) {
    console.log('4th subtract test succeeded');
}

if (multiple(1, 0.5) == 0.5) {
    console.log('4th multiple test succeeded');
}

if (divide(1, 0.5) == 2) {
    console.log('4th divide test succeeded');

}


//define each of the 4 functions

function add(a, b) {
return a + b
}

function subtract(a, b) {
return a - b
}

function multiple(a, b) {
return a * b
}

function divide(a, b) {
return a / b
}
