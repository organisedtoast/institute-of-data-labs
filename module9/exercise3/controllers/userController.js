// This controller handles all user-related operations, including creating, reading, updating, and deleting users. 

// It interacts with the User model to perform database operations and sends appropriate HTTP responses based on 
// the outcome of each operation.

// The functions defined here include:
// - createUser: Creates a new user with the provided username and email.
// - getUsers: Retrieves a list of all users.
// - getUserById: Retrieves a single user by their ID.
// - updateUser: Updates an existing user's information.
// - deleteUser: Deletes a user, with error handling for foreign key constraints (e.g., if the user has posts or comments).


const { User } = require('../models/index');

// POST /api/users  — create a new user
const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.create({ username, email });
    res.status(201).json(user);
  } catch (error) {
    // Sequelize wraps MySQL duplicate-key errors
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email already exists.' });
    }
    res.status(500).json({ message: error.message });
  }
};

// GET /api/users  — all users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/users/:id  — one user by id
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// PUT /api/users/:id  — update a user's username or email
const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    const { username, email } = req.body;
    await user.update({ username, email });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE /api/users/:id  — delete a user (with error handling for FK constraints)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    // FK constraint — user has posts/comments still in the DB
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({
        message: 'Cannot delete user — they have posts or comments. Delete those first.'
      });
    }
    res.status(500).json({ message: error.message });
  }
};


// Export all controller functions to be used in routes
module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
