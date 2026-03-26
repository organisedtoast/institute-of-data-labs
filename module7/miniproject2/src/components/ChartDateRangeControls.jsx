import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// This small reusable component renders the month input controls for a chart.
// Reusing one component keeps the stock cards and the sector chart visually consistent,
// and it gives beginner developers one clear place to study how the inputs work.
export default function ChartDateRangeControls({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  minAvailableMonth,
  maxAvailableMonth,
  onReset,
  disabled = false,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        px: 2,
        pb: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {/* `type="month"` gives us a native browser month picker that stores values like "2024-06". */}
        <TextField
          label="Start month"
          type="month"
          size="small"
          value={startDate}
          onChange={(event) => onStartDateChange(event.target.value)}
          inputProps={{
            min: minAvailableMonth || undefined,
            max: maxAvailableMonth || undefined,
          }}
          disabled={disabled}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="End month"
          type="month"
          size="small"
          value={endDate}
          onChange={(event) => onEndDateChange(event.target.value)}
          inputProps={{
            min: minAvailableMonth || undefined,
            max: maxAvailableMonth || undefined,
          }}
          disabled={disabled}
          InputLabelProps={{ shrink: true }}
        />

        <Button variant="outlined" onClick={onReset} disabled={disabled || !minAvailableMonth || !maxAvailableMonth}>
          Reset range
        </Button>
      </Box>
    </Box>
  );
}
