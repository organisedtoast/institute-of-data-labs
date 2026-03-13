function SingleCat(props) {
  return (
    <li>
      <img src={props.cat.imageUrl} alt={props.cat.name} style={{ width: '400px', height: '400px', objectFit: 'cover' }} />
      <p>{props.cat.name} - {props.cat.latinName}</p>
    </li>
  )
}

export default SingleCat
