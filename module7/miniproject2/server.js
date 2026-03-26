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
const MONTH_STRING_PATTERN = /^\d{4}-\d{2}$/;
const ROIC_MAX_STOCK_PRICE_LIMIT = 100000;

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
