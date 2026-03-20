// import the in-built useState hook from the react library
// this allows us to use state in our functional component, which is a way to store and manage data that can change over time and affect what is rendered
import { useState } from 'react'

// declare a function called Emoji that will be our React component
function Emoji() {

  // use const to declare a new state variable called "isHappy" and a function to update it called "setIsHappy"
  const [isHappy, setIsHappy] = useState(true)

  // use const to create a function called "handleChangeMood" that runs when the button is clicked and switches the emoji mood
  const handleChangeMood = () => {
    
    // use the setIsHappy function to update the isHappy state variable to the opposite of its current value
    // i.e. if it's currently true, it will be set to false, and vice versa
    setIsHappy((currentMood) => !currentMood)
  }

  return (
    <>
      <h2>Man Utd Fan Reaction to Bitcoin Price</h2>
      <p className = "emoji-text"  >{isHappy ? '😀' : '😡'}</p>
      <button onClick={handleChangeMood}>Toggle change in BTC price</button>
    </>
  )
}

export default Emoji
