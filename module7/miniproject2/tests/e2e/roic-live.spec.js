import { expect, test } from '@playwright/test';

import { buildDiagnosticError, LIVE_TICKER, runRoicPreflight } from './roicDiagnostics';

test.describe('ROIC live E2E diagnostic', () => {
  test('loads live ROIC data and renders it on the stock card', async ({ page, request }) => {
    // Before we do any browser clicks, check the backend directly.
    // This is like checking the plumbing before checking the taps.
    const preflightSummary = await runRoicPreflight(request, LIVE_TICKER);

    // Save the preflight data with the test report so debugging later is easier.
    await test.info().attach('roic-preflight-summary', {
      body: JSON.stringify(preflightSummary, null, 2),
      contentType: 'application/json',
    });

    // These variables record what the browser itself saw when it called `/api/...`.
    // That matters because preflight talks directly to Express,
    // while a real user in the browser goes through Vite's proxy first.
    const browserApiCalls = {
      search: null,
      prices: null,
    };

    page.on('response', async (response) => {
      // Listen to every browser response and keep the two ROIC-related ones that matter most.
      const responseUrl = response.url();

      if (responseUrl.includes('/api/stocks/search')) {
        browserApiCalls.search = {
          status: response.status(),
          url: responseUrl,
        };
        return;
      }

      if (responseUrl.includes(`/api/stock-prices/${LIVE_TICKER}`)) {
        browserApiCalls.prices = {
          status: response.status(),
          url: responseUrl,
        };
      }
    });

    // Load the real frontend.
    await page.goto('/');

    const searchForm = page.getByTestId('stock-search-form');
    const searchInput = page.getByTestId('stock-search-input');

    try {
      // If these are missing, the frontend did not boot into a usable state.
      await expect(searchForm).toBeVisible();
      await expect(searchInput).toBeVisible();
    } catch (error) {
      throw buildDiagnosticError('frontend_boot_failed', [
        'The app shell did not render the stock search form on the home page.',
        `Assertion error: ${error.message}`,
      ]);
    }

    // Use the same flow a real user would use: type, then submit.
    await searchInput.fill(LIVE_TICKER);
    await searchForm.press('Enter');

    const resultsContainer = page.getByTestId('stock-search-results');
    const searchResultRow = page.getByTestId(`search-result-${LIVE_TICKER}`);
    const addStockButton = page.getByTestId(`add-stock-${LIVE_TICKER}`);

    try {
      // Wait for the result list and the specific AAPL row to appear.
      await expect(resultsContainer).toBeVisible();
      await expect(searchResultRow).toBeVisible();
      await expect(addStockButton).toBeVisible();
    } catch (error) {
      // If the browser saw a failing `/api` call, blame the proxy/backend path.
      // Otherwise the problem is more likely in the frontend render logic.
      const failureCategory =
        browserApiCalls.search && browserApiCalls.search.status >= 400
          ? 'vite_proxy_failed'
          : 'frontend_render_failed';

      throw buildDiagnosticError(failureCategory, [
        `The browser did not render a visible search result row for ${LIVE_TICKER}.`,
        `Browser search call: ${JSON.stringify(browserApiCalls.search)}`,
        `Assertion error: ${error.message}`,
      ]);
    }

    // Click the exact add button for the ticker we searched for.
    await addStockButton.click();

    // The app may navigate to `/stocks` as part of this flow.
    // If it does, wait for it; if it was already there, continue.
    await page.waitForURL(/\/stocks$/, { timeout: 20_000 }).catch(() => null);

    const stockCard = page.getByTestId(`stock-card-${LIVE_TICKER}`);
    const stockCardLoading = page.getByTestId(`stock-card-loading-${LIVE_TICKER}`);
    const stockCardError = page.getByTestId(`stock-card-error-${LIVE_TICKER}`);
    const stockChart = page.getByTestId(`stock-chart-${LIVE_TICKER}`);

    try {
      // The card must appear before we can say the user flow reached the Stocks page successfully.
      await expect(stockCard).toBeVisible();
    } catch (error) {
      throw buildDiagnosticError('frontend_render_failed', [
        `The stock card for ${LIVE_TICKER} was not displayed after clicking ADD STOCK.`,
        `Assertion error: ${error.message}`,
      ]);
    }

    // On a fast machine the loading state may disappear quickly, so treat it as optional.
    await expect(stockCardLoading).toBeVisible().catch(() => null);

    try {
      // The healthy end state is:
      // - loading is gone
      // - no error is shown
      // - the chart area is visible
      // - the empty-data placeholder is not shown
      await expect(stockCardLoading).toHaveCount(0, { timeout: 30_000 });
      await expect(stockCardError).toHaveCount(0);
      await expect(stockChart).toBeVisible();
      await expect(stockCard).not.toContainText('No chart data is available for this stock yet.');
    } catch (error) {
      // If the price request failed in the browser, blame the proxy/backend leg.
      // Otherwise the app probably received data but failed to render it correctly.
      const failureCategory =
        browserApiCalls.prices && browserApiCalls.prices.status >= 400
          ? 'vite_proxy_failed'
          : 'frontend_render_failed';

      throw buildDiagnosticError(failureCategory, [
        `The stock card did not reach a healthy rendered state for ${LIVE_TICKER}.`,
        `Browser price call: ${JSON.stringify(browserApiCalls.prices)}`,
        `Assertion error: ${error.message}`,
      ]);
    }

    // Final guard: the browser should have made both expected API calls.
    if (!browserApiCalls.search || !browserApiCalls.prices) {
      throw buildDiagnosticError('vite_proxy_failed', [
        'The browser flow completed without observing both expected /api requests.',
        `Observed browser calls: ${JSON.stringify(browserApiCalls)}`,
      ]);
    }

    // Final guard: both browser-visible `/api` calls should have returned HTTP 200.
    if (browserApiCalls.search.status !== 200 || browserApiCalls.prices.status !== 200) {
      throw buildDiagnosticError('vite_proxy_failed', [
        'The browser observed non-200 /api responses while using the Vite proxy.',
        `Observed browser calls: ${JSON.stringify(browserApiCalls)}`,
      ]);
    }
  });
});
