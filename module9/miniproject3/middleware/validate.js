// This middleware file validates common request parameters before they reach a controller.

// The validateTicker function checks if a ticker symbol is provided and is a non-empty string.
// The validateFiscalYear function checks if the fiscal year is a valid number within a reasonable range.
 
function validateTicker(req, res, next) {
  const ticker = req.params.ticker || req.body.tickerSymbol;
  if (!ticker || typeof ticker !== "string" || ticker.trim() === "") {
    return res.status(400).json({ error: "Ticker symbol is required." });
  }
  next(); // Passes control to the next middleware or controller
}
 
function validateFiscalYear(req, res, next) {
  const year = parseInt(req.params.fiscalYear);
  if (isNaN(year) || year < 1900 || year > 2100) {
    return res.status(400).json({ error: "Invalid fiscal year." });
  }
  next();
}
 
module.exports = { validateTicker, validateFiscalYear };
