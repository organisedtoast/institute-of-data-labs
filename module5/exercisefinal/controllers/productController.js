// use const to import the productService module which contains the business logic for handling products
const productService = require('../services/productService');


// use exports to define the controller functions for handling product-related requests. 
// These functions will be used in the productRoutes.js file to handle specific routes for products.

exports.getAllProducts = async (req, res) => {
    try {

        const products = await productService.fetchProducts();

        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching products",
            error: error.message
        });

    }
};



// Use exports to define the createProduct controller function, which will handle POST requests to create a new product.
// this function will receive the new product data from the request body, call the productService to add the product, and return the created product in the response.
// If there is an error, it will return a 500 status with an error message.

exports.createProduct = async (req, res) => {

    try {

        const newProduct = req.body;

        const createdProduct = await productService.addProduct(newProduct);

        res.status(201).json(createdProduct);

    } catch (error) {

        res.status(500).json({
            message: "Error creating product",
            error: error.message
        });

    }

};
