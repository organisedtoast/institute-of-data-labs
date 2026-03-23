// copied from institute-of-data-labs\module7\exercise12345\hooks\useDataReducer.jsx

// I added 'use client' at the top to make it work in Next.js 13 app directory

// This code defines a custom React hook called `useDataReducer` that manages the state of fetching
// crypto exchange rates using the `useReducer` hook.

'use client';

import { useEffect, useReducer } from 'react';

const initialState = {
  exchangeRate: null,
  loading: true,
  error: null,
};

function dataReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'FETCH_SUCCESS':
      return {
        exchangeRate: action.payload,
        loading: false,
        error: null,
      };

    case 'FETCH_ERROR':
      return {
        exchangeRate: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

function useDataReducer(coinId, vsCurrency) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'FETCH_START' });

    const controller = new AbortController();
    const { signal } = controller;

    fetch(`/api/coingecko?ids=${coinId}&vs_currencies=${vsCurrency}`, { 
      signal,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (!signal.aborted) {
          const rate = data[coinId]?.[vsCurrency.toLowerCase()] ?? null;
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: rate,
          });
        }
      })
      .catch(err => {
        if (!signal.aborted && err.name !== 'AbortError') {
          console.error('Error fetching price from CoinGecko:', err);
          dispatch({
            type: 'FETCH_ERROR',
            payload: 'Failed to fetch price. Please try again.',
          });
        }
      });

    return () => {
      controller.abort();
    };
  }, [coinId, vsCurrency]);

  return state;
}

export default useDataReducer;
