// Import Express so we can create a small backend server for our app.
import express from 'express';

// Import Axios so the server can make HTTP requests to the ROIC API.
import axios from 'axios';

// Create the Express application instance.
const app = express();

// Read the port from the environment if one exists.
// If not, default to port 3001 for local development.
const PORT = process.env.PORT || 3001;

// Read the ROIC API key from environment variables.
// Keeping the key on the server means the browser never sees the secret.
const ROIC_API_KEY = process.env.ROIC_API_KEY;

// This base URL is the common starting point for all ROIC stock-price requests.
const ROIC_BASE_URL = 'https://api.roic.ai/v2/stock-prices';
const ROIC_COMPANY_NAME_SEARCH_URL = 'https://api.roic.ai/v2/tickers/search/name';
const MONTH_STRING_PATTERN = /^\d{4}-\d{2}$/;
const TICKER_PATTERN = /^[A-Z.-]{1,10}$/;
const ROIC_MAX_STOCK_PRICE_LIMIT = 100000;
const MAX_SEARCH_RESULTS = 8;

// Some APIs return number-looking values as strings, such as "1.59" instead of 1.59.
// Charts and calculations are easier to work with when those values are real numbers,
// so this helper converts a single value when possible and leaves it unchanged otherwise.
const convertToNumberIfPossible = (value) => {
  if (value === null || value === undefined || value === '') {
    return value;
  }

  const numericValue = Number(value);

  return Number.isNaN(numericValue) ? value : numericValue;
};

// This helper takes one ROIC price row and converts the fields we expect to be numeric.
// Doing this work on the server means every frontend component receives clean, consistent data.
const normalizePriceRow = (priceRow) => {
  return {
    ...priceRow,
    open: convertToNumberIfPossible(priceRow.open),
    high: convertToNumberIfPossible(priceRow.high),
    low: convertToNumberIfPossible(priceRow.low),
    close: convertToNumberIfPossible(priceRow.close),
    adj_close: convertToNumberIfPossible(priceRow.adj_close),
    volume: convertToNumberIfPossible(priceRow.volume),
    unadjusted_volume: convertToNumberIfPossible(priceRow.unadjusted_volume),
    change: convertToNumberIfPossible(priceRow.change),
    change_percent: convertToNumberIfPossible(priceRow.change_percent),
    vwap: convertToNumberIfPossible(priceRow.vwap),
  };
};

// Keep price rows in ascending date order before sending them to the frontend.
// Even when we ask the external API for the newest rows first, the chart is easier to read
// when dates still flow from oldest on the left to newest on the right.
const sortPriceRowsByDateAscending = (priceRows = []) => {
  return [...priceRows].sort((priceRowA, priceRowB) => {
    const dateA = priceRowA?.date || '';
    const dateB = priceRowB?.date || '';

    return dateA.localeCompare(dateB);
  });
};

// Check that a month string follows the YYYY-MM format expected by the frontend.
// Example of a valid value: "2024-06"
const isValidMonthString = (monthString) => {
  return typeof monthString === 'string' && MONTH_STRING_PATTERN.test(monthString);
};

// Search input can be either a ticker like "AAPL" or a company-name fragment like "micro".
// We normalize to uppercase later when comparing ticker symbols.
const isTickerLikeQuery = (searchQuery) => {
  return typeof searchQuery === 'string' && TICKER_PATTERN.test(searchQuery.toUpperCase());
};

// The ROIC search endpoints return extra fields like exchange and security type.
// The frontend only needs a small, stable shape, so we normalize it here on the server.
const normalizeTickerSearchResult = (searchResult) => {
  return {
    identifier: searchResult?.symbol || searchResult?.identifier || '',
    name: searchResult?.name || searchResult?.symbol || searchResult?.identifier || '',
    exchange: searchResult?.exchange || '',
    exchangeName: searchResult?.exchange_name || '',
    type: searchResult?.type || '',
  };
};

// Merge search results from multiple ROIC endpoints while preventing duplicate symbols.
// We use the ticker symbol as the unique key because the UI should only show one row per stock.
const mergeTickerSearchResults = (...searchResultLists) => {
  const mergedResultsMap = new Map();

  searchResultLists.flat().forEach((searchResult) => {
    const normalizedResult = normalizeTickerSearchResult(searchResult);

    if (!normalizedResult.identifier) {
      return;
    }

    if (!mergedResultsMap.has(normalizedResult.identifier)) {
      mergedResultsMap.set(normalizedResult.identifier, normalizedResult);
    }
  });

  return [...mergedResultsMap.values()].slice(0, MAX_SEARCH_RESULTS);
};

