import Box from '@mui/material/Box';
import { useEffect } from 'react';

// Import the stock card component that will be repeated for each stock.
import IndivStockComponent from '../components/IndivStockComponent';
import StockSearchResults from '../components/StockSearchResults';
import useStockSearch from '../hooks/useStockSearch';

function Stocks() {
  const {
    stocks,
    addStockFromResult,
    removeStockByIdentifier,
    pendingStockToAdd,
    clearPendingStockToAdd,
  } = useStockSearch();

  useEffect(() => {
    if (!pendingStockToAdd) {
      return undefined;
    }

    // Capture the pending stock immediately and clear shared state before the async add starts.
    // This is especially important in React StrictMode during development because effects can run
    // more than once on purpose. Clearing the pending value first prevents the same stock from
    // being processed twice if React re-runs this effect while helping us catch side-effect bugs.
    const stockToAdd = pendingStockToAdd;
    clearPendingStockToAdd();

    const addPendingStockOnStocksPage = async () => {
      // We wait until the Stocks page is mounted before doing the actual add.
      // This makes the Home-page flow feel natural: click add, switch pages, then see the chart appear here.
      await addStockFromResult(stockToAdd, {
        suppressDuplicateError: true,
      });
    };

    addPendingStockOnStocksPage();

    return undefined;
  }, [addStockFromResult, clearPendingStockToAdd, pendingStockToAdd]);

  return (
    <Box sx={{ px: 2, py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <StockSearchResults />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        {/*
          `.map()` is a common React pattern for rendering one component per data item.
          The difference now is that the list comes from shared app state instead of a hard-coded array,
          which is what makes the search feature able to add new cards dynamically.
        */}
        {stocks.map((stock) => {
          return (
            <IndivStockComponent
              key={stock.identifier}
              identifier={stock.identifier}
              name={stock.name}
              isRemovable={stock.isUserAdded}
              onRemove={() => removeStockByIdentifier(stock.identifier)}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default Stocks;
