// This file now contains helper functions instead of hard-coded sample data.
// The goal is to keep data formatting logic in one place so our components stay easier to read.

// Convert daily stock-price rows into monthly chart points.
// ROIC returns one row per trading day, but our chart only needs one point per month.
// To keep the chart intuitive, we store the LAST available closing price we see for each month.
export const convertDailyPricesToMonthlyPrices = (dailyPrices = []) => {
  // Guard against invalid input so the rest of the app does not crash.
  if (!Array.isArray(dailyPrices)) {
    return [];
  }

  // A Map is useful here because it lets us store one entry per month.
  // The key will be a string like "2024-01" and the value will be the chart point for that month.
  const monthlyPriceMap = new Map();

  // Loop through every daily price row from the API.
  dailyPrices.forEach((priceRow) => {
    // Skip rows that do not have the minimum data our chart needs.
    if (!priceRow?.date || typeof priceRow.close !== 'number') {
      return;
    }

    // Slice the date so "2024-01-31" becomes "2024-01".
    // That gives us one grouping key per month.
    const monthKey = priceRow.date.slice(0, 7);

    // Because the data is requested in ascending order, each new row for the same month
    // naturally replaces the previous one. That means the final stored row is the last
    // available trading day for that month.
    monthlyPriceMap.set(monthKey, {
      date: priceRow.date,
      close: priceRow.close,
    });
  });

  // Convert the Map values back into a plain array so the chart component can use them.
  return Array.from(monthlyPriceMap.values());
};

// Format date labels on the chart x-axis into a beginner-friendly format.
// Example: "2024-01-31" becomes "Jan 2024".
export const dateAxisFormatter = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
};

// Format stock prices to always show two decimal places.
// Example: 123.4 becomes "123.40".
export const priceFormatter = (value) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
