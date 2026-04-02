// This is the main server file for the Express application.
// It sets up the server, connects to the database, and mounts the routes for users and posts.

// Load environment variables first so database config can read them immediately.
require('dotenv').config();

const express = require('express');

const { connectDB, sequelize } = require('./config/dbConnect');

// Load all models and register their associations before routes are imported.
// This makes startup order explicit and ensures sequelize.sync() sees every relationship.
require('./models');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Middleware: parse incoming JSON request bodies.
app.use(express.json());

// Mount routes.
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB(); // Test the MySQL connection first.
  await sequelize.sync({ alter: true }); // Sync all registered models and associations to the DB.

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
