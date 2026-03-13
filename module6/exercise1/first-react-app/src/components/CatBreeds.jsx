import SingleCat from './SingleCat'


// use const to declare a constant variable that cannot be reassigned
// the name of this variable is "cats" and it will hold an array of cat breed objects
// each object represents a cat breed with its name, image URL and latin name
const cats = [
{ id: 1, name: 'Bengal', latinName: 'Felis bengalensis', imageUrl: 'https://image.petmd.com/files/inline-images/bengal-cat.jpeg?VersionId=X0xkDftr_klFvUhQpLarkxvJBbnUAd01' },
{ id: 2, name: 'Siamese', latinName: 'Felis catus siamensis', imageUrl: 'https://www.purina.co.uk/sites/default/files/styles/square_medium_440x440/public/2022-06/Siamese%201.jpg?h=c17eaee4&itok=BRsemy6v' },
{ id: 3, name: 'Scottish Fold', latinName: 'Felis catus scottishfoldus', imageUrl: 'https://purebredkitties.com/cdn/shop/articles/scottish-fold-ear-health-caring-both-folded-standard-varieties.webp?v=1755326499' },
{ id: 4, name: 'Abyssinian', latinName: 'Felis catus abyssinicus', imageUrl: 'https://cdn-ilecccn.nitrocdn.com/RanGABiTadbcbUtojmhXDdudFjKCdOMD/assets/images/optimized/rev-ebd86f6/www.worldsbestcatlitter.com/wp-content/uploads/2024/12/abyssinian-cats-blog_main-img.jpg' },
{ id: 5, name: 'Burmese', latinName: 'Felis catus burmensis', imageUrl: 'https://www.burgesspetcare.com/wp-content/uploads/2025/12/All-about-Burmese-cats-.jpg' },
{ id: 6, name: 'Maine Coon', latinName: 'Felis catus mainecoon', imageUrl: 'https://www.guildinsurance.com.au/images/librariesprovider3/breed-images/cat_maine-coon.jpg?sfvrsn=88f2610b_2' },
]


// declare a function called CatBreeds which will render a list of cat breeds using the SingleCat component
function CatBreeds() {
  return (
    <div>
      <h2>Man Utd Fan Cam Cat Breeds</h2>
      <ul>
        
        {/* map over the cats array and render a SingleCat component for each cat */}
        {cats.map((cat) => (
          
          <SingleCat key={cat.id} cat={cat} />
        ))}
      </ul>
    </div>
  )
}

export default CatBreeds
