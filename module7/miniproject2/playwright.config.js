import { defineConfig } from '@playwright/test';

// We keep these URLs in constants so they are easy to reuse and easy to override later.
const DEFAULT_BASE_URL = 'http://127.0.0.1:4173';
const DEFAULT_SERVER_URL = 'http://127.0.0.1:3001';

export default defineConfig({
  // All end-to-end browser tests live in this folder.
  testDir: './tests/e2e',
  // Live external-API checks can take longer than unit tests, so the full-test timeout is generous.
  timeout: 90_000,
  expect: {
    // Individual UI assertions also get extra time in case the app is waiting on live network calls.
    timeout: 20_000,
  },
  // This diagnostic suite is easier to read when one test runs at a time.
  fullyParallel: false,
  retries: 0,
  use: {
    // `baseURL` lets the test use page.goto('/') instead of repeating the full address.
    baseURL: process.env.PLAYWRIGHT_BASE_URL || DEFAULT_BASE_URL,
    // Keep rich debugging artifacts when a failure happens.
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: [
    {
      // Start the backend first and wait for its health-check route to respond.
      command: 'node --env-file=.env server.js',
      url: `${process.env.ROIC_SERVER_URL || DEFAULT_SERVER_URL}/api/health`,
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
    {
      // Start the frontend next. The browser talks to this server,
      // and Vite forwards `/api` requests to Express behind the scenes.
      command: 'npm run dev -- --host 127.0.0.1 --port 4173',
      url: process.env.PLAYWRIGHT_BASE_URL || DEFAULT_BASE_URL,
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
  ],
});
