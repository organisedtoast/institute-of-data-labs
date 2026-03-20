import React, { useState } from 'react';

// Import the custom useData hook to handle API fetching logic
import useData from '../hooks/useData';

const currencies = ['USD', 'AUD', 'NZD', 'GBP', 'EUR', 'SGD'];

// Declare a functional component called BitcoinRates2
function BitcoinRates2() {

  const [currency, setCurrency] = useState(currencies[0]);

  // EXERCISE 2: Use the custom useData hook to fetch Bitcoin price data
  // Pass 'bitcoin' as the coinId and the selected currency as vsCurrency
  // The hook returns exchangeRate, loading, and error states
  const { exchangeRate, loading, error } = useData('bitcoin', currency);



  const options = currencies.map(curr => (
    <option value={curr} key={curr}>
      {curr}
    </option>
  ));

  // Render the component UI

  return (
    <div className="BitcoinRates componentBox">
      <h3>Man Utd Bitcoin Exchange Rate Exercise 2: useState in main component, with custom useData hook containing useEffect</h3>
      <label>
        Choose currency:
        <select
          value={currency}
          onChange={e => setCurrency(e.target.value)}
        >
          {options}
        </select>
      </label>

     
      {error && <p className="error">{error}</p>}

            <div className="exchange-rate-display">
        {!loading && exchangeRate !== null
          ? `${Number(exchangeRate).toLocaleString(undefined, { maximumFractionDigits: 2 })} ${currency}`
          : 'Loading...'
        }
      </div>

    </div>
  );
}


// Export the BitcoinRates2 component as the default export of the module.
export default BitcoinRates2;
