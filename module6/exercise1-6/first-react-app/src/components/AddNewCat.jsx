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
    <div className="add-cat-form">
      <h3>Add your cat!</h3>

      <form onSubmit={handleSubmit}>

        <div className="form-row">
          <label htmlFor="name">Cat Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter cat name"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="latinName">Latin Name:</label>
          <input
            type="text"
            id="latinName"
            value={latinName}
            onChange={(e) => setLatinName(e.target.value)}
            placeholder="Enter latin name"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            required
          />
        </div>


{/* PREVIEW ADD NEW CAT SECTION */}
        {imageUrl && (
          <div className="cat-preview-section">
            <h4>Press SUBMIT button to add your cat to the list!</h4>
            <img
              className="cat-preview-image"
              src={imageUrl}
              alt="if you can read this, your image URL is broken. Please try another one."
            />
            <div className="cat-preview-info">
              {name && <p><strong>Name:</strong> {name}</p>}
              {latinName && <p><strong>Latin Name:</strong> {latinName}</p>}
            </div>
          </div>
        )}

        <button className="submit-cat-button" type="submit">SUBMIT</button>
      </form>
    </div>
  )
}

export default AddNewCat
