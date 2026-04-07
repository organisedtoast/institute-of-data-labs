// This file takes the raw responses from all five ROIC endpoints and converts them into the exact shape your Mongoose model expects. 

// The key responsibilities of the normalization service are:
// Strip away any ROIC fields you have not approved (you only keep the fields defined in your model).
// Align data from different endpoints by fiscal year, so one row from per-share data matches one row from profitability data for the same year.
// Select the correct earnings call date for each year.
// Calculate stock price using the price-selection utility (covered in Chapter 9).
// Wrap every metric in the override-capable field structure with roicValue, userValue as null, and effectiveValue matching roicValue.

