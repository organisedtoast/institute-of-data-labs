// NB: this file relates solely to Exercise 3.

// import createContext and useState from React
// createContext is a basic React hook. It allows us to create a context provider which can be used to share state across components without prop drilling

// context is a global state that can be accessed by any component that is a child of the context provider. 
// It is useful for sharing state that is needed by many components, such as user authentication or theme settings.

// useState is the most basic React hook. It allows us to add state to functional components
import { createContext, useState } from 'react';

// use const to declare a variable called EmojiContext
// EmojiContext will ultimately be our context provider

// Assign EmojiContext to the result of calling createContext
// with an initial value of an object with two properties: isHappy and handleChangeMood.
// isHappy is a boolean that will represent whether the user is happy or not.
// handleChangeMood is a function that will allow us to toggle the value of isHappy.
// The initial value of the context is not important in this case, as we will be providing the actual values in the EmojiProvider component.
// () => {} is an empty function that does nothing. It is used here as a placeholder for the actual function that will be provided in the EmojiProvider component.
const EmojiContext = createContext({ isHappy: true, handleChangeMood: () => {} });

// Declare a function called EmojiProvider that will be our context provider component.
// This component will wrap around any components that need access to the isHappy state and handleChangeMood function.
export function EmojiProvider({ children }) {

// use useState to create a piece of state called isHappy and a function to update it called setIsHappy.
  const [isHappy, setIsHappy] = useState(true);

// declare a function called handleChangeMood that will toggle the value of isHappy when called.
  const handleChangeMood = () => {

    // use the setIsHappy function to toggle the value of isHappy. 
    // We can use the current value of isHappy to determine the new value.
    setIsHappy((currentMood) => !currentMood);
  };


  // Now, return some JSX that will render the EmojiContext.Provider component. 
  // This component will provide the isHappy state and handleChangeMood function to any child components that need it.
  return (
    <EmojiContext.Provider value={{ isHappy, handleChangeMood }}>
      {children}
    </EmojiContext.Provider>
  );
}


// Export EmojiContext as the default export of this module.
export default EmojiContext;
