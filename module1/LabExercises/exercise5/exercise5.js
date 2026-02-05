// Generate array of top 5 EPL clubs in your humble opinion
let eplclubs = ['Man City', 'Arsenal', 'Man Utd', 'Tottenham','Liverpool'];

// Print all elements in the array you just created
console.log(eplclubs[0]); // 'Man City'
console.log(eplclubs[1]); // 'Arsenal'
console.log(eplclubs[2]); // 'Man Utd'
console.log(eplclubs[3]); // 'Tottenham'
console.log(eplclubs[4]); // 'Liverpool'

// Replace the value of the element at positions 1 and 4 (index 0 and 3), these are clubs that should be relegated in your humble opinion and replaced with new ones
eplclubs [0] = 'Aston Villa';
eplclubs [3] = 'Newcastle';

// Print the elements in positions 1 and 4, these are the new clubs Aston Villa, Newcastle replacing the relegated ones
console.log(eplclubs[0]); // 'Aston Villa'
console.log(eplclubs[3]); // 'Newcastle'

// Add a new element to the beginning of the array
eplclubs.unshift('Chelsea');

// Print the first element in the array
console.log(eplclubs[0]); // 'Chelsea'

// Remove the last element from the array, Liverpool
eplclubs.pop(); // This will remove 'Liverpool'

// Print the last element in the array
console.log(eplclubs[eplclubs.length - 1]); // Should now be 'Newcastle'

// Print all elements in the array
console.log(eplclubs[0]); // 'Chelsea'
console.log(eplclubs[1]); // 'Aston Villa'
console.log(eplclubs[2]); // 'Arsenal'
console.log(eplclubs[3]); // 'Man Utd'
console.log(eplclubs[4]); // 'Newcastle'