// ROIC's company-name search endpoint is useful for natural-language searches like "gitlab".
// It returns company metadata directly, which makes it a good fit for our search-results list.
const searchRoicByCompanyName = async (searchQuery) => {
  const response = await axios.get(ROIC_COMPANY_NAME_SEARCH_URL, {
    params: {
      query: searchQuery,
      limit: MAX_SEARCH_RESULTS,
      apikey: ROIC_API_KEY,
    },
  });

  return Array.isArray(response.data) ? response.data : [];
};

// ROIC's stock-price endpoint is a reliable way to validate an exact ticker symbol.
// It does not return a company name, so we use the symbol itself as the display fallback.
const searchRoicByExactTicker = async (tickerSymbol) => {
  const response = await axios.get(`${ROIC_BASE_URL}/${tickerSymbol}`, {
    params: {
      apikey: ROIC_API_KEY,
      order: 'desc',
      limit: 1,
    },
  });

  const priceRows = Array.isArray(response.data) ? response.data : [];

  if (priceRows.length === 0) {
    return [];
  }

  return [
    {
      identifier: tickerSymbol,
      name: tickerSymbol,
      exchange: '',
      exchangeName: '',
      type: 'stock',
    },
  ];
};

// Convert a month like "2024-06" into the first day of that month.
// The ROIC API expects full dates, not month-only strings.
const convertMonthStringToStartDate = (monthString) => {
  if (!isValidMonthString(monthString)) {
    return '';
  }

  return `${monthString}-01`;
};

// Convert a month like "2024-06" into the last day of that month.
// We use the "day 0 of the next month" trick because JavaScript will resolve it
// to the final day of the current month.
const convertMonthStringToEndDate = (monthString) => {
  if (!isValidMonthString(monthString)) {
    return '';
  }

  const [yearText, monthText] = monthString.split('-');
  const year = Number(yearText);
  const month = Number(monthText);

  if (Number.isNaN(year) || Number.isNaN(month)) {
    return '';
  }

  const lastDayOfMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

  return `${monthString}-${String(lastDayOfMonth).padStart(2, '0')}`;
};

// Add a lightweight health-check route so we can confirm the server is running.
app.get('/api/health', (request, response) => {
  // This route does not need any request data, so we explicitly ignore it.
  void request;

  response.json({
    message: 'ROIC proxy server is running.',
  });
});

// Provide a lightweight search route for the frontend.
// This route now uses ROIC as the source of truth for all searches,
// which means the app can find symbols that are not part of any local starter list.
app.get('/api/stocks/search', async (request, response) => {
  const rawQuery = typeof request.query.q === 'string' ? request.query.q.trim() : '';
  const uppercaseQuery = rawQuery.toUpperCase();
  const isTickerQuery = isTickerLikeQuery(rawQuery);

  if (!rawQuery) {
    response.status(400).json({
      message: 'Please provide a search query with ?q=',
    });
    return;
  }

  if (!ROIC_API_KEY) {
    response.status(500).json({
      message: 'ROIC_API_KEY is missing on the server. Add it to your environment before making search requests.',
    });
    return;
  }

  try {
    // Ticker-like searches should behave the same whether the user typed "azj", "AZJ", or "AzJ".
    // We normalize those searches to uppercase once so every ticker-style branch sends the same query upstream.
    //
    // For ordinary company-name searches such as "gitlab", we keep the natural user text because
    // the ROIC name-search endpoint is designed for name matching rather than strict ticker matching.
    const companyNameSearchQuery = isTickerQuery ? uppercaseQuery : rawQuery;
    const searchTasks = [searchRoicByCompanyName(companyNameSearchQuery)];

    // When the query looks like a ticker, also validate it directly against the live price endpoint.
    // This gives us exact-symbol support even when the company-name search endpoint focuses on names.
    //
    // We still combine both search branches because one branch can add exact-symbol confidence
    // while the other can contribute richer company metadata when ROIC has it available.
    if (isTickerQuery) {
      searchTasks.unshift(searchRoicByExactTicker(uppercaseQuery));
    }

    const searchResults = await Promise.allSettled(searchTasks);

    const successfulResultLists = searchResults
      .filter((searchResult) => searchResult.status === 'fulfilled')
      .map((searchResult) => searchResult.value);

    const mergedResults = mergeTickerSearchResults(...successfulResultLists);

    if (mergedResults.length === 0) {
      const rejectedResults = searchResults.filter((searchResult) => searchResult.status === 'rejected');

      if (rejectedResults.length === searchResults.length) {
        const firstError = rejectedResults[0]?.reason;
        const statusCode = firstError?.response?.status || 502;

        response.status(statusCode).json({
          message: `Unable to search stocks for "${rawQuery}".`,
          details: firstError?.response?.data || firstError?.message || 'ROIC search request failed.',
        });
        return;
      }
    }

    response.json({
      query: rawQuery,
      queryType: isTickerQuery ? 'ticker-or-name' : 'name',
      results: mergedResults,
    });
  } catch (error) {
    const statusCode = error.response?.status || 500;

    response.status(statusCode).json({
      message: `Unable to search stocks for "${rawQuery}".`,
      details: error.response?.data || error.message,
    });
  }
});

