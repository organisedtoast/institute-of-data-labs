import React, { useState, useEffect } from 'react';


// Declare a constant array called currencies that contains the following currency codes: 
// 'USD', 'AUD', 'NZD', 'GBP', 'EUR', 'SGD'.
const currencies = ['USD', 'AUD', 'NZD', 'GBP', 'EUR', 'SGD'];

// Declare a functional component called BitcoinRates 
// This uses the useState hook to manage the selected currency state.
// The component should fetch the current exchange rate of Bitcoin in the selected currency from 
// the CoinGecko API
function BitcoinRates() {
  const [currency, setCurrency] = useState(currencies[0]);
      
    // Declare a state variable called exchangeRate to store the fetched exchange rate.
        const [exchangeRate, setExchangeRate] = useState(null);

  // Declare state variables for error handling
  const [error, setError] = useState(null);

  // Use the useEffect hook to fetch the exchange rate whenever the selected currency changes.
  // The useEffect hook is used to perform side effects in functional components.
  // Without it, the component would not know when to fetch new data based on changes in the selected currency.
  useEffect(() => {
    // Reset error state when currency changes
    setError(null);
    
    // Create an AbortController for cleanup
    const controller = new AbortController();
    const { signal } = controller;

    // The below fetch call retrieves the current price of Bitcoin in the selected currency from the CoinGecko API.
    // Using the proxy path '/api' instead of the full URL to avoid CORS issues
    fetch(`/api/simple/price?ids=bitcoin&vs_currencies=${currency}`, { signal })
      .then(response => {
        console.log('API Response:', response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Only update state if the component is still mounted and request wasn't aborted
        if (!signal.aborted) {
          setExchangeRate(data.bitcoin[currency.toLowerCase()]);
        }
      })
      .catch(error => {
        // Only set error if the component is still mounted and request wasn't aborted
        if (!signal.aborted && error.name !== 'AbortError') {
          console.error('Error fetching Bitcoin price:', error);
          setError('Failed to fetch Bitcoin price. Please try again.');
        }
      });

    // Cleanup function to abort the fetch request if the component unmounts or currency changes
    return () => {
      controller.abort();
    };
  }, [currency]); // The dependency array [currency] ensures that the effect runs whenever the selected currency changes.


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
      <h3>Man Utd Bitcoin Exchange Rate - useState useEffect in 1 component</h3>
      <label>
        Choose currency:
        <select 
          value={currency} 
          onChange={e => setCurrency(e.target.value)}
        >
          {options}
        </select>
      </label>

         {/* Display the exchange rate here */}
         {/* This is done by conditionally rendering the exchange rate. */}
         {/* If exchangeRate is not null, it displays the exchange rate with thousands separator followed by the currency code. */}
         {/* If exchangeRate is null (which means the data is still being fetched), it displays "Loading...". */}
         <div className="exchange-rate-display">
           {exchangeRate !== null 
             ? `${Number(exchangeRate).toLocaleString(undefined, { maximumFractionDigits: 2 })} ${currency}` 
             : 'Loading...'
           } 
         </div>

    </div>
  );
}





// Export the BitcoinRates component as the default export of the module.
export default BitcoinRates;
// make sure to change the export name back to BitcoinRates if you want to use this component in App.jsx

