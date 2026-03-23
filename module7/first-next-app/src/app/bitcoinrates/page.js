// this code was copied from institute-of-data-labs\module7\exercise12345\components\BitcoinRates2reducer.jsx

// I added 'use client' at the top to make it work in Next.js 13 app directory
 
// I also updated the import paths for useDataReducer custom hook and Emoji component.


'use client';

import React, { useState } from 'react';
import useDataReducer from '../../hooks/useDataReducer';
import Emoji from '../../components/Emoji';

const currencies = ['USD', 'AUD', 'NZD', 'GBP', 'EUR', 'SGD'];

function BitcoinRates() {
  const [currency, setCurrency] = useState(currencies[0]);
  
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

      <Emoji />

    </div>
  );
}

export default BitcoinRates;
