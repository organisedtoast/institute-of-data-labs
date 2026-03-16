import teslaLogo from './assets/tesla.svg'
import manutdLogo from '/manutd.svg'
import './App.css'
import Greeting from './components/Greeting'
import CatBreeds from './components/CatBreeds'
import Emoji from './components/Emoji'
import FanTestimonial from './components/FanTestimonial'
import TitleBlock from './components/TitleBlock'
import AddNewCat from './components/AddNewCat'



// declare a new component called App that will be rendered to the DOM
function App() {

  // the return statement of the App component defines what will be rendered to the DOM when this component is used
  return (
    <>

      {/* TitleBlock component */}
      <TitleBlock manutdLogo={manutdLogo} teslaLogo={teslaLogo} />


      {/* Greeting component with a name prop*/}
      {/* A name prop means that the Greeting component will display "Hello John" instead of the default "Hello Fan" */}
      <Greeting name="John" />



      {/* Greeting component with children */}
      {/* Children means that the Greeting component will display whatever is between the opening and closing tags of the component, instead of the default "Hello Fan" */}

<Greeting>
      Please express your support for this corporate transaction by clicking on the green Fan Approval button below your testimonial entry.
      </Greeting>


<div className="testimonial">
<FanTestimonial />
</div>

<div className="catbreeds">
<CatBreeds />
</div>


<div className="emoji">
<Emoji />
</div>


    </>



  ) // end of return statement
} // end of App component

export default App
