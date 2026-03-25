// Import LineChart component from MUI X Charts library
// This is a pre-built chart component that makes it easy to create line charts
import { LineChart } from '@mui/x-charts/LineChart';

// Import data and formatter functions from the dataset file
// usUnemploymentRate: array of objects containing date and unemployment rate data
// dateAxisFormatter: function to format dates on the x-axis
// percentageFormatter: function to format values as percentages on the y-axis
import {
  dateAxisFormatter,
  percentageFormatter,
  usUnemploymentRate,
} from '../dataset/usUnemploymentRate';

// xAxis configuration array - defines how the horizontal axis (x-axis) behaves
// Each object in the array configures one axis
const xAxis = [
  {
    // dataKey: specifies which property from the dataset to use for this axis
    // In our case, each data object has a 'date' property
    dataKey: 'date',
    
    // scaleType: 'time' tells the chart to treat this data as dates/times
    // This enables proper spacing between dates on the axis
    scaleType: 'time',
    
    // valueFormatter: function that formats how the dates appear on the axis
    // Uses dateAxisFormatter to show "Jan 2020" instead of raw date objects
    valueFormatter: dateAxisFormatter,
  },
];

// yAxis configuration array - defines how the vertical axis (y-axis) behaves
const yAxis = [
  {
    // valueFormatter: function that formats the numbers on the y-axis
    // Uses percentageFormatter to show "3.6%" instead of "0.036"
    valueFormatter: percentageFormatter,
  },
];

// series configuration array - defines the lines/series to plot on the chart
// Each object in the array creates one line on the chart
const series = [
  {
    // dataKey: specifies which property from the dataset to plot as a line
    // In our case, each data object has a 'rate' property (unemployment rate)
    dataKey: 'rate',
    
    // showMark: false hides the individual data point circles on the line
    // Set to true if you want to see a dot at each data point
    showMark: false,
    
    // valueFormatter: formats the value shown in tooltips when hovering over the line
    valueFormatter: percentageFormatter,
  },
];

// SectorChart component - renders a line chart showing unemployment rate over time
export default function SectorChart() {
  return (
    // LineChart component with all configuration props:
    <LineChart
      // dataset: the array of data objects to visualize
      // Each object should have properties matching the dataKeys in xAxis and series
      dataset={usUnemploymentRate}
      
      // xAxis: pass the x-axis configuration array defined above
      xAxis={xAxis}
      
      // yAxis: pass the y-axis configuration array defined above
      yAxis={yAxis}
      
      // series: pass the series configuration array defined above
      series={series}
      
      // height: the height of the chart in pixels
      height={300}
      
      // grid: configuration for the chart grid lines
      // vertical: true shows vertical grid lines
      // horizontal: true shows horizontal grid lines
      grid={{ vertical: true, horizontal: true }}
    />
  );
}