// React hooks let this page remember data and run side effects like API calls.
import { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';

// Import the stock card component that will be repeated for each stock.
import IndivStockComponent from '../components/IndivStockComponent';

// Import the helper that converts daily API rows into monthly chart points.
import { convertDailyPricesToMonthlyPrices } from '../dataset/SharePrice';

// This fixed list controls which stocks appear on the page.
// Keeping it in one array makes it easy to add or remove stocks later.
const STOCKS_TO_DISPLAY = [
  { identifier: 'AAPL', name: 'Apple Inc.' },
  { identifier: 'MSFT', name: 'Microsoft Corporation' },
  { identifier: 'NVDA', name: 'NVIDIA Corporation' },
  { identifier: 'TSLA', name: 'Tesla, Inc.' },
];

// Build the starting state for every stock card.
// Each ticker begins in a loading state with no data and no error.
const createInitialStockState = () => {
  return STOCKS_TO_DISPLAY.reduce((stockState, stock) => {
    stockState[stock.identifier] = {
      data: [],
      isLoading: true,
      error: '',
    };

    return stockState;
  }, {});
};

function Stocks() {
  // This state object stores the chart data and request state for each stock.
  // Example shape:
  // {
  //   AAPL: { data: [...], isLoading: false, error: '' },
  //   MSFT: { data: [...], isLoading: true, error: '' }
  // }
  const [stockCards, setStockCards] = useState(createInitialStockState);

  useEffect(() => {
    // This flag helps us avoid updating React state after the component unmounts.
    let isMounted = true;

    // Wrap the async loading logic in a named function.
    // React effects themselves cannot be marked `async`, so this pattern is common.
    const loadStockPrices = async () => {
      try {
        // Request all stock datasets at the same time to keep the page fast.
        const stockResponses = await Promise.all(
          STOCKS_TO_DISPLAY.map(async (stock) => {
            try {
              // Call our local Express route, not the third-party API directly.
              const response = await axios.get(`/api/stock-prices/${stock.identifier}`);

              // Convert the daily rows from the server into monthly chart points.
              const monthlyPrices = convertDailyPricesToMonthlyPrices(response.data.prices);

              return {
                identifier: stock.identifier,
                data: monthlyPrices,
                error: '',
              };
            } catch (error) {
              // Build a readable fallback error message for this specific card.
              return {
                identifier: stock.identifier,
                data: [],
                error:
                  error.response?.data?.message ||
                  `Unable to load data for ${stock.identifier}.`,
              };
            }
          }),
        );

        // Only update state if the component is still on screen.
        if (!isMounted) {
          return;
        }

        // Convert the array of results into the object shape used by our cards.
        const nextStockState = stockResponses.reduce((stockState, stockResponse) => {
          stockState[stockResponse.identifier] = {
            data: stockResponse.data,
            isLoading: false,
            error: stockResponse.error,
          };

          return stockState;
        }, {});

        setStockCards(nextStockState);
      } catch {
        // This catch is a safety net for unexpected errors outside the per-stock requests.
        if (!isMounted) {
          return;
        }

        setStockCards((currentStockCards) => {
          const updatedStockCards = { ...currentStockCards };

          STOCKS_TO_DISPLAY.forEach((stock) => {
            updatedStockCards[stock.identifier] = {
              data: [],
              isLoading: false,
              error: `Unexpected error while loading ${stock.identifier}.`,
            };
          });

          return updatedStockCards;
        });
      }
    };

    loadStockPrices();

    // The cleanup function runs when the component unmounts.
    // We flip the flag so late API responses do not try to update state.
    return () => {
      isMounted = false;
    };
  }, []);

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
        For each stock in STOCKS_TO_DISPLAY, we render one stock card.
      */}
      {STOCKS_TO_DISPLAY.map((stock) => {
        const stockCardState = stockCards[stock.identifier] || {
          data: [],
          isLoading: true,
          error: '',
        };

        return (
          <IndivStockComponent
            key={stock.identifier}
            identifier={stock.identifier}
            name={stock.name}
            data={stockCardState.data}
            isLoading={stockCardState.isLoading}
            error={stockCardState.error}
          />
        );
      })}
    </Box>
  );
}

export default Stocks;
