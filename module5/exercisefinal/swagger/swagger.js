// Step 1: Create a JavaScript object called 'swaggerDocument'
// This object holds all the configuration for our API documentation
// 'const' means this variable cannot be reassigned
const swaggerDocument = {

  // Step 2: Specify the OpenAPI version we are using
  // OpenAPI 3.0.0 is the standard format for describing REST APIs
  openapi: "3.0.0",

  // Step 3: Add general information about the API
  // This appears as a header in the Swagger UI documentation page
  info: {
    title: "Man Utd Store API",
    version: "1.0.0",
    description: "API for product data used by the Man Utd Store frontend"
  },

  // Step 4: Define the server(s) where the API is running
  // 'servers' is an array (list) because you could have multiple environments
  // e.g. local development, staging, production
  servers: [
    {
      url: "http://localhost:3000" // Our local development server address
    }
  ],

  // Step 5: Define the 'paths' object
  // Each path represents a URL endpoint in our API
  // Think of each path as a "door" to a different part of your API
  paths: {

    // Step 6: Define the /api/products endpoint
    // This returns a list of ALL products in the store
    "/api/products": {
      get: {                          // 'get' means this is a GET HTTP request (fetching data)
        summary: "Get all products",  // Short description shown in Swagger UI
        responses: {
          "200": {                    // 200 means "success" in HTTP status codes
            description: "Successfully returned a list of all products"
          },
          "500": {                    // 500 means "server error" in HTTP status codes
            description: "Internal server error"
          }
        }
      }
    },

    // Step 7: Define the /api/products/categories endpoint
    // This returns a list of product categories (e.g. jerseys, shorts, accessories)
    "/api/products/categories": {
      get: {
        summary: "Get all product categories",
        responses: {
          "200": {
            description: "Successfully returned a list of all product categories"
          },
          "500": {
            description: "Internal server error"
          }
        }
      }
    },

    // Step 8: Define the /api/products/:id endpoint
    // The ':id' means this path accepts a dynamic value (the product ID)
    // e.g. /api/products/1 would return just product number 1
    "/api/products/{id}": {
      get: {
        summary: "Get a single product by ID",
        parameters: [               // Parameters describe what values the endpoint accepts
          {
            name: "id",             // The name of the parameter
            in: "path",             // 'path' means it is part of the URL itself
            required: true,         // The ID is required - you must provide it
            description: "The unique ID of the product",
            schema: {
              type: "integer"       // The ID must be a whole number
            }
          }
        ],
        responses: {
          "200": {
            description: "Successfully returned the product"
          },
          "404": {                  // 404 means "not found" in HTTP status codes
            description: "Product not found"
          },
          "500": {
            description: "Internal server error"
          }
        }
      }
    }

  } // End of paths

}; // End of swaggerDocument object

// Step 9: Export the swaggerDocument object
// 'module.exports' makes this file available to other files in the project
// Other files can import this using: const swaggerDocument = require('./swagger/swagger')
module.exports = swaggerDocument;