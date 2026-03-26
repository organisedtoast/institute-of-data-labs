import { LineChart } from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Import the helper functions that format dates and prices for the chart.
// These helpers live in a separate file so they can be reused and kept easy to test.
import {
  dateAxisFormatter,
  priceFormatter,
} from '../dataset/SharePrice';

// This component receives chart data from its parent through props.
// A "prop" is just a value passed from one React component into another.
export default function IndivStockChart({ data }) {
  // If there is no chart data yet, show a helpful placeholder instead of an empty chart.
  if (!data || data.length === 0) {
    return (
      <Box
        sx={{
          minHeight: 360,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          No chart data is available for this stock yet.
        </Typography>
      </Box>
    );
  }

  // xAxis controls how the horizontal axis reads values from the dataset.
  // `dataKey: 'date'` means the chart should read the `date` property from each object in `data`.
  const xAxis = [
    {
      dataKey: 'date',
      scaleType: 'point',
      valueFormatter: dateAxisFormatter,
    },
  ];

  // yAxis controls how the vertical price labels are displayed.
  const yAxis = [
    {
      valueFormatter: priceFormatter,
      tickLabelStyle: {
        fontSize: 11,
      },
    },
  ];

  // series tells the chart which numeric value to plot as the line.
  // `dataKey: 'close'` means it will use the `close` field from each chart point.
  const series = [
    {
      dataKey: 'close',
      showMark: false,
      valueFormatter: priceFormatter,
    },
  ];

  return (
    <LineChart
      // The dataset prop is the actual array of objects the chart should draw.
      dataset={data}
      xAxis={xAxis}
      yAxis={yAxis}
      series={series}
      height={360}
      margin={{ top: 16, right: 16, left: 80 }}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}