// Create an API route that the React frontend can call.
// The `:identifier` part is a route parameter, which means it changes based on the stock ticker.
app.get('/api/stock-prices/:identifier', async (request, response) => {
  // Pull the stock identifier out of the URL.
  // Example: for /api/stock-prices/AAPL, the identifier would be "AAPL".
  const { identifier } = request.params;
  const { startDate = '', endDate = '' } = request.query;

  // Validate the incoming month strings before calling the external API.
  // This gives the frontend a clear error if the query format is wrong.
  if ((startDate && !isValidMonthString(startDate)) || (endDate && !isValidMonthString(endDate))) {
    response.status(400).json({
      message: 'startDate and endDate must use the YYYY-MM format.',
    });
    return;
  }

  if (startDate && endDate && startDate > endDate) {
    response.status(400).json({
      message: 'startDate must be earlier than or equal to endDate.',
    });
    return;
  }

  // If the API key is missing, stop early and explain the problem clearly.
  if (!ROIC_API_KEY) {
    response.status(500).json({
      message: 'ROIC_API_KEY is missing on the server. Add it to your environment before making requests.',
    });
    return;
  }

  try {
    // When the user has not picked a custom date range yet, we ask for the newest rows first.
    // That means a limited response still ends near "today" instead of stopping decades ago.
    //
    // When the user does provide a custom range, we switch back to ascending order because
    // the server is already receiving exact boundaries for the requested period.
    const requestOrder = startDate || endDate ? 'asc' : 'desc';

    // Ask ROIC for historical stock prices.
    // ROIC documents a maximum `limit` of 100000 rows for this endpoint, which is enough
    // for the full daily history of these stocks, so we can fetch the complete dataset
    // without implementing page-by-page pagination in this project.
    const roicResponse = await axios.get(`${ROIC_BASE_URL}/${identifier}`, {
      params: {
        apikey: ROIC_API_KEY,
        order: requestOrder,
        limit: ROIC_MAX_STOCK_PRICE_LIMIT,
        ...(startDate ? { date_start: convertMonthStringToStartDate(startDate) } : {}),
        ...(endDate ? { date_end: convertMonthStringToEndDate(endDate) } : {}),
      },
    });

    // Normalize the numeric fields before sending the data to the browser.
    // This prevents frontend chart logic from failing when the API returns strings for prices.
    const normalizedPrices = Array.isArray(roicResponse.data)
      ? sortPriceRowsByDateAscending(roicResponse.data.map(normalizePriceRow))
      : [];

    // Send the upstream data back to the frontend in a beginner-friendly wrapper object.
    response.json({
      identifier,
      prices: normalizedPrices,
    });
  } catch (error) {
    // If ROIC sends back an HTTP error, Axios stores the server response on `error.response`.
    // We reuse that status code when possible so debugging is easier.
    const statusCode = error.response?.status || 500;

    // Provide a clear message the frontend can show to the user.
    response.status(statusCode).json({
      message: `Unable to load stock price data for ${identifier}.`,
      details: error.response?.data || error.message,
    });
  }
});

// Start listening for requests so the frontend can call this server.
app.listen(PORT, () => {
  console.log(`ROIC proxy server listening on http://localhost:${PORT}`);
});
