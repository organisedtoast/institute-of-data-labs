// This file defines the controller functions for handling user-related API requests
// It imports the User model to interact with the users collection in MongoDB

// The controller includes functions for creating a new user, getting all users, and getting a user by id
// Each function uses async/await syntax to handle asynchronous database operations
// Error handling is included to return appropriate HTTP status codes and messages for different scenarios (e.g., duplicate key errors, not found errors, server errors)

// The createUser function handles POST requests to create a new user
// The getUsers function handles GET requests to retrieve all users
// The getUserById function handles GET requests to retrieve a single user by their id
// Finally, the controller exports the functions so they can be used in the routes definition

const User = require('../models/User');
 
// POST /api/users  — create a new user
const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.create({ username, email });
    res.status(201).json(user);
  } catch (error) {
    // Mongoose duplicate-key error code is 11000
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username or email already exists.' });
    }
    res.status(500).json({ message: error.message });
  }
};
 
// GET /api/users  — get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// GET /api/users/:id  — get one user by id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
module.exports = { createUser, getUsers, getUserById };
