import ComplexComment from './ComplexComment'

function FanTestimonial({ count, isCelebrating, onApprovalClick }) {
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
          <button className={`yesButton ${isCelebrating ? 'yesButtonCelebrate' : ''}`} onClick={onApprovalClick}>
            Fan approval count: {count.toLocaleString()}
          </button>
        </div>
      </div>
    </section>
  )
}

export default FanTestimonial
