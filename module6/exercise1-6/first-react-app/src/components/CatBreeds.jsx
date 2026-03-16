import { useState } from 'react'
import SingleCat from './SingleCat'
import AddNewCat from './AddNewCat'


// use const to declare a constant variable that cannot be reassigned
// the name of this variable is "cats" and it will hold an array of cat breed objects
// each object represents a cat breed with its name, image URL and latin name
const cats = [
{ id: 1, name: 'Doraemon', latinName: 'doraemonus mechanicus', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROqjwu6euZ7Y-4S8n_ERj8p9DciT5oCoZvb4iKHqxp4vlzaRe3cEUXQ7-iEhowf3WGyyUuLhxaP4Nh_Hes-oaQ1LP_toPEGqhcZjNyYs63&s=10' },
{ id: 2, name: 'Bengal', latinName: 'felis catus bengalensis', imageUrl: 'https://image.petmd.com/files/inline-images/bengal-cat.jpeg?VersionId=X0xkDftr_klFvUhQpLarkxvJBbnUAd01' },
{ id: 3, name: 'Siamese', latinName: 'felis catus siamensis', imageUrl: 'https://www.purina.co.uk/sites/default/files/styles/square_medium_440x440/public/2022-06/Siamese%201.jpg?h=c17eaee4&itok=BRsemy6v' },
{ id: 4, name: 'Scottish Fold', latinName: 'felis catus scottishfoldus', imageUrl: 'https://purebredkitties.com/cdn/shop/articles/scottish-fold-ear-health-caring-both-folded-standard-varieties.webp?v=1755326499' },
{ id: 5, name: 'Abyssinian', latinName: 'felis catus abyssinicus', imageUrl: 'https://cdn-ilecccn.nitrocdn.com/RanGABiTadbcbUtojmhXDdudFjKCdOMD/assets/images/optimized/rev-ebd86f6/www.worldsbestcatlitter.com/wp-content/uploads/2024/12/abyssinian-cats-blog_main-img.jpg' },
{ id: 6, name: 'Burmese', latinName: 'felis catus burmensis', imageUrl: 'https://www.burgesspetcare.com/wp-content/uploads/2025/12/All-about-Burmese-cats-.jpg' },

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


    // VIEW BY ASCENDING ALPHABETICAL ORDER
    // call the setSortedCats function with the sorted array to update the state and trigger a re-render of the component
    // this will cause the list of cat breeds to be displayed in alphabetical order by their name
    setSortedCats(sorted)
  } // close the sortByName function


  // REVERSE THE VIEW ORDER
  // declare a function called reverseSort which will reverse the sortedCats array
  const reverseSort = () => {
    const reversed = [...sortedCats].reverse()
    setSortedCats(reversed)
  } // close the reverseSort function


  // RESET VIEW TO ORIGINAL ORDER
  // declare a function called resetSort which will reset the sortedCats array back to the original cats array
  const resetSort = () => {
    setSortedCats(cats)
  } // close the resetSort function

  // REAL CATS ONLY FILTER
  // declare a function called filterRealCats which will filter the sortedCats array to show only cats with "felis" in their latinName
  const filterRealCats = () => {
    const realCats = sortedCats.filter(cat => cat.latinName.includes('felis'))
    setSortedCats(realCats)
  } // close the filterRealCats function

  // DELETE CAT ENTRY
  // declare a function called deleteCat which will take an id as a parameter and filter the sortedCats array to remove the cat breed object with that id
  // this function will be called when the delete button is clicked in the SingleCat component,
  // and it will update the state to reflect the deletion of the cat breed from the list
  const deleteCat = (id) => {

    // call the setSortedCats function with a new array that is created by filtering the sortedCats array
    // the filter method takes a callback function that checks if the id property of each cat breed object is not equal to the id parameter passed to the deleteCat function
    // this will create a new array that only includes the cat breed objects that do not have the specified id, effectively deleting the cat breed with that id from the list
    setSortedCats(sortedCats.filter(cat => cat.id !== id))
  } // close the deleteCat function

  // ADD NEW CAT ENTRY
  // declare a function called addCat which will take a newCat object as a parameter and add it to both the cats array and sortedCats state
  // this function will be called when the AddNewCat form is submitted
  const addCat = (newCat) => {

    // add the new cat to the beginning of the cats array using unshift
    // unshift ensures the new cat appears at the top of the original cats array
    // push would have added the new cat to the end of the array
    cats.unshift(newCat)

    // call the setSortedCats function with a new array that includes the new cat at the top
    // we create a new array with newCat first, then spread the existing sortedCats after it
    setSortedCats([newCat, ...sortedCats])
  } // close the addCat function

  return (
    <div>
      <h2>Man Utd Fan Cam Cat Breeds</h2>

      {/* render the AddNewCat component and pass the addCat function as a prop called onAddCat */}
      {/* when the form is submitted, the addCat function will be called with the new cat object */}
      <AddNewCat onAddCat={addCat} />

      <button onClick={sortByName}>Sort by Name</button>
      <button onClick={reverseSort}>Reverse Sort</button>
      <button onClick={resetSort}>Reset</button>
      <button onClick={filterRealCats}>Real Cats Only</button>
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
