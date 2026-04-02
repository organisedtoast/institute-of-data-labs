// routes/microserviceRoutes.js
// Responsibility: define the endpoints and connect them
// to the correct controller function.

const express = require('express');
const router = express.Router();             // create a mini-router

// Import controller functions
const {
  getInfo,
  getHealth,
  getMushrooms,
  updateMushroom
} = require('../controllers/microserviceController');

// GET /api/microservice       → calls getInfo()
router.get('/', getInfo);

// GET /api/microservice/health → calls getHealth()
router.get('/health', getHealth);

// GET /api/microservice/mushrooms → fetch all mushrooms from myshroom-api
router.get('/mushrooms', getMushrooms);

// PUT /api/microservice/mushrooms/:id → update a mushroom record by id
router.put('/mushrooms/:id', updateMushroom);

module.exports = router;                     // export the router
