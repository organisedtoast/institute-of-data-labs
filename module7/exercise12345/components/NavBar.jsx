// EXERCISE 4: include a NavBar component which will allow us to navigate between the Home, Bitcoin Rates and Login pages


// import the NavLink component from react-router-dom to create links in the NavBar
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="NavBar">
    <ul className="menu">
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/bitcoin">Bitcoin Rates</NavLink></li>
    <li><NavLink to="/login">Login</NavLink></li>
    </ul>
    </nav>
  )
}

