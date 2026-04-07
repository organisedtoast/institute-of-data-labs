// Load .env variables first
require('dotenv').config(); 

// Set up the Express server
const express = require('express');

// Connect to the database using the connection function defined in config/db.js
const connectDB = require('./config/db');

// Import routes and middleware
const watchlistRoutes = require("./routes/watchlistRoutes");
const errorHandler = require("./middleware/errorHandler");

// Create an Express application instance
const app = express();

// Use middleware to parse JSON bodies from incoming requests. (so req.body works)
app.use(express.json());

// Use middleware to parse URL-encoded bodies (for form submissions - is this needed?).
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});
 
// Mount watchlist routes under /api/watchlist
app.use("/api/watchlist", watchlistRoutes);
 
// Central error handler (must be registered LAST)
app.use(errorHandler);

// Start the server programmatically so tests or scripts can reuse the same app
// instance without forcing a second copy of the server to boot automatically.
async function startServer() {
  const PORT = process.env.PORT || 3000;
  await connectDB();

  return app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
