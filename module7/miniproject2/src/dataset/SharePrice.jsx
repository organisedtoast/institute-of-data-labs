// Sample share price data for the chart
// This JS array of objects contains monthly share prices from 2020-2023

export const SharePrice = [
  { date: "2020-01-01", close: 36.00 },
  { date: "2020-02-01", close: 35.00 },
  { date: "2020-03-01", close: 44.00 },
  { date: "2020-04-01", close: 147.00 },
  { date: "2020-05-01", close: 133.00 },
  { date: "2020-06-01", close: 111.00 },
  { date: "2020-07-01", close: 102.00 },
  { date: "2020-08-01", close: 84.00 },
  { date: "2020-09-01", close: 79.00 },
  { date: "2020-10-01", close: 69.00 },
  { date: "2020-11-01", close: 67.00 },
  { date: "2020-12-01", close: 67.00 },
  { date: "2021-01-01", close: 63.00 },
  { date: "2021-02-01", close: 62.00 },
  { date: "2021-03-01", close: 60.00 },
  { date: "2021-04-01", close: 58.00 },
  { date: "2021-05-01", close: 58.00 },
  { date: "2021-06-01", close: 59.00 },
  { date: "2021-07-01", close: 54.00 },
  { date: "2021-08-01", close: 52.00 },
  { date: "2021-09-01", close: 48.00 },
  { date: "2021-10-01", close: 46.00 },
  { date: "2021-11-01", close: 42.00 },
  { date: "2021-12-01", close: 39.00 },
  { date: "2022-01-01", close: 40.00 },
  { date: "2022-02-01", close: 38.00 },
  { date: "2022-03-01", close: 36.00 },
  { date: "2022-04-01", close: 36.00 },
  { date: "2022-05-01", close: 36.00 },
  { date: "2022-06-01", close: 36.00 },
  { date: "2022-07-01", close: 35.00 },
  { date: "2022-08-01", close: 37.00 },
  { date: "2022-09-01", close: 35.00 },
  { date: "2022-10-01", close: 37.00 },
  { date: "2022-11-01", close: 37.00 },
  { date: "2022-12-01", close: 35.00 },
  { date: "2023-01-01", close: 34.00 },
  { date: "2023-02-01", close: 36.00 },
  { date: "2023-03-01", close: 35.00 },
  { date: "2023-04-01", close: 34.00 },
];

// Formatter for date axis - displays dates in a readable format (e.g., "Jan 2020")
export const dateAxisFormatter = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
};

// Formatter for price values - displays as plain numbers (e.g., 36.00)
export const priceFormatter = (value) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
