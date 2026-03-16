import { useState } from 'react'

// declare a function called AddNewCat which will render a form to add a new cat breed
// this component uses controlled components, meaning the form input values are controlled by React state
function AddNewCat({ onAddCat }) {

  // use the useState hook to create state variables for each form field
  // name: stores the value of the cat name input field
  const [name, setName] = useState('')

  // latinName: stores the value of the latin name input field
  const [latinName, setLatinName] = useState('')

  // imageUrl: stores the value of the image URL input field
  const [imageUrl, setImageUrl] = useState('')

  // declare a function called handleSubmit which will be called when the form is submitted
  const handleSubmit = (e) => {

    // prevent the default form submission behavior (which would refresh the page)
    e.preventDefault()

    // create a new cat object with the form values
    // we generate a unique ID by using Date.now() which returns the current timestamp in milliseconds
    const newCat = {
      id: Date.now(),
      name: name,
      latinName: latinName,
      imageUrl: imageUrl
    }

    // call the onAddCat function passed as a prop from the parent CatBreeds component
    // this will add the new cat to the cats array in the parent component
    onAddCat(newCat)

    // reset all form fields back to empty strings after submission
    setName('')
    setLatinName('')
    setImageUrl('')
  }

  return (
    <div>
      <h3>Add Your cat!</h3>

      {/* create a form element that will handle the submission of new cat data */}
      <form onSubmit={handleSubmit}>

        {/* create a label and input field for the cat name */}
        <div>
          <label htmlFor="name">Cat Name:</label>
          {/* the value attribute is controlled by the name state variable */}
          {/* the onChange attribute updates the name state whenever the user types */}
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* create a label and input field for the latin name */}
        <div>
          <label htmlFor="latinName">Latin Name:</label>
          {/* the value attribute is controlled by the latinName state variable */}
          {/* the onChange attribute updates the latinName state whenever the user types */}
          <input
            type="text"
            id="latinName"
            value={latinName}
            onChange={(e) => setLatinName(e.target.value)}
            required
          />
        </div>

        {/* create a label and input field for the image URL */}
        <div>
          <label htmlFor="imageUrl">Image URL:</label>
          {/* the value attribute is controlled by the imageUrl state variable */}
          {/* the onChange attribute updates the imageUrl state whenever the user types */}
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        {/* IMAGE & TEXT PREVIEW SECTION */}
        {/* this section will show a live preview of the cat image as the user types the URL */}
        {/* we use conditional rendering: the image only shows if imageUrl has a value (is not empty) */}
        
        {/* if imageUrl is not an empty string, render the preview section */}
        {/* && = this is a common pattern in React for conditional rendering: if the condition before && is true, the JSX after && will be rendered */}
        {imageUrl && (
          <div>
            <h4>Press SUBMIT button to add your cat to the list!</h4>
            {/* display the image using the current imageUrl state value */}
            {/* the image will update automatically as the user types because imageUrl is a controlled state variable */}
            <img
              src={imageUrl}
              alt="if you can read this, your image URL is broken. Please try another one."
              style={{ width: '400px', height: '400px', objectFit: 'cover' }}
            />
            {/* preview display the name and latinName below the image */}
            {/* these update live as the user types in the name and latinName fields */}
            {name && <p><strong>Name:</strong> {name}</p>}
            {latinName && <p><strong>Latin Name:</strong> {latinName}</p>}
          </div>
        )} {/* close the conditional rendering block */}

        {/* create a submit button that will trigger the handleSubmit function */}
        <button className="submit-cat-button" type="submit">SUBMIT</button>
      </form>
    </div>
  )
}

export default AddNewCat
