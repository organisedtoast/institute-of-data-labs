import { useEffect, useRef, useState } from 'react'
import teslaLogo from './assets/tesla.svg'
import manutdLogo from '/manutd.svg'
import './App.css'
import Greeting from './components/Greeting'
import CatBreeds from './components/CatBreeds'
import Emoji from './components/Emoji'
import FanTestimonial from './components/FanTestimonial'
import TitleBlock from './components/TitleBlock'



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

      {/* TitleBlock component */}
      <TitleBlock manutdLogo={manutdLogo} teslaLogo={teslaLogo} />

      
      {/* Greeting component with a name prop*/}
      {/* A name prop means that the Greeting component will display "Hello John" instead of the default "Hello Fan" */}
      <Greeting name="John" />
      
      

      {/* Greeting component with children */}
      {/* Children means that the Greeting component will display whatever is between the opening and closing tags of the component, instead of the default "Hello Fan" */}

<Greeting>
      Please express your support for this corporate transaction by clicking on the green Fan Approval button below your testimonial entry.
      </Greeting>


<div className="testimonial">
<FanTestimonial

// you can get rid of these props later and define them inside the FanTestimonial component, as long as the names are the same
// my handleApprovalClick is currently defined as onApprovalClick, so inside FanTestimonial I have a function called onApprovalCLick atm, when it is actually handleApprovalClick
  count={count}
  isCelebrating={isCelebrating}
  onApprovalClick={handleApprovalClick}
/>
</div>

<div className="catbreeds">
<CatBreeds />
</div>


<div className="emoji">
<Emoji />
</div>


    </>



  ) // end of return statement
} // end of App component

export default App
