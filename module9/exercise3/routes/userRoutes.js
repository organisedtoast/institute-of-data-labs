// This file defines the routes for user-related operations. 
// It imports the necessary controller functions and sets up the routes for creating, retrieving, updating, and deleting users. 
// Each route corresponds to a specific HTTP method and endpoint, allowing clients to interact with the user data through the API.

const express = require('express');
const router  = express.Router();
const {
  createUser, getUsers, getUserById, updateUser, deleteUser
} = require('../controllers/userController');
 
router.get('/',     getUsers);      // GET    /api/users
router.get('/:id',  getUserById);   // GET    /api/users/:id
router.post('/',    createUser);    // POST   /api/users
router.put('/:id',  updateUser);    // PUT    /api/users/:id
router.delete('/:id', deleteUser);  // DELETE /api/users/:id
 
module.exports = router;
