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

  // If the API key is missing, stop early and explain the problem clearly.
  if (!ROIC_API_KEY) {
    response.status(500).json({
      message: 'ROIC_API_KEY is missing on the server. Add it to your environment before making requests.',
    });
    return;
  }

  try {
    // Ask ROIC for historical stock prices in ascending date order.
    // We also provide a limit so the app does not pull an unnecessarily large dataset.
    const roicResponse = await axios.get(`${ROIC_BASE_URL}/${identifier}`, {
      params: {
        apikey: ROIC_API_KEY,
        order: 'asc',
        limit: 1500,
      },
    });

    // Send the upstream data back to the frontend in a beginner-friendly wrapper object.
    response.json({
      identifier,
      prices: roicResponse.data,
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
