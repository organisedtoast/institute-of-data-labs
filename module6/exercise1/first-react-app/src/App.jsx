import { useEffect, useRef, useState } from 'react'
import teslaLogo from './assets/tesla.svg'
import manutdLogo from '/manutd.svg'
import './App.css'
import Greeting from './components/Greeting'

// declare a new component called App that will be rendered to the DOM
function App() {
  // declare a new state variable called "count" and a function to update it called "setCount"
  // make the initial value of "count" 411887324 to represent the number of Man Utd fans who ALREADY approve our merger with Tesla
  const [count, setCount] = useState(411887324)
  const [isCelebrating, setIsCelebrating] = useState(false)
  const celebrationTimeoutRef = useRef(null)

  const handleApprovalClick = () => {
    setCount((currentCount) => currentCount + 1)

    // Restart animation on rapid repeat clicks.
    setIsCelebrating(false)
    requestAnimationFrame(() => {
      setIsCelebrating(true)
    })

    if (celebrationTimeoutRef.current) {
      clearTimeout(celebrationTimeoutRef.current)
    }

    celebrationTimeoutRef.current = setTimeout(() => {
      setIsCelebrating(false)
      celebrationTimeoutRef.current = null
    }, 5000)
  }

  useEffect(() => {
    return () => {
      if (celebrationTimeoutRef.current) {
        clearTimeout(celebrationTimeoutRef.current)
      }
    }
  }, [])


  // the return statement of the App component defines what will be rendered to the DOM when this component is used
  return (
    <>
      <div>
        <a href="https://www.manutd.com" target="_blank">
          <img src={manutdLogo} className="logo manutd" alt="Man Utd logo" />
        </a>
        <a href="https://www.tesla.com" target="_blank">
          <img src={teslaLogo} className="logo tesla" alt="Tesla logo" />
        </a>
      </div>
      <h1>Man Utd + Tesla</h1>
      <h3>Merging the world's leading football club with our era's predominant tech company</h3>
      
      {/* Greeting component with a name prop*/}
      {/* A name prop means that the Greeting component will display "Hello John" instead of the default "Hello Fan" */}
      <Greeting name="John" />
      
      

      {/* Greeting component with children */}
      {/* Children means that the Greeting component will display whatever is between the opening and closing tags of the component, instead of the default "Hello Fan" */}
      
      <Greeting>
      Please express your support for this corporate transaction by clicking on the green button below. 
      </Greeting>

      <div className="card">
        <button className={`yesButton ${isCelebrating ? 'yesButtonCelebrate' : ''}`} onClick={handleApprovalClick}>
          Fan approval count: {count.toLocaleString()}
          {/* {count.toLocaleString()} means that the number will be displayed with commas as thousands separators, e.g. 411,887,324 instead of 411887324 */}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test hot reloading of the app.
        </p>
      </div>
      <p className="read-the-docs">
        Click on the logos above to learn more about our groundbreaking combination
      </p>
    </>
  ) // end of return statement
} // end of App component

export default App
