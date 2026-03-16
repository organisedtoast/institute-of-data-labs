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

        {/* create a submit button that will trigger the handleSubmit function */}
        <button type="submit">Add Cat</button>
      </form>
    </div>
  )
}

export default AddNewCat
