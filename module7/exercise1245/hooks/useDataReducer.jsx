import { useEffect, useReducer } from 'react';

// This object stores the starting values for our reducer-managed state.
// We begin in a loading state because the hook should fetch data as soon as it runs.
const initialState = {
  exchangeRate: null,
  loading: true,
  error: null,
};

// The reducer is a normal JavaScript function.
// Its job is to decide how state should change based on the action we dispatch.
function dataReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      // When a new request begins, we show loading again and clear any old error.
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'FETCH_SUCCESS':
      // When the request succeeds, we store the result and mark loading as finished.
      return {
        exchangeRate: action.payload,
        loading: false,
        error: null,
      };

    case 'FETCH_ERROR':
      // When the request fails, we keep the error message and stop loading.
      return {
        exchangeRate: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

/**
 * Custom hook to fetch cryptocurrency prices using one reducer-managed state object
 * @param {string} coinId - The CoinGecko ID of the cryptocurrency (for example: 'bitcoin')
 * @param {string} vsCurrency - The target currency code (for example: 'USD' or 'EUR')
 * @returns {Object} Object containing exchangeRate, loading and error values
 */

// declare a custom hook called useDataReducer that takes in two parameters: coinId and vsCurrency.
function useDataReducer(coinId, vsCurrency) {

  // declare a state variable called state and a dispatch function using the useReducer hook.
  // The useReducer hook takes in the dataReducer function and the initialState object as arguments.
  // The state variable will hold the current state of our data fetching logic, including the exchange rate, loading status, and any error messages.
  // The dispatch function is used to send actions to the reducer to update the state based on the type of action dispatched (e.g., 'FETCH_START', 'FETCH_SUCCESS', 'FETCH_ERROR').
  const [state, dispatch] = useReducer(dataReducer, initialState);


  // use the useEffect hook to perform the data fetching side effect whenever the coinId or vsCurrency changes.
  useEffect(() => {
 

    // When the effect runs, we first dispatch a 'FETCH_START' action to indicate that a new data fetch is starting. 
    // This sets loading to true and clears any previous error.
    dispatch({ type: 'FETCH_START' });

    const controller = new AbortController();
    const { signal } = controller;

    fetch(`/api/simple/price?ids=${coinId}&vs_currencies=${vsCurrency}`, { signal })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
      // If the fetch request was not aborted, we extract the exchange rate from the response data.
      
        if (!signal.aborted) {
          const rate = data[coinId]?.[vsCurrency.toLowerCase()] ?? null;

          // We then dispatch a 'FETCH_SUCCESS' action with the fetched exchange rate as the payload
          // This updates the state to store the new exchange rate and mark loading as false.
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: rate,
          });
        }
      })
      .catch(err => {
        
        if (!signal.aborted && err.name !== 'AbortError') {
          console.error('Error fetching price from CoinGecko:', err);
          
          // If there was an error (and it wasn't due to the fetch being aborted), 
          // we dispatch a 'FETCH_ERROR' action with an error message as the payload.
          dispatch({
            type: 'FETCH_ERROR',
            payload: 'Failed to fetch price. Please try again.',
          });
        }
      });

    // Cleanup runs before the next effect and when the component unmounts.
    return () => {
      controller.abort();
    };
  }, [coinId, vsCurrency]);

  // We return one state object that already contains:
  // when loading finished, what the result was, and whether an error occurred.
  return state;
}

export default useDataReducer;
