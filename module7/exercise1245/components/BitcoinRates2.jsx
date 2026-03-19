import React, { useState } from 'react';

// Import the custom useData hook to handle API fetching logic
import useData from '../hooks/useData';

// Declare a constant array called currencies that contains the following currency codes:
// 'USD', 'AUD', 'NZD', 'GBP', 'EUR', 'SGD'.
const currencies = ['USD', 'AUD', 'NZD', 'GBP', 'EUR', 'SGD'];

// Declare a functional component called BitcoinRates2
// This uses the useState hook to manage the selected currency state.
// The component should fetch the current exchange rate of Bitcoin in the selected currency from
// the CoinGecko API
function BitcoinRates2() {
  // useState to manage the selected currency from the dropdown
  const [currency, setCurrency] = useState(currencies[0]);

  // EXERCISE 2: Use the custom useData hook to fetch Bitcoin price data
  // Pass 'bitcoin' as the coinId and the selected currency as vsCurrency
  // The hook returns exchangeRate, loading, and error states
  const { exchangeRate, loading, error } = useData('bitcoin', currency);


  // declare a variable called options that maps over the currencies array
  // and returns an array of <option> elements for each currency.
  // Each option should have a value and key equal to the currency code,
  // and display the currency code as its text content.
  const options = currencies.map(curr => (
    <option value={curr} key={curr}>
      {curr}
    </option>
  ));

  // Finally, the component should render a <div> with the class name "BitcoinRates componentBox".
  // Inside this div, there should be an <h3> element with the text "Bitcoin Exchange Rate".
  // Below the heading, there should be a <label> element that contains a dropdown <select>
  // for choosing the currency. The select should have an onChange handler that updates the selected currency state.
  return (
    <div className="BitcoinRates componentBox">
      <h3>Man Utd Bitcoin Exchange Rate - useState in main component, with custom useData hook containing useEffect</h3>
      <label>
        Choose currency:
        <select
          value={currency}
          onChange={e => setCurrency(e.target.value)}
        >
          {options}
        </select>
      </label>

      {/* Display error message if there was an error fetching data */}
      {error && <p className="error">{error}</p>}

      {/* Display the exchange rate here */}
      {/* This is done by conditionally rendering the exchange rate. */}
      {/* If exchangeRate is not null, it displays the exchange rate with thousands separator followed by the currency code. */}
      {/* If exchangeRate is null (which means the data is still being fetched), it displays "Loading...". */}
      <div className="exchange-rate-display">
        {!loading && exchangeRate !== null
          ? `${Number(exchangeRate).toLocaleString(undefined, { maximumFractionDigits: 2 })} ${currency}`
          : 'Loading...'
        }
      </div>

    </div>
  );
}


// Export the BitcoinRates component as the default export of the module.
export default BitcoinRates2;
// make sure to change the export name back to BitcoinRates if you want to use this component in App.jsx
