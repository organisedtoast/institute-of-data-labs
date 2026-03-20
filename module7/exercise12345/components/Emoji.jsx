// import the useContext hook from the react library
// this allows us to access state from a context provider
import { useContext } from 'react'

// import EmojiContext which is a context provider that we will use to access
// the isHappy state and handleChangeMood function

// A context provider is a component that provides state to its children components
import EmojiContext from '../contexts/EmojiContext'

// declare a function called Emoji that will be our React component
function Emoji() {

  // use useContext to access the isHappy state and handleChangeMood function from the context provider EmojiContext 
  const { isHappy, handleChangeMood } = useContext(EmojiContext)

  // return some JSX that will render a heading, a paragraph with an emoji based on the isHappy state,
  // and a button that will toggle the isHappy state when clicked.
  return (
    <>
      <h2>Man Utd Fan Reaction to Bitcoin Price</h2>
      <p className = "emoji-text"  >{isHappy ? '😀' : '😡'}</p>
      <button onClick={handleChangeMood}>Toggle change in BTC price</button>
    </>
  )
}

export default Emoji
