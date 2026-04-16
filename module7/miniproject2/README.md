# Stock Gossip Monitor

A full-stack React application that lets you search for stocks, view their price charts, and track market data.

Built with React, Material-UI and ROIC stock market API.
The project also includes a Playwright-based live end-to-end diagnostic test that checks whether ROIC data makes it all the way to the frontend.

---

## 📖 Table of Contents

- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [How the App Works](#-how-the-app-works)
- [Key Components](#-key-components)
- [Hooks, Context & State Management](#-hooks-context--state-management)
- [API Integrations & Data Fetching](#-api-integrations--data-fetching)
- [ROIC Live E2E Test](#-roic-live-e2e-test)
- [Styling](#-styling)
- [Common Tasks for Beginners](#-common-tasks-for-beginners)
- [Troubleshooting](#-troubleshooting)
- [Learn More](#-learn-more)

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Playwright browser binary** for E2E testing - install it once with `npm run test:e2e:install` when you want to run the live browser test

To check if you have them installed, run these commands in your terminal:

```bash
node --version
npm --version
```

### Installation

1. **Navigate to the project folder:**

   ```bash
   cd module7/miniproject2
   ```

2. **Install all dependencies:**

   ```bash
   npm install
   ```

   This downloads all the libraries the app needs (React, Material-UI, Express, Playwright tooling, etc.).

3. **Optional: install the Playwright browser used for E2E testing:**

   ```bash
   npm run test:e2e:install
   ```

   You only need this if you want to run the automated Playwright browser test.

4. **Set up environment variables:**

   - Copy the `.env.example` file and rename it to `.env`
   - Open `.env` and add your ROIC.ai API key:

     ```
     ROIC_API_KEY=your_actual_api_key_here
     ```

   > ⚠️ **Important:** Never commit your `.env` file to Git! It's already in `.gitignore`.

### Running the App

The app has two parts that need to run together:

1. **Start the backend server** (handles API requests):

   ```bash
   npm run server
   ```

   This starts the Express API server on `http://localhost:3001`.
   It is the only part of the app that should talk to the ROIC API directly.
   Your `ROIC_API_KEY` stays on the server, which keeps it out of the browser.

2. **Start the frontend** (the React UI you see in the browser):

   Open a **new terminal window** and run:

   ```bash
   npm run dev
   ```

   This starts the Vite development server on `http://localhost:5173`.
   In development, Vite forwards requests that begin with `/api` to the Express server on port `3001`.

3. **Open your browser** and go to:

   ```
   http://localhost:5173
   ```

   You should see the Stock Gossip Monitor home page!

For normal development, you start the backend and frontend manually as shown above.
For the Playwright live ROIC test, Playwright starts both services automatically.
See [ROIC Live E2E Test](#-roic-live-e2e-test) for the full test workflow.

---

## 📁 Project Structure

```
miniproject2/
├── src/
│   ├── approutes/
│   │   └── AppRoutes.jsx          # Defines all pages and their URLs
│   ├── components/
│   │   ├── ChartDateRangeControls.jsx  # Date picker buttons (1M, 6M, 1Y, etc.)
│   │   ├── IndivStockChart.jsx         # Line chart for a single stock
│   │   ├── IndivStockComponent.jsx     # Card that holds a stock chart
│   │   ├── NavBar.jsx                  # Top bar with logo and search
│   │   ├── SectorCardComponent.jsx     # Card for sector chart
│   │   ├── SectorChart.jsx             # Sector performance chart
│   │   └── StockSearchResults.jsx      # Shows search results
│   ├── contexts/
│   │   ├── StockSearchContext.jsx      # Provides shared data to all components
│   │   └── stockSearchContext.js       # Creates the context object
│   ├── dataset/
│   │   ├── SectorPrice.jsx             # Fake sector data for demo
│   │   ├── SharePrice.jsx              # Helper functions for price data
│   │   └── stockCatalog.js             # List of 30 available stocks
│   ├── hooks/
│   │   ├── useChartDateRange.jsx       # Custom hook for chart date controls
│   │   └── useStockSearch.js           # Custom hook to access search context
│   ├── pages/
│   │   ├── Home.jsx                    # Landing page (/)
│   │   └── Stocks.jsx                  # Stock cards page (/stocks)
│   ├── App.jsx                         # Main app wrapper
│   └── main.jsx                        # Entry point (starts React)
├── tests/
│   └── e2e/
│       ├── roic-live.spec.js           # Playwright browser test for the full live ROIC user journey
│       └── roicDiagnostics.js          # Diagnostic helpers that classify failures by backend/proxy/ROIC/UI stage
├── server.js                           # Express backend server
├── vite.config.js                      # Build tool configuration
├── playwright.config.js                # Playwright configuration that starts the local servers for E2E tests
├── package.json                        # Lists all dependencies
├── index.html                          # HTML page that loads React
└── .env.example                        # Template for environment variables
```

---

## 🛠️ Tech Stack

| Technology | What It Does |
|------------|--------------|
| **React 19** | The main framework for building the UI |
| **Vite** | Fast build tool that runs the dev server |
| **React Router DOM** | Handles navigation between pages |
| **Material-UI (MUI)** | Pre-built UI components (buttons, cards, inputs) |
| **MUI X Charts** | Draws the stock price line charts |
| **Express** | Node.js server that proxies API requests |
| **Axios** | Makes HTTP requests to the backend |
| **nodemon** | Auto-restarts the backend server during normal development |
| **Playwright** | Runs browser-based end-to-end tests against the live frontend/backend/ROIC flow |

---

## 🎯 Features

- 🔍 **Stock Search** - Search by ticker (e.g., "AAPL") or company name (e.g., "Apple")
- 📈 **Interactive Charts** - View stock price history as line charts
- 📅 **Date Range Controls** - Filter charts by time (1M, 6M, 1Y, 3Y, 5Y, 10Y, Max)
- ➕ **Add/Remove Stocks** - Build your own watchlist of stock cards
- 💾 **Persistent Storage** - Your added stocks are saved in the browser
- 🏠 **Two Pages** - Home (sector overview) and Stocks (your watchlist)
- 🧪 **Live ROIC Diagnostic E2E Test** - Automated Playwright coverage for the real search-to-chart journey and failure diagnosis

---

## 🧭 How the App Works

### Page Routes

| URL | Page | What You See |
|-----|------|--------------|
| `/` | Home | Sector chart + search results |
| `/stocks` | Stocks | All your stock cards with charts |

Navigation happens through:
- The **hamburger menu** (top-left) - click to see Home and Stocks links
- **Clicking "Stock Gossip Monitor"** - always takes you Home
- **Adding a stock from search** - automatically goes to `/stocks`

### Search Functionality

1. Type a ticker or company name in the **search bar** (top-right)
2. Press **Enter** or click the **magnifying glass**
3. Results appear below the sector chart
4. Click **"Add Stock"** to add it to your watchlist
5. You're redirected to the **Stocks page** to see your new card

This same search-and-add journey is also the path covered by the Playwright live E2E test, which uses the real navbar search box and stock-card flow instead of a mocked shortcut.

### Stock Cards

Each stock card shows:
- **Ticker symbol** and company name
- **Line chart** of historical prices
- **Date range controls** below the chart
- **Remove button** (×) to delete the card

### Chart Controls

- **Preset buttons:** Quickly select 1 Month, 6 Months, 1 Year, etc.
- **Custom dates:** Use the month pickers to choose exact start and end dates
- Charts **auto-update** when you change the range

---

## 📦 Key Components

| Component | File | Purpose |
|-----------|------|---------|
| `NavBar` | `components/NavBar.jsx` | Top bar with logo, menu, and search form |
| `StockSearchResults` | `components/StockSearchResults.jsx` | Displays search results with "Add Stock" buttons |
| `IndivStockComponent` | `components/IndivStockComponent.jsx` | Card container for a single stock (handles loading/error states) |
| `IndivStockChart` | `components/IndivStockChart.jsx` | Renders the MUI line chart for price data |
| `ChartDateRangeControls` | `components/ChartDateRangeControls.jsx` | Reusable date picker with preset buttons |
| `SectorChart` | `components/SectorChart.jsx` | Line chart for sector performance (demo data) |

---

## 🔌 Hooks, Context & State Management

This section explains **three important React concepts** that the app uses to share data between components.

---

### What is State?

**State** is data that can **change** during the life of the app.

Examples in this app:
- The text you type in the search box
- The list of stocks you've added
- Whether the search is currently loading
- The date range selected on a chart

When state changes, React **re-renders** the components that use that state.

---

### What are Hooks?

**Hooks** are special functions that let you "hook into" React features.

Think of them as **tools** React gives you to:
- Remember data (`useState`)
- Run code at certain times (`useEffect`)
- Share data across components (`useContext`)
- And more!

#### Hooks Used in This App

##### 1. `useState`

Stores a piece of data that can change.

```jsx
const [searchText, setSearchText] = useState('');
```

- `searchText` = the current value (starts as empty string `''`)
- `setSearchText` = the function to update it

When you call `setSearchText('AAPL')`, React updates `searchText` to `'AAPL'` and re-renders.

##### 2. `useReducer`

A more powerful version of `useState` for complex state.

Used in `useChartDateRange.jsx` to manage multiple related values:

```jsx
const [state, dispatch] = useReducer(chartDateRangeReducer, initialState);
```

- `state` = an object with multiple values (startDate, endDate, activePreset, etc.)
- `dispatch` = a function to send "actions" that update the state

Example action:

```jsx
dispatch({ type: 'SET_PRESET', payload: '5Y' });
```

This tells the reducer: "Set the preset to 5 Years" and the reducer updates all related values.

##### 3. `useContext`

Access shared data from anywhere in the app (explained below).

##### 4. `useNavigate`

Programmatically change pages.

```jsx
const navigate = useNavigate();
navigate('/stocks'); // Go to the Stocks page
```

##### 5. `useLocation`

Get information about the current URL.

```jsx
const location = useLocation();
console.log(location.pathname); // e.g., "/stocks"
```

---

### What is Context?

**Context** is a way to share data **globally** without passing props through every level.

#### The Problem Context Solves

Imagine you have data (like the search results) that many components need:

```
NavBar (has search input)
  ↓ props
App
  ↓ props
Home
  ↓ props
StockSearchResults (needs search results)
```

Without Context, you'd have to pass `searchResults` through `App` and `Home` just to reach `StockSearchResults`. This is called **"prop drilling"** and it's messy.

#### The Context Solution

Context lets you **broadcast** data to any component that needs it:

```
StockSearchProvider (wraps entire app)
       ↓ broadcasts ↓
NavBar  App  Home  Stocks  StockSearchResults
       (any component can access the data)
```

---

### The StockSearchContext in This App

#### File: `src/contexts/stockSearchContext.js`

This file **creates** the context:

```jsx
import { createContext } from 'react';

export const StockSearchContext = createContext(null);
```

Think of `createContext` as creating a **radio channel**. Components can "tune in" to this channel to receive data.

---

#### File: `src/contexts/StockSearchContext.jsx`

This file **provides** the data on that channel:

```jsx
export function StockSearchProvider({ children }) {
  // ... state variables ...

  return (
    <StockSearchContext.Provider value={{ /* data to share */ }}>
      {children}
    </StockSearchContext.Provider>
  );
}
```

The `value` prop contains everything components can access:

| Property | Type | Purpose |
|----------|------|---------|
| `stocks` | Array | List of stock cards the user has added |
| `searchText` | String | Current text in the search bar |
| `searchResults` | Array | Results from the API search |
| `searchStatus` | String | `'idle'`, `'loading'`, `'success'`, or `'error'` |
| `searchError` | String | Error message if search failed |
| `pendingStockToAdd` | Object | Stock waiting to be added after navigation |

| Function | Purpose |
|----------|---------|
| `runStockSearch()` | Call the API to search for stocks |
| `addStockFromResult(stock)` | Add a stock to the watchlist |
| `removeStockByIdentifier(ticker)` | Remove a stock from the watchlist |
| `queuePendingStockToAdd(stock)` | Store a stock to add after page change |

---

#### How Components Use the Context

File: `src/hooks/useStockSearch.js`

This custom hook makes it easy to access the context:

```jsx
import { useContext } from 'react';
import { StockSearchContext } from '../contexts/stockSearchContext';

export default function useStockSearch() {
  const context = useContext(StockSearchContext);

  if (!context) {
    throw new Error('useStockSearch must be used within a StockSearchProvider');
  }

  return context;
}
```

Now any component can get the shared data with one line:

```jsx
const { stocks, searchText, runStockSearch } = useStockSearch();
```

---

### Data Flow Example: Adding a Stock

Let's trace what happens when a user adds a stock:

1. **User types "AAPL"** in the NavBar search bar
   - `searchText` state updates via `setSearchText('AAPL')`

2. **User presses Enter**
   - `handleSearchSubmit` is called
   - `runStockSearch()` is executed

3. **`runStockSearch` fetches data from API**
   - `searchStatus` changes to `'loading'`
   - API request is made
   - On success: `searchResults` is filled, `searchStatus` becomes `'success'`

4. **User clicks "Add Stock"** on a result
   - `addStockFromResult(stock)` is called
   - Stock is added to `stocks` array
   - Stock is saved to `localStorage`
   - User is navigated to `/stocks`

5. **Stocks page renders**
   - Reads `stocks` from context
   - Restores saved user-added stocks in the same order they were last shown
   - Appends the built-in default cards afterwards if those tickers are not already present
   - Creates an `IndivStockComponent` for each stock

---

### Why This Architecture?

| Benefit | Explanation |
|---------|-------------|
| **Single Source of Truth** | All search-related data lives in one place (the Context) |
| **No Prop Drilling** | Any component can access data without passing props |
| **Easy to Test** | Hooks can be tested independently |
| **Scalable** | Easy to add new features that need search data |
| **Consistent** | All components use the same `useStockSearch` hook |

---

## 🔌 API Integrations & Data Fetching

This section explains how the app **talks to external services** to get real stock data.

The repo also includes a Playwright diagnostic test that verifies this full path from a real browser:

```text
browser -> Vite /api proxy -> Express backend -> ROIC API -> frontend chart render
```

That test performs backend preflight checks before the browser journey begins, which helps identify whether a failure is in the backend, the proxy, the external API, or the UI rendering step.

---

### Why Do We Need a Backend Server?

You might wonder: *"Why can't React just call the stock API directly?"*

The answer is **security**.

#### The Problem

The ROIC.ai API requires an **API key** to access. If you put this key in your React code:

```jsx
// ❌ BAD - Don't do this!
const apiKey = 'sk_live_abc123xyz';
axios.get(`https://api.roic.ai/...?key=${apiKey}`);
```

This key would be:
- **Visible to everyone** (anyone can view source in browser)
- **Stolen by malicious users**
- **Used to exhaust your API quota**
- **A major security breach**

#### The Solution: API Proxy

The app uses an **Express server** as a middleman:

```
Browser (React) → Your Express Server → ROIC.ai API
     (no key)         (has key)          (returns data)
```

The API key **never leaves the server**.

---

### The Express Server

File: `server.js`

This is a **Node.js server** that runs alongside your React app.

#### Server Setup

```jsx
import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3001;

// Read API key from environment variable
const ROIC_API_KEY = process.env.ROIC_API_KEY;
```

- `express` = framework for building web servers
- `axios` = library to make HTTP requests (used to call ROIC.ai)
- `process.env.ROIC_API_KEY` = reads the key from your `.env` file

---

#### Server Endpoints

An **endpoint** is a URL that the server listens to.

##### 1. Health Check

```jsx
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});
```

- **URL:** `GET http://localhost:3001/api/health`
- **Purpose:** Check if the server is running
- **Response:** `{ "status": "ok" }`

##### 2. Stock Search

```jsx
app.get('/api/stocks/search', async (req, res) => {
  const { q } = req.query; // Get search term from URL

  try {
    const response = await axios.get(
      `https://api.roic.ai/v2/tickers/search/name`,
      {
        params: { query: q },
        headers: { Authorization: `Bearer ${ROIC_API_KEY}` }
      }
    );

    res.json(response.data); // Send data back to React
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});
```

- **URL:** `GET http://localhost:3001/api/stocks/search?q=AAPL`
- **Purpose:** Search for stocks by ticker or name
- **What happens:**
  1. Server receives search term `q`
  2. Server calls ROIC.ai with the API key in the header
  3. ROIC.ai returns matching stocks
  4. Server forwards the data to React

##### 3. Stock Prices

```jsx
app.get('/api/stock-prices/:identifier', async (req, res) => {
  const { identifier } = req.params; // e.g., "AAPL"

  try {
    const response = await axios.get(
      `https://api.roic.ai/v2/stock-prices`,
      {
        params: { ticker: identifier },
        headers: { Authorization: `Bearer ${ROIC_API_KEY}` }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prices' });
  }
});
```

- **URL:** `GET http://localhost:3001/api/stock-prices/AAPL`
- **Purpose:** Get historical price data for a stock
- **Response:** Array of daily prices (date, open, high, low, close, volume)

---

### Vite Proxy Configuration

File: `vite.config.js`

During development, React runs on `localhost:5173` and the Express server runs on `localhost:3001`. To avoid **CORS errors** and having to write full URLs, Vite proxies API requests:

```jsx
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
});
```

  This means:
  - When React calls `/api/stocks/search`, Vite forwards it to `http://localhost:3001/api/stocks/search`
  - React code can just use **relative paths** like `/api/...`
  - React code should not hard-code `http://localhost:3001` inside components
  - React code should not call `https://api.roic.ai/...` directly from the browser
  - This setup avoids browser CORS errors during local development and keeps the API key on the server
  - The Playwright live test depends on this same proxy path when it checks the full browser flow

  ---

### Data Fetching in React

File: `src/contexts/StockSearchContext.jsx`

The `runStockSearch` function is where React fetches data:

```jsx
const runStockSearch = async () => {
  if (!searchText.trim()) {
    return false;
  }

  setSearchStatus('loading');
  setSearchError('');

  try {
    // Call YOUR server, not ROIC directly
    const response = await axios.get('/api/stocks/search', {
      params: { q: searchText }
    });

    setSearchResults(response.data);
    setSearchStatus('success');
    return true;

  } catch (error) {
    setSearchError(error.message);
    setSearchStatus('error');
    return false;
  }
};
```

#### Step-by-Step Breakdown

| Step | Code | What Happens |
|------|------|--------------|
| 1 | `if (!searchText.trim())` | Don't search if input is empty |
| 2 | `setSearchStatus('loading')` | Show loading state to user |
| 3 | `axios.get('/api/stocks/search', ...)` | Request data from your Express server |
| 4 | `params: { q: searchText }` | Sends `?q=AAPL` in the URL |
| 5 | `response.data` | Get the search results |
| 6 | `setSearchResults(...)` | Store results in Context |
| 7 | `setSearchStatus('success')` | Tell UI the search completed |
| 8 | `catch (error)` | If something fails, store the error message |

---

### Data Processing Utilities

File: `src/dataset/SharePrice.jsx`

The raw API data needs processing before it can be displayed in charts.

#### Key Functions

##### 1. Convert Daily to Monthly Prices

```jsx
function convertDailyPricesToMonthlyPrices(dailyPrices) {
  // Groups daily data by month
  // Uses the last price of each month as the "monthly close"
}
```

- **Input:** 252 daily prices (one year of trading days)
- **Output:** 12 monthly prices
- **Why:** Charts are cleaner with fewer data points

##### 2. Filter by Date Range

```jsx
function filterDataByMonthRange(data, startDate, endDate) {
  // Returns only data points between the selected dates
}
```

- Used when user selects "1Y" or custom dates

##### 3. Calculate Trailing Month Range

```jsx
function getTrailingMonthRange(preset) {
  // Returns start/end dates for presets like '5Y', '1Y', 'MAX'
}
```

- `'5Y'` → Start: 5 years ago, End: today
- `'MAX'` → Start: earliest available, End: today

##### 4. Chart Formatters

```jsx
function dateAxisFormatter(value) {
  // Converts "2024-01" to "Jan 2024" on the chart axis
}

function priceFormatter(value) {
  // Converts 150.5 to "$150.50" on the Y-axis
}
```

---

### Full Data Flow Diagram

```
┌─────────────┐
│   User      │
│  types "AAPL"│
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│   NavBar Component  │
│  (search input)     │
└──────┬──────────────┘
       │ calls runStockSearch()
       ▼
┌─────────────────────────────┐
│  StockSearchContext         │
│  (manages search state)     │
└──────┬──────────────────────┘
       │ axios.get('/api/stocks/search?q=AAPL')
       ▼
┌─────────────────────┐
│   Vite Dev Server   │
│   (proxies /api)    │
└──────┬──────────────┘
       │ forwards to localhost:3001
       ▼
┌─────────────────────┐
│  Express Server     │
│  (server.js)        │
└──────┬──────────────┘
       │ axios.get('https://api.roic.ai/...')
       │ (with API key in header)
       ▼
┌─────────────────────┐
│   ROIC.ai API       │
│   (external service)│
└──────┬──────────────┘
       │ returns JSON
       ▼
┌─────────────────────┐
│  Express Server     │
│  (forwards response)│
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  StockSearchContext │
│  (sets searchResults)│
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ StockSearchResults  │
│ (displays results)  │
└─────────────────────┘
```

---

### How Playwright Verifies This Flow

The automated E2E test adds one more layer on top of the normal runtime flow:

```text
Playwright
  -> opens the real frontend in a browser
  -> runs preflight checks against the backend routes
  -> uses the real navbar search for AAPL
  -> clicks the real ADD STOCK button
  -> confirms the stock card chart renders
```

This means the test is checking both:

- the backend data path
- the frontend user journey that displays that data

For the full setup and command list, see [ROIC Live E2E Test](#-roic-live-e2e-test).

---

### Environment Variables

File: `.env`

Environment variables are **secret values** that your code can read.

```
ROIC_API_KEY=sk_live_your_actual_key
```

#### How to Use Them

In `server.js`:

```jsx
const ROIC_API_KEY = process.env.ROIC_API_KEY;
```

#### Security Rules

| Do ✅ | Don't ❌ |
|-------|---------|
| Store `.env` in `.gitignore` | Commit `.env` to Git |
| Use `.env.example` as a template | Hardcode keys in your code |
| Keep keys on the server only | Put keys in React components |

---

## 🧪 ROIC Live E2E Test

This project includes an **on-demand Playwright end-to-end test** that checks whether live ROIC data makes it all the way through the app and appears on the frontend.

This section is the detailed guide for setup, commands, artifacts, and failure categories.
Earlier sections of the README introduce where Playwright fits into the project; this section is the deeper walkthrough.

The full chain looks like this:

```text
Playwright browser
  -> React frontend
  -> Vite /api proxy
  -> Express backend
  -> ROIC external API
  -> stock card chart shown in the UI
```

This test is special because it does not only answer **"did it fail?"**
It is also designed to help answer **"which part failed?"**

### What The Live Test Does

The test uses the ticker `AAPL` and performs this exact sequence:

1. Starts the Express server automatically
2. Starts the Vite frontend automatically
3. Runs backend-only preflight checks:
   - `GET /api/health`
   - `GET /api/stocks/search?q=AAPL`
   - `GET /api/stock-prices/AAPL`
4. Opens the real frontend in a browser
5. Types `AAPL` into the navbar search box
6. Submits the search
7. Waits for the real search result row to appear
8. Clicks the real `ADD STOCK` button
9. Waits for the stock card to appear
10. Confirms the card finishes loading and shows a chart instead of an error or empty-data placeholder

### Why This Test Is Separate From Normal Checks

This test talks to the **real ROIC API**.
That means it depends on live conditions such as:

- internet access
- DNS working correctly
- a valid `ROIC_API_KEY`
- ROIC uptime
- ROIC quota or rate limits

Because of that, this is an **opt-in diagnostic test**, not something you should rely on for every quick local check.

### Files Used By The Test

Main Playwright files:

- `playwright.config.js`
- `tests/e2e/roicDiagnostics.js`
- `tests/e2e/roic-live.spec.js`

Frontend components with test hooks:

- `src/components/NavBar.jsx`
- `src/components/StockSearchResults.jsx`
- `src/components/IndivStockComponent.jsx`

### One-Time Setup

1. Install project dependencies:

   ```bash
   npm install
   ```

2. Create your `.env` file if you have not already:

   ```env
   ROIC_API_KEY=your_actual_api_key_here
   ```

3. Install the Playwright Chromium browser used by the test:

   ```bash
   npm run test:e2e:install
   ```

If PowerShell blocks `npm`, use:

```powershell
npm.cmd run test:e2e:install
```

### How To Run The Live Test

Run the standard headless version:

```bash
npm run test:e2e:roic-live
```

If you want to watch the browser while the test runs:

```bash
npm run test:e2e:roic-live:headed
```

If PowerShell blocks `npm`, use:

```powershell
npm.cmd run test:e2e:roic-live
```

or:

```powershell
npm.cmd run test:e2e:roic-live:headed
```

### Do I Need To Start The App First?

No.
Playwright starts both servers for you:

- Express on `http://127.0.0.1:3001`
- Vite on `http://127.0.0.1:4173`

It waits for those services to be reachable before the browser test begins.

### What A Passing Test Proves

A passing run proves all of these worked together:

- the frontend loaded
- the backend started
- the Vite `/api` proxy worked
- the search endpoint returned valid data
- the price endpoint returned valid data
- the external ROIC API returned usable data
- the frontend rendered that data in the stock card

### Failure Categories

The test reports a category label at the start of the failure message.
That category is meant to tell you which link in the chain is broken.

#### `frontend_boot_failed`

Meaning:
- the page shell did not render correctly

Likely causes:
- React failed during startup
- the navbar search UI did not appear
- the frontend page did not load into a usable state

#### `vite_proxy_failed`

Meaning:
- the browser did not successfully complete the expected `/api` requests through Vite

Likely causes:
- Vite did not proxy `/api` correctly
- the frontend could not reach the backend
- the browser saw non-200 API responses

#### `backend_health_failed`

Meaning:
- `/api/health` failed before the browser flow even began

Likely causes:
- Express did not start
- wrong port
- backend crash during startup

#### `backend_search_failed`

Meaning:
- `/api/stocks/search` failed or returned the wrong shape

Likely causes:
- a bug in the backend search route
- malformed JSON
- search results did not include the expected ticker

#### `backend_price_failed`

Meaning:
- `/api/stock-prices/:identifier` failed or returned the wrong shape

Likely causes:
- a bug in the backend price route
- malformed price rows
- missing `date` or numeric `close` fields

#### `external_roic_failed`

Meaning:
- the local app reached the point of calling ROIC, but the external live dependency did not provide usable data

Likely causes:
- invalid API key
- missing API key
- quota exhausted
- ROIC outage
- DNS or network failure reaching `api.roic.ai`
- ROIC returned an empty live payload

#### `frontend_render_failed`

Meaning:
- the data chain worked far enough for the UI step, but the expected stock-card state did not appear correctly

Likely causes:
- the stock card never appeared
- the card stayed stuck loading
- the card showed an error
- the chart did not appear
- the empty-data placeholder text was shown instead

### Example Failure Message

Example:

```text
[external_roic_failed] Expected search endpoint to return HTTP 200 but received 502.
Response body: {"message":"Unable to search stocks for \"AAPL\".","details":"getaddrinfo EAI_AGAIN api.roic.ai"}
```

This tells you the failure happened while trying to reach the external ROIC service, not while rendering the frontend itself.

### Test Artifacts

On failure, Playwright keeps helpful debugging artifacts such as:

- screenshot
- video
- trace zip
- preflight JSON summary

These are especially useful when the test fails on a different machine than yours.

### Manual Debugging Steps

If the live test fails, try this sequence:

1. Check that `.env` contains `ROIC_API_KEY`
2. Check that your internet connection is working
3. Start the backend manually:

   ```bash
   npm run server
   ```

4. In another terminal, test the backend routes directly:

   ```bash
   curl http://127.0.0.1:3001/api/health
   curl "http://127.0.0.1:3001/api/stocks/search?q=AAPL"
   curl http://127.0.0.1:3001/api/stock-prices/AAPL
   ```

5. If PowerShell blocks `npm`, switch to `npm.cmd`
6. If Playwright says no browser is installed, run `npm run test:e2e:install`

### Beginner Notes

- `Playwright` is a tool that opens a real browser and behaves like a user.
- `data-testid` is an attribute used to help automated tests find elements reliably.
- `preflight` means "check important backend pieces first before testing the full browser journey."

---

## 🎨 Styling

This app uses **Material-UI (MUI)** for styling.

### Inline Styles

```jsx
const navlinkStyle = {
  color: '#151d1c',
  textDecoration: 'none',
};

<NavLink style={navlinkStyle} to="/">Home</NavLink>
```

### sx Prop (MUI's CSS-in-JS)

```jsx
<Box sx={{ flexGrow: 1, backgroundColor: 'red' }}>
```

- `sx` = MUI's way of writing CSS directly in JSX
- Supports responsive values: `sx={{ display: { xs: 'none', sm: 'block' } }}`

### Styled Components

```jsx
const Search = styled('form')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
}));
```

- `styled()` = creates a component with custom CSS
- `theme` = MUI's design tokens (colors, spacing, fonts)

---

## 📝 Common Tasks for Beginners

### Adding a New Page

1. **Create the page component** in `src/pages/`:

   ```jsx
   // src/pages/About.jsx
   export default function About() {
     return <h1>About Us</h1>;
   }
   ```

2. **Add the route** in `src/approutes/AppRoutes.jsx`:

   ```jsx
   import About from '../pages/About';

   <Route path="/about" element={<About />} />
   ```

3. **Add a nav link** in `src/components/NavBar.jsx`:

   ```jsx
   <MenuItem onClick={handleMenuClose}>
     <NavLink style={navlinkStyle} to="/about">About</NavLink>
   </MenuItem>
   ```

---

### Adding a New Component

1. **Create the file** in `src/components/`:

   ```jsx
   // src/components/MyComponent.jsx
   export default function MyComponent() {
     return <div>Hello!</div>;
   }
   ```

2. **Import and use it** in another component:

   ```jsx
   import MyComponent from './components/MyComponent';

   <MyComponent />
   ```

---

### Changing the Color Scheme

The main color is in `NavBar.jsx`:

```jsx
<AppBar position="static" sx={{ backgroundColor: '#4a148c' }}>
```

Change `#4a148c` (purple) to any hex color.

---

### Adding a New Stock to Defaults

File: `src/dataset/stockCatalog.js`

```jsx
export const defaultStocks = ['AAPL', 'MSFT', 'NVDA', 'TSLA', 'GOOGL'];
```

Add any ticker symbol to this array.

When the page first loads, the app rebuilds the visible stock list in this order:

1. Saved user-added stocks from `localStorage`
2. Default starter stocks from `stockCatalog.js` that are not already in the saved list

This keeps the refresh behavior consistent with normal app use, where newly added stocks appear first.

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm: command not found` | Install Node.js from [nodejs.org](https://nodejs.org/) |
| Port 5173 already in use | Run `npm run dev -- --port 3000` |
| Port 3001 already in use | Change `PORT` in `server.js` |
| API requests failing | Check that `server.js` is running |
| React page loads, but `/api` calls fail | Make sure both `npm run server` and `npm run dev` are running in separate terminals |
| Browser shows a CORS error | Check that React is calling `/api/...` and not calling ROIC directly |
| `/api` request says connection refused or cannot connect | Vite is running, but the Express server on port `3001` is not running |
| "Invalid API key" error | Verify your `.env` file has the correct key |
| Search returns nothing | Check the ROIC.ai API quota or search term |
| Charts not showing | Ensure stock has price data available |
| `playwright: command not found` or browser missing | Run `npm run test:e2e:install` to install the Playwright Chromium browser |
| PowerShell blocks `npm` scripts | Use `npm.cmd run ...` instead of `npm run ...` |
| Live E2E test fails with `external_roic_failed` | The local app likely reached ROIC, but the external dependency failed; see the failure category guide in [ROIC Live E2E Test](#-roic-live-e2e-test) |
| Live E2E test fails with `vite_proxy_failed` | The browser likely could not complete the expected `/api` calls through Vite; see the failure category guide in [ROIC Live E2E Test](#-roic-live-e2e-test) |

---

## 📚 Learn More

### React

- [React Official Docs](https://react.dev/)
- [React Hooks Explained](https://react.dev/learn/managing-state)

### Material-UI

- [MUI Documentation](https://mui.com/)
- [MUI X Charts](https://mui.com/x/react-charts/)

### React Router

- [React Router Docs](https://reactrouter.com/)

### Express

- [Express Quick Start](https://expressjs.com/en/starter/installing.html)

### Playwright

- [Playwright Documentation](https://playwright.dev/)

### ROIC.ai API

- [API Documentation](https://roic.ai/docs)

---


