// declare a component called "ComplexComment" that takes in props and renders a comment with the author, text, and date
import UserInfo from './UserInfo'
import FormattedDate from './FormattedDate'

// the ComplexComment component includes the UserInfo and FormattedDate subcomponents.
function ComplexComment(props) {
  return (
    <div className="Comment componentBox">
    <h2>Fan Testimonial</h2>
    <UserInfo author={props.author} />
    <p className="Comment-text">{props.text}</p>
    <FormattedDate date={props.date} />
    </div>
  );
}

export default ComplexComment;