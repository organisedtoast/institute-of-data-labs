// AppRoutes component - manages all routing for the application
// This file centralizes all route definitions in one place
// Import Routes and Route from react-router-dom for setting up routing
import { Routes, Route } from 'react-router-dom'

// Import page components that will be rendered for each route
// These components are located in the pages folder
import Home from '../pages/Home'
import Stocks from '../pages/Stocks'

// AppRoutes is a separate component that holds all route definitions
// This keeps the routing logic organized and separate from the main App component
export default function AppRoutes() {
  return (
    // Routes is a container that holds all Route components
    <Routes>
      {/* 
        Each Route defines a mapping between a URL path and a component:
        - path: the URL pattern to match (e.g., "/" for home page)
        - element: the React component to render when the path matches
      */}
      
      {/* Home page route - renders Home component when URL is "/" */}
      <Route path="/" element={<Home />} />
      
      {/* Stocks page route - renders Stocks component when URL is "/stocks" */}
      <Route path="/stocks" element={<Stocks />} />
    </Routes>
  )
}
