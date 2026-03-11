// this is a product routes module that will handle all the routes related to products

// declare express as a variable that will hold the express module
const express = require('express');

// create a new router object using the express.Router() method
const router = express.Router();

// declare productController as a variable that will hold the methods for handling product-related requests
// make it point to the productController.js file in the controllers directory
const productController = require('../controllers/productController');

// GET all products
router.get('/', productController.getAllProducts);

// POST a new product
router.post('/', productController.createProduct);

// export the router object so that it can be used in other parts of the application (e.g. app.js)
module.exports = router;