// Note: comments here relate to Exercise 2ext only

// The useDataReducer hook is an alternative implementation of the useData hook

// useData hook used useState to manage 3 separate pieces of state: exchangeRate, loading and error.
// In contrast, useDataReducer uses the useReducer hook to manage all 3 pieces of state together in a single state object. 
// This can make the code more organized and easier to manage, especially as the complexity of the state logic increases.

// The useData hook is is used in BitcoinRates2.jsx
// The useDataReducer hook is used by BitcoinRates2reducer.jsx


import { useEffect, useReducer } from 'react';

// EXERCISE 2ext: This object stores the starting values for our reducer-managed state.
// We begin in a loading state because the hook should fetch data as soon as it runs.
const initialState = {
  exchangeRate: null,
  loading: true,
  error: null,
};

// Declare a reducer function called dataReducer that takes in the current state and an action as parameters.
// The reducer function is just a native hook to React that takes in a current state.
// Its job is to decide how that state should change based on the action we dispatch.


function dataReducer(state, action) {

  // The reducer function uses a switch statement to handle different action types.
  switch (action.type) 
    
  {
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


      // The default case is important to return the current state if an unknown action type is dispatched.
    default:
      return state;
  }
}

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
      
    // Use a second .then() method (as per useData.jsx) to process the parsed JSON data, except instead of setting state directly,
    // we dispatch a 'FETCH_SUCCESS' action with the fetched exchange rate as the payload.
    

      .then(data => {  
        if (!signal.aborted) {
          
        // define a variable called rate that extracts the exchange rate from the fetched data using optional chaining and nullish coalescing
        // to handle cases where the data might not be available.
          const rate = data[coinId]?.[vsCurrency.toLowerCase()] ?? null;

          // We dispatch a 'FETCH_SUCCESS' action with the fetched exchange rate as the payload.
          // dispatch is a native function to reducers that sends an action object to the reducer function, which then updates the state based on the action type and payload.          
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
