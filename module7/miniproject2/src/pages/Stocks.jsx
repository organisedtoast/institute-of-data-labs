// Stocks page component - displays stock information and data
// This component is rendered when the user navigates to "/stocks" route

import Box from '@mui/material/Box';

// Import the IndivStockComponent to display on the stocks page
import IndivStockComponent from '../components/IndivStockComponent'

function Stocks() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', px: 2, py: 3 }}>
      {/* Render the IndivStockComponent which contains a chart */}
      <IndivStockComponent />
    </Box>
  );
}

// Export the Stocks component so it can be imported in other files (like App.jsx)
export default Stocks;
