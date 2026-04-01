// this is the main entry point of our Express server application. 
// It sets up the server, connects to the database, and defines the routes for handling user and post-related requests.

require('dotenv').config();         // load .env variables FIRST
const express = require('express');
const connectDB = require('./config/db');
 
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
 
const app = express();
 
// Middleware — parse incoming JSON bodies
app.use(express.json());
 
// Connect to MongoDB
connectDB();
 
// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
 
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
