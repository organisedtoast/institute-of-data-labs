import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// Import the chart component that will render the monthly price line.
import IndivStockChart from './IndivStockChart';
import ChartDateRangeControls from './ChartDateRangeControls';
import useChartDateRange from '../hooks/useChartDateRange';
import { convertDailyPricesToMonthlyPrices } from '../dataset/SharePrice';

// This component is responsible for one stock card.
// The parent page now only passes in the stock identity.
// This component manages its own loading, chart data, and month-range state.
export default function IndivStockComponent({
  identifier,
  name,
  isRemovable = false,
  onRemove = null,
}) {
  const [data, setData] = useState([]);
  const [fullRangeData, setFullRangeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    minAvailableMonth,
    maxAvailableMonth,
    hasAvailableRange,
    isRangeValid,
    activePreset,
    initializeRangeFromData,
    applyMaxRange,
    applyTrailingRange,
  } = useChartDateRange();

  // Load the complete available history once when the card first appears.
  // We need this first request so we can discover the earliest and latest months that exist,
  // even though the default visible range will become trailing 5 years instead of full history.
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadAllAvailableData = async () => {
      setIsLoading(true);
      setError('');

      try {
        // React talks to our own "/api" route instead of the third-party ROIC URL.
        // In local development, Vite forwards this request to the Express server on port 3001.
        // That avoids browser CORS errors and keeps the API key hidden on the server.
        const response = await axios.get(`/api/stock-prices/${identifier}`, {
          signal: controller.signal,
        });

        const monthlyPrices = convertDailyPricesToMonthlyPrices(response.data.prices);

        if (!isMounted) {
          return;
        }

        // Store the full monthly dataset separately.
        // This lets us instantly restore the "show everything" view without another full API request.
        setData(monthlyPrices);
        setFullRangeData(monthlyPrices);
        initializeRangeFromData(monthlyPrices);
      } catch (requestError) {
        if (!isMounted || requestError.name === 'CanceledError') {
          return;
        }

        setData([]);
        setFullRangeData([]);
        setError(
          requestError.response?.data?.message ||
            `Unable to load data for ${identifier}.`,
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadAllAvailableData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [identifier, initializeRangeFromData]);

  // After the default range has been discovered, this effect responds to user date changes.
  // If the user selects a narrower month range, we request less data from the server.
  useEffect(() => {
    if (!hasAvailableRange || !startDate || !endDate) {
      return;
    }

    if (!isRangeValid) {
      setError('Start month must be earlier than or equal to end month.');
      return;
    }

    // When the selected range matches the full available range, we can reuse the cached full dataset.
    // This avoids an unnecessary second full-history request.
    if (startDate === minAvailableMonth && endDate === maxAvailableMonth) {
      setError('');
      setData(fullRangeData);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    const loadFilteredData = async () => {
      setIsLoading(true);
      setError('');

      try {
        // This filtered request follows the same safe path:
        // React -> /api/... -> Vite dev proxy -> Express server -> ROIC API.
        // The chart behavior stays the same for users, but the browser never calls ROIC directly.
        const response = await axios.get(`/api/stock-prices/${identifier}`, {
          params: {
            startDate,
            endDate,
          },
          signal: controller.signal,
        });

        const monthlyPrices = convertDailyPricesToMonthlyPrices(response.data.prices);

        if (!isMounted) {
          return;
        }

        setData(monthlyPrices);
      } catch (requestError) {
        if (!isMounted || requestError.name === 'CanceledError') {
          return;
        }

        setData([]);
        setError(
          requestError.response?.data?.message ||
            `Unable to load filtered data for ${identifier}.`,
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadFilteredData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [
    endDate,
    fullRangeData,
    hasAvailableRange,
    identifier,
    isRangeValid,
    maxAvailableMonth,
    minAvailableMonth,
    startDate,
  ]);

  // Decide what should appear in the large middle area of the card.
  // This is a common React pattern: use conditions to render different UI for different states.
  let cardBody;

  if (isLoading) {
    cardBody = (
      <Box
        sx={{
          minHeight: 360,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography variant="body2" color="text.secondary">
          Loading stock data...
        </Typography>
      </Box>
    );
  } else if (error) {
    cardBody = (
      <Box
        sx={{
          minHeight: 360,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
        }}
      >
        <Typography variant="body2" color="error" align="center">
          {error}
        </Typography>
      </Box>
    );
  } else {
    cardBody = <IndivStockChart data={data} />;
  }

  return (
    <Card
      sx={{
        width: { xs: '100%', sm: 540, md: 600 },
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
      }}
    >
      {/* The top of the card displays the stock label and ticker symbol. */}
      <CardContent sx={{ paddingBottom: '16px !important', paddingTop: '16px !important' }}>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14, marginBottom: '8px' }}>
          Stock
        </Typography>
        <Typography variant="h5" component="div" sx={{ marginBottom: '0 !important', marginTop: '0 !important' }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {identifier}
        </Typography>
      </CardContent>

      {isRemovable ? (
        <CardActions sx={{ pt: 0, px: 2 }}>
          {/* Only user-added cards show this action.
              This gives the learner a clear example of rendering extra UI from props. */}
          <Button color="error" size="small" onClick={onRemove}>
            Remove stock
          </Button>
        </CardActions>
      ) : null}

      {/* Render the appropriate UI for loading, error, or success. */}
      {cardBody}

      <ChartDateRangeControls
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        minAvailableMonth={minAvailableMonth}
        maxAvailableMonth={maxAvailableMonth}
        activePreset={activePreset}
        onApplyMaxRange={applyMaxRange}
        onApplyTrailingRange={applyTrailingRange}
        disabled={!hasAvailableRange}
      />
    </Card>
  );
}
