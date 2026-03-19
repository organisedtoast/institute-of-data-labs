
import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch cryptocurrency prices from CoinGecko API
 * @param {string} coinId - The CoinGecko ID of the cryptocurrency (e.g., 'bitcoin')
 * @param {string} vsCurrency - The target currency code (e.g., 'USD', 'EUR')
 * @returns {Object} Object containing exchangeRate, loading and error states
 */


// Declare a custom hook called useData that takes in two parameters: coinId and vsCurrency.
function useData(coinId, vsCurrency) {

// Declare state variables for exchange rate, loading status, and error handling
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Use the useEffect hook to fetch the exchange rate whenever the coinId or vsCurrency changes.
  // The useEffect hook is used to perform side effects in functional components.
  // Without it, the component would not know when to fetch new data based on changes in the selected currency.
  // The dependency array [coinId, vsCurrency] ensures that the effect runs whenever the coinId or vsCurrency changes.
  
  // setLoading(true) = this indicates that the data is currently being fetched, which can be used to show a loading indicator in the UI
  // setError(null) = this resets any previous error state before making a new API call, ensuring that old errors don't persist when trying to fetch new data
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Create an AbortController for cleanup to prevent memory leaks and avoid setting state on an unmounted component if the user changes the currency or coin before the fetch completes.
    const controller = new AbortController();
    const { signal } = controller;


    // Create a fetch call to the CoinGecko API to retrieve the current price of the specified cryptocurrency in the selected currency.
    // Using the proxy path '/api' instead of the full URL to avoid CORS issues
    
    // Use a .then() method is used to handle the response from the fetch call. It checks if the response is successful (response.ok) and then parses the JSON data. 
      // If the response is not successful, it throws an error with the HTTP status code.
    fetch(`/api/simple/price?ids=${coinId}&vs_currencies=${vsCurrency}`, { signal })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })

      // Use a second .then() method to process the parsed JSON data.
      // It checks if the fetch request was not aborted and then updates the exchangeRate state with the fetched price.
      // If the price is not available, it sets exchangeRate to null. 
      // Finally, it sets loading to false to indicate that the data fetching is complete.
      .then(data => {
        if (!signal.aborted) {
          setExchangeRate(data[coinId]?.[vsCurrency.toLowerCase()] ?? null);
          setLoading(false);
        }
      })

      // Use the .catch() method to handle any errors that occur during the fetch call. It checks if the error is not due to an aborted request and then logs the error and updates the error state with a user-friendly message. It also sets loading to false since the fetch attempt has concluded, even though it failed.
      .catch(err => {
        if (!signal.aborted && err.name !== 'AbortError') {
          console.error('Error fetching price from CoinGecko:', err);
          setError('Failed to fetch price. Please try again.');
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [coinId, vsCurrency]);

  return { exchangeRate, loading, error };
}

export default useData;
