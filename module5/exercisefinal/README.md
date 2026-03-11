# Man Utd Store 200% genuine qual1ty - E-Commerce Web Application

A full-stack e-commerce web application for official Man Utd merchandise (200% genuine qual1ty). 

This project demonstrates industry-standard separation of concerns with a clean architecture pattern, featuring a RESTful API backend and a responsive frontend.


---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Data Flow](#data-flow)
- [HTTP Status Codes](#http-status-codes)
- [Separation of Concerns](#separation-of-concerns)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Troubleshooting/ debugging](#troubleshooting--debugging)
- [Glossary for beginners](#glossary-for-beginners)
- [Contact](#contact)

---

## Features

- Browse Man Utd official merchandise products (200% genuine qual1ty)
- Filter products by category: women's clothing, men's clothing, jewelery, electronics 
- RESTful API with full CRUD operations
- Interactive Swagger UI for API documentation and testing
- CORS-enabled for cross-origin frontend integration
- Responsive design using Bootstrap 5
- Real-time product data from genuine external API (FakeStoreAPI)

---

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Axios** - HTTP client for API requests
- **CORS** - Cross-Origin Resource Sharing middleware
- **Swagger UI Express** - Interactive API documentation

### Frontend
- **HTML5** - Semantic markup
- **Bootstrap 5** - Responsive CSS framework
- **Vanilla JavaScript** - DOM manipulation and API calls
- **Axios (CDN)** - HTTP client for browser

---

## Project Structure

```
exercisefinal/
├── controllers/          # Request/response handling logic
│   └── productController.js
├── routes/               # Route definitions and mappings
│   └── productRoutes.js
├── services/             # Business logic and data operations
│   └── productService.js
├── swagger/              # API documentation configuration
│   └── swagger.js
├── public/               # Static frontend files
│   ├── index.html
│   └── js/               # Frontend JavaScript (if separated)
├── index.js              # Main application entry point
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

---

## Installation

### Prerequisites

- **Node.js** (v14 or higher recommended)
- **npm** (comes with Node.js)

### Steps

1. **Navigate to the project directory:**
   ```bash
   cd institute-of-data-labs/module5/exercisefinal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This installs all required packages defined in `package.json`:
   - `express` - Web framework
   - `axios` - HTTP client
   - `cors` - Cross-origin middleware
   - `swagger-ui-express` - API documentation
   - `swagger-jsdoc` - Swagger documentation generator
   - `nodemon` - Development auto-restart tool

3. **Verify installation:**
   ```bash
   npm list
   ```

---

## Usage

### Starting the Server

1. **Start the development server:**
   ```bash
   npm start
   ```
   This uses `nodemon` to automatically restart the server when files change.

Expected terminal output:
Server running on port 3000

2. **Access the application:**
   - **Frontend:** Open your browser and navigate to [http://localhost:3000](http://localhost:3000)
   - **API Documentation:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### API Endpoints

| Method | Endpoint              | Description           |
|--------|-----------------------|-----------------------|
| GET    | `/api/products`       | Get all products      |
| POST   | `/api/products`       | Create a new product  |
| GET    | `/api/products/:id`   | Get product by ID     |
| GET    | `/api/products/categories` | Get all categories |

### Testing the API

**Using cURL:**
```bash
# Get all products
curl http://localhost:3000/api/products

# Create a new product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"title":"New Product","price":29.99,"category":"accessories"}'
```

**Using Swagger UI:**
1. Navigate to [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
2. Click on any endpoint to expand it
3. Click "Try it out" to test directly from the browser

---

## API Documentation

This project uses **Swagger/OpenAPI 3.0.0** for API documentation. The documentation is configured in `swagger/swagger.js` and served via `swagger-ui-express`.

### Viewing Documentation

1. Start the server: `npm start`
2. Open your browser to: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Swagger Configuration

The Swagger document defines:
- API title, version, and description
- Server URLs (localhost, staging, production)
- All available endpoints with request/response schemas
- HTTP status codes and error descriptions

---

## Data Flow

```
Browser (index.html) 
    ↓ GET /api/products
Express Server (index.js)
    ↓ Route matching
productRoutes.js
    ↓ Forward to controller
productController.js
    ↓ Call service method
productService.js
    ↓ External API call (FakeStoreAPI)
productService.js returns data
    ↑
productController.js sends JSON response
    ↑
Express Server returns to browser
    ↑
Frontend renders cards + filter UI
```
**What happens on page load?**
Browser opens http://localhost:3000.
Express serves public/index.html.
Frontend JS sends GET /api/products.
Route forwards request to controller.
Controller calls service.
Service returns product data.
Controller sends JSON back to browser.
Frontend renders product cards and filter dropdown.


## HTTP Status Codes used
200 OK: successful GET request.
201 Created: successful POST request.
500 Internal Server Error: backend failure in controller/service.

---

## Separation of Concerns

This project follows the **MVC (Model-View-Controller)** pattern with additional service layer for clean separation of concerns.

### 1. index.js (Application Entry Point)

**Purpose:** Boots Express, sets middleware, connects routes, starts server.

**Responsibilities:**
- Importing Express and creating the app instance
- Configuring middleware (CORS, JSON parser, static files, Swagger)
- Defining route handlers
- Starting the server on a port

**Does NOT contain:**
- Product business logic
- Controller logic
- HTML/DOM code

---

### 2. routes/productRoutes.js

**Purpose:** Maps URL + HTTP method to controller functions.

**Responsibilities:**
- Define URL paths (`/`, `/:id`, `/categories`)
- Map HTTP methods (GET, POST) to controller functions
- Export router for use in `index.js`

**Does NOT contain:**
- Business logic
- Direct axios/fetch calls
- Data shaping or transformation

---

### 3. controllers/productController.js

**Purpose:** Handle HTTP request/response objects, returns status codes + JSON.

**Responsibilities:**
- Read request parameters and body
- Call appropriate service methods
- Return HTTP status codes and JSON responses
- Try/catch error handling

**Does NOT contain:**
- Express app setup
- HTML rendering
- Direct data fetching logic

---

### 4. services/productService.js

**Purpose:** Business logic and data operations (e.g. fetch/add product).

**Responsibilities:**
- `fetchProducts()` - Retrieve products from data source
- `addProduct(newProduct)` - Validate and store new products
- Data transformation and normalization

**Does NOT contain:**
- `req`/`res` objects
- Route definitions
- HTML rendering

---

### 5. public/index.html (Frontend)

**Purpose:** User interface rendering and user interactions in browser.

**Responsibilities:**
- Page structure and semantic HTML
- Filter dropdown and product container

- Bootstrap CSS integration (I could not be bothered to split it out into public/styles.css)


- Client-side scripts for:
  - Fetching data from `/api/products`
  - Rendering product cards dynamically
  - Category filtering

(I could not be bothered to separate inline client-side scripts but if I did, I would put them as public/js/products.js which is separate from the actual scripts folder for backend)

**Does NOT contain:**
- Server-side logic
- Database operations
- Backend middleware

### RULE OF THUMB 
Browser/UI logic stays in public/
API/business logic stays in backend files (routes, controllers, services)


---

## Configuration

### Environment Variables

Currently, the application uses hardcoded configuration. For production use, consider:

```env
PORT=3000
API_BASE_URL=https://fakestoreapi.com
NODE_ENV=development
```

### Changing the Port

Edit `index.js`:
```javascript
const PORT = 3000; // Change to your desired port
```

### Adding New Endpoints

1. Add route in `routes/productRoutes.js`
2. Add controller function in `controllers/productController.js`
3. Add service method (if needed) in `services/productService.js`
4. Update Swagger documentation in `swagger/swagger.js`

---

## Contributing

Contributions are welcome! Please follow these guidelines:

### Getting Started

1. **Fork the repository** (if applicable)
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following the existing architecture pattern
4. **Test your changes** thoroughly

### Code Style

- Use meaningful variable and function names
- Add comments for complex logic (see existing files for examples)
- Follow the separation of concerns pattern
- Keep functions focused on a single responsibility

### Commit Messages

Use clear, descriptive commit messages:
```bash
git commit -m "Add product filtering by price range"
```

### Pull Requests

1. Ensure all existing tests pass (if applicable)
2. Update documentation for new features
3. Submit a pull request with a clear description of changes

## Current Scope vs Future Improvements

**Current scope:**

Express backend with route-controller-service structure
Product API endpoints
Frontend rendering + category filter
Swagger documentation

**Future improvements:**

Add full CRUD endpoints (PUT, DELETE)
Add input validation (required fields, price type checks)
Move inline frontend JS into public/js/products.js
Add automated tests (unit + integration)
Add .env support for config




---

## License

This project is owned by Man Utd.

---

## Troubleshooting/ debugging

### Server won't start


- Ensure Node.js is installed: `node --version`
- Confirm server is running on port 3000
- Run `npm install` to ensure all dependencies are installed

### CORS errors from frontend

- Verify `app.use(cors())` is present in `index.js`
- Check that your frontend is calling the correct API URL

### Swagger UI not loading

- Verify `swagger-ui-express` is installed: `npm list swagger-ui-express`
- Check that the route `/api-docs` is defined in `index.js`
- Ensure `swagger/swagger.js` exports a valid OpenAPI document

### MODULE_NOT_FOUND when running Node:

Cause: wrong command such as node ...
Fix: run node index.js or npm start

### Circular dependency warning:

Cause: controller imports index.js
Fix: controller should import services/productService.js directly

### EADDRINUSE: address already in use :::3000:

Cause: port 3000 already occupied
Fix: stop old process or change PORT

### Browser shows no products:

Cause: API request failed or wrong endpoint
Fix: test http://localhost:3000/api/products first, then check browser Network tab


---
## Glossary for beginners

Endpoint: URL your frontend/backend calls (example: /api/products).
Route: backend rule matching an endpoint + HTTP method.
Controller: function that handles request and builds response.
Service: reusable business/data logic layer.
Middleware: function that runs before route handlers (example: JSON parser).
JSON: text format for sending structured data between frontend/backend.





## Contact

For questions or support, please refer to your local Man Utd store manager.


