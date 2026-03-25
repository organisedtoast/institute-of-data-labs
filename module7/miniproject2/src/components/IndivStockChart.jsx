// Import LineChart component from MUI X Charts library
// This is a pre-built chart component that makes it easy to create line charts
import { LineChart } from '@mui/x-charts/LineChart';

// Import data and formatter functions from the dataset file
// SharePrice: array of objects containing date and share price data
// dateAxisFormatter: function to format dates on the x-axis
// priceFormatter: function to format values as plain numbers on the y-axis
import {
  dateAxisFormatter,
  priceFormatter,
  SharePrice,
} from '../dataset/SharePrice';

// xAxis configuration array - defines how the horizontal axis (x-axis) behaves
// Each object in the array configures one axis
const xAxis = [
  {
    // dataKey: specifies which property from the dataset to use for this axis
    // In our case, each data object has a 'date' property
    dataKey: 'date',

    // scaleType: 'point' treats the data as categorical points
    // Works with string date values like "2020-01-01"
    scaleType: 'point',

    // valueFormatter: function that formats how the dates appear on the axis
    // Uses dateAxisFormatter to show "Jan 2020" instead of raw date strings
    valueFormatter: dateAxisFormatter,
  },
];

// yAxis configuration array - defines how the vertical axis (y-axis) behaves
const yAxis = [
  {
    // valueFormatter: function that formats the numbers on the y-axis
    // Uses priceFormatter to show plain numeric values like "36.00"
    valueFormatter: priceFormatter,

    // Keep the y-axis labels compact and readable.
    tickLabelStyle: {
      fontSize: 11,
    },
  },
];

// series configuration array - defines the lines/series to plot on the chart
// Each object in the array creates one line on the chart
const series = [
  {
    // dataKey: specifies which property from the dataset to plot as a line
    // In our case, each data object has a 'close' property (share price)
    dataKey: 'close',

    // showMark: false hides the individual data point circles on the line
    // Set to true if you want to see a dot at each data point
    showMark: false,

    // valueFormatter: formats the value shown in tooltips when hovering over the line
    valueFormatter: priceFormatter,
  },
];

// IndivStockChart component - renders a line chart showing share price over time
export default function IndivStockChart() {
  return (
    // LineChart component with all configuration props:
    <LineChart
      // dataset: the array of data objects to visualize
      // Each object should have properties matching the dataKeys in xAxis and series
      dataset={SharePrice}

      // xAxis: pass the x-axis configuration array defined above
      xAxis={xAxis}

      // yAxis: pass the y-axis configuration array defined above
      yAxis={yAxis}

      // series: pass the series configuration array defined above
      series={series}

      // height: the height of the chart in pixels
      height={360}

      // Keep extra left padding so wider y-axis labels are fully visible.
      margin={{ top: 16, right: 16, left: 80 }}

      // grid: configuration for the chart grid lines
      // vertical: true shows vertical grid lines
      // horizontal: true shows horizontal grid lines
      grid={{ vertical: true, horizontal: true }}
    />
  );
}
