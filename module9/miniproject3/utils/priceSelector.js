// This utility file finds the stock price on the first trading day after the annual earnings call.

// This makes the price deterministic and tied to a real-world event.

function selectPriceAfterEarningsCall(earningsDate, priceHistory) {
  // priceHistory is an array of { date, close } sorted by date.
  // We find the first entry whose date is after earningsDate.
  const callDate = new Date(earningsDate);
 
  const match = priceHistory.find(
    (entry) => new Date(entry.date) > callDate
  );
 
  // Return the close price, or null if no later date exists.
  return match ? match.close : null;
}
 
module.exports = { selectPriceAfterEarningsCall };
