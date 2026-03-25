// Import the NavBar component from the components folder
import NavBar from './components/NavBar'

// Import the AppRoutes component that handles all routing
// This keeps routing logic separate and organized
import AppRoutes from './approutes/AppRoutes'

function App() {
  return (
    <>
      <NavBar />
      <AppRoutes />
    </>
  )
}

export default App
