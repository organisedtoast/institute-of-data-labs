// this is a product service module that will handle all the logic related to products
// it will be responsible for fetching products from the DB

const axios = require('axios');

// declare the productService object that will contain the methods for fetching and adding products
const productService = {

    // this method will fetch products from the DB and return them to the caller
    async fetchProducts() {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data;
    },

    // this method will add a new product to the DB and return the added product to the caller
    async addProduct(newProduct) {
        const response = await axios.post('https://fakestoreapi.com/products', newProduct);
        return response.data;
    }
};

// export the productService object so that it can be used in other parts of the application (e.g. in productRoutes.js)
module.exports = productService;
