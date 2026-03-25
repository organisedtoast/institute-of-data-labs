// Home page component - displays the main landing page
// This component is rendered when the user navigates to "/" route

// Import the SectorCardComponent to display on the home page
import SectorCardComponent from '../components/SectorCardComponent'

function Home() {
  return (
    <>
      {/* Render the SectorCardComponent which contains a chart */}
      <SectorCardComponent />
    </>
  );
}

// Export the Home component so it can be imported in other files (like App.jsx)
export default Home;
