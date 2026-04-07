// This controller file handles the initial import of a stock from ROIC.
// It first calls the service layer being roicService to fetch the raw data
// Then it calls the normalizationService to transform it into our schema shape
// Finally, it upserts the document into MongoDB using the WatchlistStock model.

const roicService = require("../services/roicService");
const normalize = require("../services/normalizationService");
const WatchlistStock = require("../models/WatchlistStock");
 
async function importStock(req, res, next) {
  try {
    const { tickerSymbol, investmentCategory, years = 10 } = req.body;
 
    // 1. Fetch raw data from all ROIC endpoints
    const [profile, perShare, profitability, prices, earnings] =
      await Promise.all([
        roicService.fetchCompanyProfile(tickerSymbol),
        roicService.fetchAnnualPerShare(tickerSymbol),
        roicService.fetchAnnualProfitability(tickerSymbol),
        roicService.fetchStockPrices(tickerSymbol),
        roicService.fetchEarningsCalls(tickerSymbol),
      ]);
 
    // 2. Normalise into our schema shape
    const stockData = normalize.buildStockDocument({
      tickerSymbol, profile, perShare,
      profitability, prices, earnings,
      years, investmentCategory,
    });
 
    // 3. Upsert: create or update the document
    const doc = await WatchlistStock.findOneAndUpdate(
      { tickerSymbol: tickerSymbol.toUpperCase() },
      stockData,
      { upsert: true, new: true, runValidators: true }
    );
 
    res.status(201).json(doc);
  } catch (error) {
    next(error);
  }
}
 
module.exports = { importStock };
