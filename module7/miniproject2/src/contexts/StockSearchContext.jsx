import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { DEFAULT_STOCK_IDENTIFIERS, STOCK_CATALOG } from '../dataset/stockCatalog';
import StockSearchContext from './stockSearchContext';

// Browser storage only works with string values, so we keep one named key here.
// Using a constant avoids typos and makes it easier for beginners to see where persistence is configured.
const SAVED_STOCKS_STORAGE_KEY = 'saved-stocks';

// Convert the shared catalog into the initial stock cards that should always be shown.
// We mark these items as non-removable because they are the starter cards for the page.
const DEFAULT_STOCKS = DEFAULT_STOCK_IDENTIFIERS
  .map((identifier) => {
    return STOCK_CATALOG.find((stock) => stock.identifier === identifier);
  })
  .filter(Boolean)
  .map((stock) => ({
    ...stock,
    isUserAdded: false,
  }));

// This helper reads saved user-added stocks from the browser.
// The try/catch protects the app from bad JSON or older saved data.
function loadSavedStocksFromLocalStorage() {
  try {
    const rawSavedStocks = window.localStorage.getItem(SAVED_STOCKS_STORAGE_KEY);

    if (!rawSavedStocks) {
      return [];
    }

    const parsedSavedStocks = JSON.parse(rawSavedStocks);

    if (!Array.isArray(parsedSavedStocks)) {
      return [];
    }

    return parsedSavedStocks
      .filter((stock) => {
        return typeof stock?.identifier === 'string' && typeof stock?.name === 'string';
      })
      .map((stock) => ({
        identifier: stock.identifier.toUpperCase(),
        name: stock.name,
        isUserAdded: true,
      }));
  } catch {
    return [];
  }
}

// Merge defaults with saved stocks while preventing duplicates.
// The Map uses the ticker symbol as the unique key because each stock card should only appear once.
function mergeStocks(defaultStocks, savedStocks) {
  const mergedStocksMap = new Map();

  [...defaultStocks, ...savedStocks].forEach((stock) => {
    mergedStocksMap.set(stock.identifier, stock);
  });

  return [...mergedStocksMap.values()];
}

