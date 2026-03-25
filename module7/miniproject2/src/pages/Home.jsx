// Home page component - displays the main landing page
// This component is rendered when the user navigates to "/" route

import Box from '@mui/material/Box';

// Import the SectorCardComponent to display on the home page
import SectorCardComponent from '../components/SectorCardComponent'

function Home() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', px: 2, py: 3 }}>
      {/* Render the SectorCardComponent which contains a chart */}
      <SectorCardComponent />
    </Box>
  );
}

// Export the Home component so it can be imported in other files (like App.jsx)
export default Home;
