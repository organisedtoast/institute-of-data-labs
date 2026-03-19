import React, { useState } from 'react';
import useDataReducer from '../hooks/useDataReducer';

const currencies = ['USD', 'AUD', 'NZD', 'GBP', 'EUR', 'SGD'];

// EXERCISE 2ext: Declare a functional component called BitcoinRates2reducer
function BitcoinRates2reducer() {
  const [currency, setCurrency] = useState(currencies[0]);
  
  // change the hook used to useDataReducer 
  const { exchangeRate, loading, error } = useDataReducer('bitcoin', currency);

  const options = currencies.map(curr => (
    <option value={curr} key={curr}>
      {curr}
    </option>
  ));

  return (
    <div className="BitcoinRates componentBox">
      <h3>Man Utd Bitcoin Exchange Rate Exercise 2ext: links to useDataReducer hook which adds useReducer to handle internal state management</h3>
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

export default BitcoinRates2reducer;
