// Sample US unemployment rate data for the chart
// This dataset contains monthly unemployment rates from 2020-2023
export const usUnemploymentRate = [
  { date: new Date(2020, 0, 1), rate: 0.036 },
  { date: new Date(2020, 1, 1), rate: 0.035 },
  { date: new Date(2020, 2, 1), rate: 0.044 },
  { date: new Date(2020, 3, 1), rate: 0.147 },
  { date: new Date(2020, 4, 1), rate: 0.133 },
  { date: new Date(2020, 5, 1), rate: 0.111 },
  { date: new Date(2020, 6, 1), rate: 0.102 },
  { date: new Date(2020, 7, 1), rate: 0.084 },
  { date: new Date(2020, 8, 1), rate: 0.079 },
  { date: new Date(2020, 9, 1), rate: 0.069 },
  { date: new Date(2020, 10, 1), rate: 0.067 },
  { date: new Date(2020, 11, 1), rate: 0.067 },
  { date: new Date(2021, 0, 1), rate: 0.063 },
  { date: new Date(2021, 1, 1), rate: 0.062 },
  { date: new Date(2021, 2, 1), rate: 0.060 },
  { date: new Date(2021, 3, 1), rate: 0.058 },
  { date: new Date(2021, 4, 1), rate: 0.058 },
  { date: new Date(2021, 5, 1), rate: 0.059 },
  { date: new Date(2021, 6, 1), rate: 0.054 },
  { date: new Date(2021, 7, 1), rate: 0.052 },
  { date: new Date(2021, 8, 1), rate: 0.048 },
  { date: new Date(2021, 9, 1), rate: 0.046 },
  { date: new Date(2021, 10, 1), rate: 0.042 },
  { date: new Date(2021, 11, 1), rate: 0.039 },
  { date: new Date(2022, 0, 1), rate: 0.040 },
  { date: new Date(2022, 1, 1), rate: 0.038 },
  { date: new Date(2022, 2, 1), rate: 0.036 },
  { date: new Date(2022, 3, 1), rate: 0.036 },
  { date: new Date(2022, 4, 1), rate: 0.036 },
  { date: new Date(2022, 5, 1), rate: 0.036 },
  { date: new Date(2022, 6, 1), rate: 0.035 },
  { date: new Date(2022, 7, 1), rate: 0.037 },
  { date: new Date(2022, 8, 1), rate: 0.035 },
  { date: new Date(2022, 9, 1), rate: 0.037 },
  { date: new Date(2022, 10, 1), rate: 0.037 },
  { date: new Date(2022, 11, 1), rate: 0.035 },
  { date: new Date(2023, 0, 1), rate: 0.034 },
  { date: new Date(2023, 1, 1), rate: 0.036 },
  { date: new Date(2023, 2, 1), rate: 0.035 },
  { date: new Date(2023, 3, 1), rate: 0.034 },
];

// Formatter for date axis - displays dates in a readable format (e.g., "Jan 2020")
export const dateAxisFormatter = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date);
};

// Formatter for percentage values - displays decimals as percentages (e.g., 0.036 -> "3.6%")
export const percentageFormatter = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
};
