function RollDice() {
  // get the selected game type (6 or 10) from the dropdown menu id=footballGameType
  const gameType = document.getElementById("footballGameType").value;

  // change the multiplier from fixed 6 to dynamic value based on selection
  let dicenumber = Math.floor(Math.random() * gameType) + 1;

  // display the result in the dice element
  document.getElementById("diceresult").textContent = dicenumber;

  // calculate the red card result as the game type minus the dice result
  // this represents how many players were sent off (red cards)
  let redCardResult = gameType - dicenumber;

  // display the red card result in the redcardresult element
  document.getElementById("redcardresult").textContent = redCardResult;

}



/* This is what you would do if it was just a single dice with 6 sides:

function RollDice() {

//this will give us a random number between 1 and 6 for dicenumber
let dicenumber = Math.floor(Math.random() * 6) + 1;


//display the dicenumber result in the diceresult ID element
document.getElementById("diceresult").textContent = dicenumber; }


*/