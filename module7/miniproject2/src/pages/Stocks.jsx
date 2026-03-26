import Box from '@mui/material/Box';

// Import the stock card component that will be repeated for each stock.
import IndivStockComponent from '../components/IndivStockComponent';

// This fixed list controls which stocks appear on the page.
// Keeping it in one array makes it easy to add or remove stocks later.
const STOCKS_TO_DISPLAY = [
  { identifier: 'AAPL', name: 'Apple Inc.' },
  { identifier: 'MSFT', name: 'Microsoft Corporation' },
  { identifier: 'NVDA', name: 'NVIDIA Corporation' },
  { identifier: 'TSLA', name: 'Tesla, Inc.' },
];

function Stocks() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 3,
        px: 2,
        py: 3,
      }}
    >
      {/*
        `.map()` is a common React pattern for rendering one component per data item.
        Each stock card now manages its own date range and data loading.
        That means changing one card's dates does not affect the others.
      */}
      {STOCKS_TO_DISPLAY.map((stock) => {
        return (
          <IndivStockComponent
            key={stock.identifier}
            identifier={stock.identifier}
            name={stock.name}
          />
        );
      })}
    </Box>
  );
}

export default Stocks;
