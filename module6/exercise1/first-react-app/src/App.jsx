import { useEffect, useRef, useState } from 'react'
import teslaLogo from './assets/tesla.svg'
import manutdLogo from '/manutd.svg'
import './App.css'
import Greeting from './components/Greeting'
import ComplexComment from './components/ComplexComment'
import CatBreeds from './components/CatBreeds'
import Emoji from './components/Emoji'

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

      {/* TitleSection component*/}
      <div className = "title" >
        <a href="https://www.manutd.com" target="_blank">
          <img src={manutdLogo} className="logo manutd" alt="Man Utd logo" />
        </a>
        <a href="https://www.tesla.com" target="_blank">
          <img src={teslaLogo} className="logo tesla" alt="Tesla logo" />
        </a>
      
      <h1>Man Utd + Tesla</h1>
      <h3>Combining the world's most followed football club with the dominant tech company of our generation</h3>
      </div>

      
      {/* Greeting component with a name prop*/}
      {/* A name prop means that the Greeting component will display "Hello John" instead of the default "Hello Fan" */}
      <Greeting name="John" />
      
      

      {/* Greeting component with children */}
      {/* Children means that the Greeting component will display whatever is between the opening and closing tags of the component, instead of the default "Hello Fan" */}

      <Greeting>
      Please express your support for this corporate transaction by clicking on the green Fan Approval button below your testimonial entry.
      </Greeting>


<div className="testimonial">
<h2>Fan Testimonial</h2>

      <ComplexComment
        author={{ name: 'John Burke', avatarUrl: 'https://pbs.twimg.com/profile_images/1956662011053449217/D0VfawSp_400x400.jpg' }}
        text="John has been an avid follower of Man Utd for 30 years. His favourite player is Ole Gunnar Solskjaer. He is very excited about the upcoming merger with Tesla and believes it will usher in an era of sporting and commercial success to the club."
        date={new Date()}
      />

<div className="approvalSection">
<p>IMPORTANT: By clicking on the green button, you agree to submit the above testimonial for public redistribution.</p>
      <div className="card">
        <button className={`yesButton ${isCelebrating ? 'yesButtonCelebrate' : ''}`} onClick={handleApprovalClick}>
          Fan approval count: {count.toLocaleString()}
          {/* {count.toLocaleString()} means that the number will be displayed with commas as thousands separators, e.g. 411,887,324 instead of 411887324 */}
        </button>
      </div>

      </div>
</div>

<div>
<CatBreeds />
</div>


<div>
<Emoji />
</div>


    </>



  ) // end of return statement
} // end of App component

export default App
