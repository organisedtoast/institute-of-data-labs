// We use one well-known ticker symbol for this live test.
// That keeps the example simple and gives the external API a good chance of returning data.
const LIVE_TICKER = 'AAPL';

// These preflight checks talk straight to the local Express server.
// This helps us separate backend problems from frontend or Vite-proxy problems.
const DEFAULT_SERVER_URL = process.env.ROIC_SERVER_URL || 'http://127.0.0.1:3001';

// Wrap all diagnostic failures in one custom error shape.
// The important part is the category label, such as `backend_search_failed`.
function buildDiagnosticError(category, detailLines = []) {
  const formattedDetails = detailLines.filter(Boolean).join('\n');
  const errorMessage = formattedDetails
    ? `[${category}] ${formattedDetails}`
    : `[${category}] Diagnostic check failed.`;

  const error = new Error(errorMessage);
  error.name = 'RoicDiagnosticError';
  error.category = category;
  return error;
}

// Some failing routes may return plain text or HTML instead of JSON.
// This helper keeps the test from crashing while trying to read the body.
async function parseJsonSafely(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

// This helper decides whether a backend error looks like "our route is broken"
// or "the external ROIC dependency is the likely problem".
function classifyExternalFailure(body) {
  const detailsText = JSON.stringify(body?.details || body?.message || '').toLowerCase();

  if (
    detailsText.includes('roic') ||
    detailsText.includes('apikey') ||
    detailsText.includes('unauthorized') ||
    detailsText.includes('forbidden') ||
    detailsText.includes('quota') ||
    detailsText.includes('rate limit')
  ) {
    return 'external_roic_failed';
  }

  return null;
}

// The health check is the smallest backend check we can do.
// If it fails, the rest of the chain cannot work either.
async function assertHealthEndpoint(requestContext) {
  let response;

  try {
    response = await requestContext.get(`${DEFAULT_SERVER_URL}/api/health`);
  } catch (error) {
    throw buildDiagnosticError('backend_health_failed', [
      `Health endpoint could not be reached at ${DEFAULT_SERVER_URL}/api/health.`,
      `Request error: ${error.message}`,
    ]);
  }

  const body = await parseJsonSafely(response);

  if (!response.ok()) {
    throw buildDiagnosticError('backend_health_failed', [
      `Expected /api/health to return HTTP 200 but received ${response.status()}.`,
      `Response body: ${JSON.stringify(body)}`,
    ]);
  }

  if (!body || typeof body.message !== 'string') {
    throw buildDiagnosticError('backend_health_failed', [
      'Health endpoint returned an invalid JSON shape.',
      `Response body: ${JSON.stringify(body)}`,
    ]);
  }
}

// Verify that the backend search endpoint works before opening the browser.
// That gives us a clearer failure than waiting for the UI to fail later.
async function assertSearchEndpoint(requestContext, ticker = LIVE_TICKER) {
  let response;

  try {
    response = await requestContext.get(`${DEFAULT_SERVER_URL}/api/stocks/search`, {
      params: { q: ticker },
    });
  } catch (error) {
    throw buildDiagnosticError('backend_search_failed', [
      `Search endpoint could not be reached at ${DEFAULT_SERVER_URL}/api/stocks/search?q=${ticker}.`,
      `Request error: ${error.message}`,
    ]);
  }

  const body = await parseJsonSafely(response);

  if (!response.ok()) {
    throw buildDiagnosticError(classifyExternalFailure(body) || 'backend_search_failed', [
      `Expected search endpoint to return HTTP 200 but received ${response.status()}.`,
      `Response body: ${JSON.stringify(body)}`,
    ]);
  }

  if (!body || !Array.isArray(body.results)) {
    throw buildDiagnosticError('backend_search_failed', [
      'Search endpoint returned an invalid JSON shape.',
      `Response body: ${JSON.stringify(body)}`,
    ]);
  }

  // For this live test, an empty result list still counts as a broken live-data chain.
  if (body.results.length === 0) {
    throw buildDiagnosticError('external_roic_failed', [
      `Search endpoint returned no live ROIC results for ${ticker}.`,
      `Response body: ${JSON.stringify(body)}`,
    ]);
  }

  const hasTicker = body.results.some((result) => result?.identifier === ticker);

  // We expect the exact ticker to be present so the browser test can click the right row reliably.
  if (!hasTicker) {
    throw buildDiagnosticError('backend_search_failed', [
      `Search results did not include the requested ticker ${ticker}.`,
      `Response body: ${JSON.stringify(body)}`,
    ]);
  }

  return {
    status: response.status(),
    resultCount: body.results.length,
  };
}

// Verify the price endpoint separately from search.
// A system can have working search but broken price-history loading, so we test both.
async function assertPriceEndpoint(requestContext, ticker = LIVE_TICKER) {
  let response;

  try {
    response = await requestContext.get(`${DEFAULT_SERVER_URL}/api/stock-prices/${ticker}`);
  } catch (error) {
    throw buildDiagnosticError('backend_price_failed', [
      `Price endpoint could not be reached at ${DEFAULT_SERVER_URL}/api/stock-prices/${ticker}.`,
      `Request error: ${error.message}`,
    ]);
  }

  const body = await parseJsonSafely(response);

  if (!response.ok()) {
    throw buildDiagnosticError(classifyExternalFailure(body) || 'backend_price_failed', [
      `Expected stock price endpoint to return HTTP 200 but received ${response.status()}.`,
      `Response body: ${JSON.stringify(body)}`,
    ]);
  }

  if (!body || !Array.isArray(body.prices)) {
    throw buildDiagnosticError('backend_price_failed', [
      'Price endpoint returned an invalid JSON shape.',
      `Response body: ${JSON.stringify(body)}`,
    ]);
  }

  // An empty list means the route responded, but the live data was not usable for charting.
  if (body.prices.length === 0) {
    throw buildDiagnosticError('external_roic_failed', [
      `Price endpoint returned an empty live ROIC payload for ${ticker}.`,
      `Response body: ${JSON.stringify(body)}`,
    ]);
  }

  const firstPriceRow = body.prices[0];

  // The frontend chart expects a date string and a numeric close price.
  // We check that shape here so any mismatch gets a precise backend-focused error.
  if (typeof firstPriceRow?.date !== 'string' || typeof firstPriceRow?.close !== 'number') {
    throw buildDiagnosticError('backend_price_failed', [
      'Price endpoint returned price rows without the expected date/close fields.',
      `First row: ${JSON.stringify(firstPriceRow)}`,
    ]);
  }

  return {
    status: response.status(),
    priceCount: body.prices.length,
    latestKnownDate: body.prices[body.prices.length - 1]?.date || '',
  };
}

// Run the backend-only checks in the same order a human would debug the system.
export async function runRoicPreflight(requestContext, ticker = LIVE_TICKER) {
  await assertHealthEndpoint(requestContext);
  const searchSummary = await assertSearchEndpoint(requestContext, ticker);
  const priceSummary = await assertPriceEndpoint(requestContext, ticker);

  return {
    ticker,
    searchSummary,
    priceSummary,
  };
}

export { buildDiagnosticError, LIVE_TICKER };
