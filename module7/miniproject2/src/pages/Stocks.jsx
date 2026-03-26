import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// Import the stock card component that will be repeated for each stock.
import IndivStockComponent from '../components/IndivStockComponent';
import useStockSearch from '../hooks/useStockSearch';

function Stocks() {
  const {
    stocks,
    searchResults,
    searchStatus,
    searchError,
    addStockFromResult,
    removeStockByIdentifier,
    clearSearchFeedback,
  } = useStockSearch();

  return (
    <Box sx={{ px: 2, py: 3 }}>
      <Card sx={{ maxWidth: 960, mx: 'auto', mb: 3 }}>
        <CardContent>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h5" component="h1">
                Search results
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Use the navbar search to find a stock by ticker or company name, then choose one result to add it as a new stock card.
              </Typography>
            </Box>

            {searchError ? (
              <Alert severity={searchStatus === 'success' ? 'info' : 'warning'}>
                {searchError}
              </Alert>
            ) : null}

            {searchStatus === 'loading' ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <CircularProgress size={24} />
                <Typography variant="body2" color="text.secondary">
                  Working on your stock search...
                </Typography>
              </Box>
            ) : null}

            {searchResults.length > 0 ? (
              <Stack spacing={1}>
                {searchResults.map((stock) => {
                  return (
                    <Box
                      key={stock.identifier}
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        p: 2,
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle1">{stock.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stock.identifier}
                        </Typography>
                      </Box>

                      <Button
                        variant="contained"
                        onClick={() => addStockFromResult(stock)}
                      >
                        Add stock card
                      </Button>
                    </Box>
                  );
                })}

                <Box>
                  <Button variant="text" onClick={clearSearchFeedback}>
                    Clear search results
                  </Button>
                </Box>
              </Stack>
            ) : null}
          </Stack>
        </CardContent>
      </Card>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        {/*
          `.map()` is a common React pattern for rendering one component per data item.
          The difference now is that the list comes from shared app state instead of a hard-coded array,
          which is what makes the search feature able to add new cards dynamically.
        */}
        {stocks.map((stock) => {
          return (
            <IndivStockComponent
              key={stock.identifier}
              identifier={stock.identifier}
              name={stock.name}
              isRemovable={stock.isUserAdded}
              onRemove={() => removeStockByIdentifier(stock.identifier)}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default Stocks;
