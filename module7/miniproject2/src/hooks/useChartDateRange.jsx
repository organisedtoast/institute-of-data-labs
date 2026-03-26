import { useCallback, useMemo, useState } from 'react';

import {
  compareMonthStrings,
  getMonthBoundsFromData,
} from '../dataset/SharePrice';

// This custom hook keeps all month-range state in one reusable place.
// Any chart can use it to remember:
// - the currently selected start month
// - the currently selected end month
// - the earliest month available in the dataset
// - the latest month available in the dataset
//
// Keeping this logic in a hook is helpful because both the stock cards and the sector chart
// need the same behaviour, and we only want to teach this once in the codebase.
export default function useChartDateRange() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minAvailableMonth, setMinAvailableMonth] = useState('');
  const [maxAvailableMonth, setMaxAvailableMonth] = useState('');

  // This helper reads a dataset and stores the full month range available in it.
  // We also set the selected start/end months to those bounds so the default chart
  // view always shows all available data.
  const initializeRangeFromData = useCallback((dataRows = []) => {
    const { earliestMonth, latestMonth } = getMonthBoundsFromData(dataRows);

    setMinAvailableMonth(earliestMonth);
    setMaxAvailableMonth(latestMonth);
    setStartDate(earliestMonth);
    setEndDate(latestMonth);
  }, []);

  // Resetting the selection back to the full available range is useful when the user
  // wants to undo their custom filters without reloading the page.
  const resetToAvailableRange = useCallback(() => {
    setStartDate(minAvailableMonth);
    setEndDate(maxAvailableMonth);
  }, [minAvailableMonth, maxAvailableMonth]);

  // This derived value tells components whether both dates are in a valid order.
  // We only treat the range as invalid when both dates exist and the start comes after the end.
  const isRangeValid = useMemo(() => {
    if (!startDate || !endDate) {
      return true;
    }

    return compareMonthStrings(startDate, endDate) <= 0;
  }, [endDate, startDate]);

  const hasAvailableRange = useMemo(() => {
    return Boolean(minAvailableMonth && maxAvailableMonth);
  }, [maxAvailableMonth, minAvailableMonth]);

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    minAvailableMonth,
    maxAvailableMonth,
    hasAvailableRange,
    isRangeValid,
    initializeRangeFromData,
    resetToAvailableRange,
  };
}
