import { useState } from 'react'
import SingleCat from './SingleCat'


// use const to declare a constant variable that cannot be reassigned
// the name of this variable is "cats" and it will hold an array of cat breed objects
// each object represents a cat breed with its name, image URL and latin name
const cats = [
{ id: 1, name: 'Bengal', latinName: 'felis bengalensis', imageUrl: 'https://image.petmd.com/files/inline-images/bengal-cat.jpeg?VersionId=X0xkDftr_klFvUhQpLarkxvJBbnUAd01' },
{ id: 2, name: 'Siamese', latinName: 'felis catus siamensis', imageUrl: 'https://www.purina.co.uk/sites/default/files/styles/square_medium_440x440/public/2022-06/Siamese%201.jpg?h=c17eaee4&itok=BRsemy6v' },
{ id: 3, name: 'Scottish Fold', latinName: 'felis catus scottishfoldus', imageUrl: 'https://purebredkitties.com/cdn/shop/articles/scottish-fold-ear-health-caring-both-folded-standard-varieties.webp?v=1755326499' },
{ id: 4, name: 'Abyssinian', latinName: 'felis catus abyssinicus', imageUrl: 'https://cdn-ilecccn.nitrocdn.com/RanGABiTadbcbUtojmhXDdudFjKCdOMD/assets/images/optimized/rev-ebd86f6/www.worldsbestcatlitter.com/wp-content/uploads/2024/12/abyssinian-cats-blog_main-img.jpg' },
{ id: 5, name: 'Burmese', latinName: 'felis catus burmensis', imageUrl: 'https://www.burgesspetcare.com/wp-content/uploads/2025/12/All-about-Burmese-cats-.jpg' },
{ id: 6, name: 'Doraemon', latinName: 'automata felis caerulea', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROqjwu6euZ7Y-4S8n_ERj8p9DciT5oCoZvb4iKHqxp4vlzaRe3cEUXQ7-iEhowf3WGyyUuLhxaP4Nh_Hes-oaQ1LP_toPEGqhcZjNyYs63&s=10' },
]


// declare a function called CatBreeds which will render a list of cat breeds using the SingleCat component
function CatBreeds() {

  // use the useState hook to create a state variable called sortedCats and a function to update it called setSortedCats
  // initialize sortedCats with the value of cats, which is the array of cat breed objects
  const [sortedCats, setSortedCats] = useState(cats)

  // declare a function called sortByName which will sort the sortedCats array by the name property of each cat breed object
  const sortByName = () => {

    // create a new array called sorted by spreading the sortedCats array and sorting it using the sort method
    // the sort method takes a callback function that compares two cat breed objects a and b
    // it uses the localeCompare method to compare the name properties of a and b and return a negative, zero or positive value depending on their order
    const sorted = [...sortedCats].sort((a, b) => a.name.localeCompare(b.name))

    // call the setSortedCats function with the sorted array to update the state and trigger a re-render of the component
    // this will cause the list of cat breeds to be displayed in alphabetical order by their name
    setSortedCats(sorted)
  } // close the sortByName function


  // declare a function called deleteCat which will take an id as a parameter and filter the sortedCats array to remove the cat breed object with that id
  
  
  const deleteCat = (id) => {

    // call the setSortedCats function with a new array that is created by filtering the sortedCats array
    // the filter method takes a callback function that checks if the id property of each cat breed object is not equal to the id parameter passed to the deleteCat function
    // this will create a new array that only includes the cat breed objects that do not have the specified id, effectively deleting the cat breed with that id from the list
    setSortedCats(sortedCats.filter(cat => cat.id !== id))
  } // close the deleteCat function

  return (
    <div>
      <h2>Man Utd Fan Cam Cat Breeds</h2>
      <button onClick={sortByName}>Sort by Name</button>
      <ul>

        {/*use the map method to iterate over the sortedCats array and render a SingleCat component for each cat breed object */}
        {sortedCats.map((cat) => (

          // pass the cat breed object as a prop called cat to the SingleCat component and use the id property as the key for each component
          <SingleCat key={cat.id} cat={cat} 
          
          // also pass a function as a prop called onDelete that will call the deleteCat function with the id of the cat breed object 
          // when the delete button is clicked in the SingleCat component
          onDelete={() => deleteCat(cat.id)} />
        ))}
      </ul>
    </div>
  )
}

export default CatBreeds
