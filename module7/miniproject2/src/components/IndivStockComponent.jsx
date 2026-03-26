import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// Import the chart component that will render the monthly price line.
import IndivStockChart from './IndivStockChart';

// This component is responsible for one stock card.
// The parent page passes in the stock information and loading/error state as props.
export default function IndivStockComponent({
  identifier,
  name,
  data,
  isLoading,
  error,
}) {
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

      {/* Render the appropriate UI for loading, error, or success. */}
      {cardBody}

      <CardActions>
        <Button size="small" disabled>
          Monthly Closing Prices
        </Button>
      </CardActions>
    </Card>
  );
}
