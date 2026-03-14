import { useEffect, useRef, useState } from 'react'
import ComplexComment from './ComplexComment'

// this component represents a testimonial from a fan of Manchester United. 
// It includes a comment and a button to approve the testimonial, which increments the approval count and triggers a celebration animation. 
// The component also handles cleanup of the animation timeout when unmounted.

// declare a functional component named FanTestimonial
// this functional component uses React hooks to manage state and side effects

// useState is used to manage the approval count and the celebration state
// useRef is used to keep track of the timeout for the celebration animation
// useEffect is used to clean up the timeout when the component is unmounted


function FanTestimonial() {
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

  // here, we use the useEffect hook to return a cleanup function that clears the celebration timeout 
  // if it exists when the component is unmounted.

  // the empty dependency array ensures that this effect runs only once when the component is mounted
  // and cleaned up when it is unmounted.
  useEffect(() => {
    return () => {
      if (celebrationTimeoutRef.current) {
        clearTimeout(celebrationTimeoutRef.current)
      }
    }
  }, [])


  // here, we return the JSX that defines the structure of the component.
  return (
    <section>
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
          </button>
        </div>
      </div>
    </section>
  )
}

export default FanTestimonial
