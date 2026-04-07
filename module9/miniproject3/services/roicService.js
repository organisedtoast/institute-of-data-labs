// services/roicService.js
const axios = require("axios");
 
const BASE_URL = "https://roic.ai/api";
const API_KEY = process.env.ROIC_API_KEY;
 
// Helper: builds the auth header for every request
const authHeader = () => ({
  headers: { Authorization: `Bearer ${API_KEY}` },
});
 
// Fetch company profile (name, currency, etc.)
async function fetchCompanyProfile(ticker) {
  const res = await axios.get(
    `${BASE_URL}/company/profile/${ticker}`,
    authHeader()
  );
  return res.data;
}
 
// Fetch annual per-share data (shares outstanding)
async function fetchAnnualPerShare(ticker) {
  const res = await axios.get(
    `${BASE_URL}/annual/per-share/${ticker}`,
    authHeader()
  );
  return res.data;
}
 
// Fetch annual profitability ratios (ROIC metric)
async function fetchAnnualProfitability(ticker) {
  const res = await axios.get(
    `${BASE_URL}/annual/profitability/${ticker}`,
    authHeader()
  );
  return res.data;
}
 
// Fetch historical stock prices
async function fetchStockPrices(ticker) {
  const res = await axios.get(
    `${BASE_URL}/stock-prices/${ticker}`,
    authHeader()
  );
  return res.data;
}
 
// Fetch earnings call dates
async function fetchEarningsCalls(ticker) {
  const res = await axios.get(
    `${BASE_URL}/earnings-calls/${ticker}`,
    authHeader()
  );
  return res.data;
}

// Export all service functions
module.exports = {
  fetchCompanyProfile,
  fetchAnnualPerShare,
  fetchAnnualProfitability,
  fetchStockPrices,
  fetchEarningsCalls,
};
