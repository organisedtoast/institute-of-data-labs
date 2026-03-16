function SingleCat(props) {
  return (
    <li>
      
      {/* this is where we display the cat image using the props passed from the CatBreeds component */}
      <img src={props.cat.imageUrl} alt={props.cat.name} style={{ width: '400px', height: '400px', objectFit: 'cover' }} />

      {/* add a delete button that will call the onDelete function passed as a prop when clicked */}
      <button onClick={props.onDelete}>Delete</button>

      {/* this is where we display the name and latin name of the cat breed using the props passed from the CatBreeds component */}
      <p>{props.cat.name} - {props.cat.latinName}</p>


    </li>
  )
}

export default SingleCat
