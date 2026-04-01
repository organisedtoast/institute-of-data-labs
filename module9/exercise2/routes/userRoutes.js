// This file defines the routes for user-related operations. 
// It imports the necessary controller functions and sets up the routes for creating a user, 
// retrieving all users, and retrieving a user by ID. 

// Finally, it exports the router to be used in the main application file.


const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUserById } = require('../controllers/userController');
 
router.get('/',     getUsers);       // GET  /api/users
router.get('/:id',  getUserById);    // GET  /api/users/:id
router.post('/',    createUser);     // POST /api/users
 
module.exports = router;