export function StockSearchProvider({ children }) {
  // The currently displayed stock cards live here so multiple parts of the app can share them.
  const [stocks, setStocks] = useState(() => {
    return mergeStocks(DEFAULT_STOCKS, loadSavedStocksFromLocalStorage());
  });

  // The navbar input is controlled by React state so the app always knows the current search text.
  const [searchText, setSearchText] = useState('');

  // Search results are separate from added cards because a user might search several times
  // before deciding which result they want to add to the page.
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState('idle');
  const [searchError, setSearchError] = useState('');
  const [pendingStockToAdd, setPendingStockToAdd] = useState(null);

  // Save only the user-added cards.
  // This keeps localStorage focused on user customisation instead of storing the built-in defaults too.
  useEffect(() => {
    const userAddedStocks = stocks.filter((stock) => stock.isUserAdded);

    window.localStorage.setItem(
      SAVED_STOCKS_STORAGE_KEY,
      JSON.stringify(
        userAddedStocks.map((stock) => ({
          identifier: stock.identifier,
          name: stock.name,
        })),
      ),
    );
  }, [stocks]);

  const clearSearchFeedback = useCallback(() => {
    setSearchResults([]);
    setSearchStatus('idle');
    setSearchError('');
  }, []);

  const queuePendingStockToAdd = useCallback((selectedStock) => {
    // We store the stock temporarily when the user clicks "Add stock card" on Home.
    // After navigation, the Stocks page will read this pending value and perform the actual add there.
    setPendingStockToAdd(selectedStock);
  }, []);

  const clearPendingStockToAdd = useCallback(() => {
    setPendingStockToAdd(null);
  }, []);

  const runStockSearch = useCallback(async () => {
    const normalizedQuery = searchText.trim();

    if (!normalizedQuery) {
      setSearchResults([]);
      setSearchStatus('error');
      setSearchError('Please type a ticker or company name before searching.');
      return false;
    }

    setSearchStatus('loading');
    setSearchError('');

    try {
      const response = await axios.get('/api/stocks/search', {
        params: {
          q: normalizedQuery,
        },
      });

      const nextResults = Array.isArray(response.data?.results) ? response.data.results : [];

      setSearchResults(nextResults);
      setSearchStatus('success');

      if (nextResults.length === 0) {
        setSearchError('No matching stocks were found. Try another ticker or company name.');
      }

      return true;
    } catch (requestError) {
      setSearchResults([]);
      setSearchStatus('error');
      setSearchError(
        requestError.response?.data?.message ||
          'Search is unavailable right now. Please try again in a moment.',
      );
      return false;
    }
  }, [searchText]);

  const addStockFromResult = useCallback(async (
    selectedStock,
    options = {},
  ) => {
    const {
      suppressDuplicateError = false,
    } = options;
    const normalizedIdentifier = selectedStock?.identifier?.trim().toUpperCase();
    const resolvedName = selectedStock?.name?.trim() || normalizedIdentifier;

    if (!normalizedIdentifier) {
      setSearchStatus('error');
      setSearchError('The selected stock was missing a ticker symbol.');
      return false;
    }

    setSearchStatus('loading');
    setSearchError('');

    try {
      // We validate the final choice with the existing price endpoint before saving it.
      // This keeps search suggestions and real chart availability in sync.
      await axios.get(`/api/stock-prices/${normalizedIdentifier}`);

      let didInsertNewStock = false;

      setStocks((currentStocks) => {
        // We check for duplicates again here using the latest available state.
        // This is more reliable than checking only once before the async request,
        // because React may process multiple add attempts very close together.
        // By reading `currentStocks` inside the updater, we stop the same ticker
        // from being inserted twice even if two add flows overlap.
        const stockAlreadyExists = currentStocks.some((stock) => {
          return stock.identifier === normalizedIdentifier;
        });

        if (stockAlreadyExists) {
          return currentStocks;
        }

        didInsertNewStock = true;

        // We insert the newest stock at the start of the array instead of the end.
        // React renders `.map()` output in array order, so putting the new stock first
        // makes the newly added card appear at the top of the page immediately.
        //
        // We still use the functional `setStocks((currentStocks) => ...)` form because
        // React gives us the latest state value there, which is the safest way to build
        // the next array from the current one.
        return [
          {
            identifier: normalizedIdentifier,
            name: resolvedName,
            isUserAdded: true,
          },
          ...currentStocks,
        ];
      });

      if (!didInsertNewStock) {
        // Some flows, such as "click add on Home and then navigate to Stocks",
        // can intentionally tolerate a harmless second add attempt while React is
        // coordinating page navigation. In those cases we silently ignore the
        // duplicate instead of showing an error to the user.
        if (!suppressDuplicateError) {
          setSearchStatus('error');
          setSearchError(`${normalizedIdentifier} is already being displayed.`);
        }
        return false;
      }

      setSearchText('');
      setSearchResults([]);
      setSearchStatus('success');
      setSearchError('');
      return true;
    } catch (requestError) {
      setSearchStatus('error');
      setSearchError(
        requestError.response?.data?.message ||
          `Unable to add ${normalizedIdentifier} because its stock data could not be loaded.`,
      );
      return false;
    }
  }, []);

  const removeStockByIdentifier = useCallback((identifierToRemove) => {
    // Only user-added cards should be removable.
    // The default starter cards stay in place so the page always has a useful baseline.
    setStocks((currentStocks) => {
      return currentStocks.filter((stock) => {
        const matchesTarget = stock.identifier === identifierToRemove;

        if (!matchesTarget) {
          return true;
        }

        return !stock.isUserAdded;
      });
    });
  }, []);

  const contextValue = useMemo(() => {
    return {
      stocks,
      searchText,
      searchResults,
      searchStatus,
      searchError,
      pendingStockToAdd,
      setSearchText,
      runStockSearch,
      addStockFromResult,
      removeStockByIdentifier,
      clearSearchFeedback,
      queuePendingStockToAdd,
      clearPendingStockToAdd,
    };
  }, [
    addStockFromResult,
    clearPendingStockToAdd,
    clearSearchFeedback,
    pendingStockToAdd,
    queuePendingStockToAdd,
    removeStockByIdentifier,
    runStockSearch,
    searchError,
    searchResults,
    searchStatus,
    searchText,
    stocks,
  ]);

  return (
    <StockSearchContext.Provider value={contextValue}>
      {children}
    </StockSearchContext.Provider>
  );
}
