# Calculator Web Application

A simple web-based calculator that performs basic math operations (addition, subtraction, multiplication, and division). This application demonstrates how modern web apps work using a **client-server architecture** – where the front-end (what you see in the browser) communicates with a back-end server (which does the actual calculations).

---

## Table of Contents

1. [What Does This App Do?](#what-does-this-app-do)
2. [Installation Instructions](#installation-instructions)
3. [How to Run the App](#how-to-run-the-app)
4. [How to Use the Calculator](#how-to-use-the-calculator)
5. [Understanding the Project Structure (MVC Pattern)](#understanding-the-project-structure-mvc-pattern)
6. [File-by-File Explanation](#file-by-file-explanation)
7. [Testing the Application](#testing-the-application)
8. [API Documentation](#api-documentation)

---

## What Does This App Do?

This is a **calculator web application** that lets you:

- Enter two numbers
- Choose an operation: **+** (add), **-** (subtract), **×** (multiply), or **÷** (divide)
- Click **=** to get the result
- Click **Reset** to start over

The unique feature of this calculator is that it uses a **client-server model**:
- The **front-end** (HTML page) collects your input and displays results
- The **back-end** (server) performs the actual calculations
- They communicate over the internet using **API calls**

This is the same architecture used by major websites like Facebook, Amazon, and Google!

---

## Installation Instructions

### Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** – This is the runtime environment that allows JavaScript to run outside the browser (i.e., on your computer as a server).
   - Download from: [https://nodejs.org](https://nodejs.org)
   - Choose the **LTS (Long Term Support)** version
   - After installation, verify by opening a terminal and typing:
     ```
     node --version
     ```

2. **A Text Editor** (optional, for viewing/editing code)
   - Recommended: [Visual Studio Code](https://code.visualstudio.com/), Notepad++, or Sublime Text

3. **A Web Browser**
   - Chrome, Firefox, Edge, or Safari

### Step-by-Step Installation

1. **Open a terminal** (Command Prompt on Windows, Terminal on Mac/Linux)

2. **Navigate to the project folder**:
   ```
   cd c:\Users\Daniel\OneDrive\organisedshare.ai\Institute of Data\2026-02-02-SE-FT-AP-A-B\institute-of-data-labs\module9\exercise1
   ```

3. **Install the required dependencies**:
   ```
   npm install
   ```
   
   This command reads the `package.json` file and downloads all the necessary libraries the app needs to run. You'll see a `node_modules` folder created – this contains all the downloaded packages.

   **What is npm?**  
   npm (Node Package Manager) is like an "app store" for code libraries. Developers use it to download and manage code packages that their projects depend on.

---

## How to Run the App

### Starting the Server

1. **In your terminal**, make sure you're in the project folder:
   ```
   cd c:\Users\Daniel\OneDrive\organisedshare.ai\Institute of Data\2026-02-02-SE-FT-AP-A-B\institute-of-data-labs\module9\exercise1
   ```

2. **Start the server** by running:
   ```
   npm start
   ```
   
   You should see a message like:
   ```
   Example app listening at http://localhost:3000
   ```

   **What does `npm start` do?**  
   This command tells Node.js to run the `index.js` file, which starts up a web server on your computer. The server will listen for incoming requests on port 3000.

   **What is `nodemon`?**  
   The `npm start` command uses a tool called `nodemon`, which automatically restarts the server whenever you make changes to the code. This is helpful during development so you don't have to manually stop and restart the server every time.

3. **Keep the terminal window open** – the server needs to keep running for the app to work.

### Opening the Calculator

1. **Open your web browser** (Chrome, Firefox, etc.)

2. **Navigate to**:
   ```
   http://localhost:3000/calculator.html
   ```

   You should see the calculator interface with:
   - Two input fields
   - Four operation buttons (+, -, ×, ÷)
   - A result display area
   - An = button and a Reset button

---

## How to Use the Calculator

1. **Enter two numbers** in the input fields at the top

2. **Click an operation button** (+, -, ×, or ÷) to select what you want to do
   - The button will highlight to show it's selected
   - A status message will appear showing your selection

3. **Click the = button** to perform the calculation
   - The result will appear in the result display area
   - A status message will confirm the calculation

4. **Click Reset** to clear everything and start over

### Example: Adding 5 + 3

1. Type `5` in the first input field
2. Type `3` in the second input field
3. Click the **+** button (it will highlight)
4. Click the **=** button
5. The result `8` will appear!

---

## Understanding the Project Structure (MVC Pattern)
This application follows an **MVC-like structure with a service layer**. This is a common way of organizing code that separates concerns and makes the application easier to understand, test, and maintain.
### What is MVC?
MVC stands for **Model - View - Controller**. In this project, we also use a **service layer** so business logic does not live directly inside the controller. Think of it like a restaurant:
| Component | Restaurant Analogy | What It Does in Our App |
|-----------|--------------------|-------------------------|
| **Service / Model logic** | The kitchen where food is prepared | Handles the business logic and calculations |
| **View** | The dining area where customers see and enjoy their food | What the user sees and interacts with in calculator.html |
| **Controller** | The waiter who takes orders and brings food | Handles the HTTP request, calls the service, and sends the response |
| **Router** | The host who sends people to the right table | Matches the URL and sends the request to the correct controller function |
### How MVC Works in Our Calculator
Note: the simple diagram below is conceptual. In the actual code, the request flows through a router, then a controller, then the `services/calculatorService.js` file before the response is returned.

```text
User
  -> View (`calculator.html`)
  -> Router (`routes/calculatorRoutes.js`)
  -> Controller (`controllers/calculatorController.js`)
  -> Service (`services/calculatorService.js`)
  -> Controller sends JSON response
  -> View updates the screen
```

### Step-by-Step Flow Example: Calculating 10 + 5
1. **User enters numbers and clicks + then =** in the browser.
2. **View (`calculator.html`)** collects the input values and sends a request to `/calculator/add?num1=10&num2=5`.
3. **Router (`calculatorRoutes.js`)** matches `/add` and calls `addNumbers`.
4. **Controller (`calculatorController.js`)** reads `req.query`, converts the values into numbers, and calls the calculator service.
5. **Service (`services/calculatorService.js`)** performs the addition: `10 + 5 = 15`.
6. **Controller** sends the JSON response `{ "result": 15 }`.
7. **View** receives the response and updates the result on the page.
### Why Use MVC?
| Benefit | Explanation |
|---------|-------------|
| **Separation of Concerns** | Each part has one clear job. The view does not perform the math, and the service does not deal with HTML or Express response objects. |
| **Easier to Maintain** | If you want to change the UI, you update the view. If you want to change the calculator rules, you update the service. |
| **Team Collaboration** | Different developers can work on different layers without stepping on each other. |
| **Reusability** | The same service logic could be reused by a different interface, such as a mobile app or another API route. |
| **Testability** | The service can be unit tested directly, and the routes can still be tested end to end. |

## File-by-File Explanation

Here's a breakdown of all the important files and folders in this project:

### Root Level Files

#### `index.js` – The Entry Point
**Purpose:** This is the main file that starts the server.

**What it does:**
- Imports the Express application from `app.js`
- Sets the port number to 3000
- Starts the server and makes it listen for incoming requests
- When you run `npm start`, this is the file that gets executed

**Key concept:** Think of this as the "power button" for your server.

---

#### `app.js` – The Application Configurator
**Purpose:** Sets up the Express application and configures all the middleware and routes.

**What it does:**
- Creates an Express application (a web server)
- Enables CORS (allows the server to accept requests from different sources)
- Sets up static file serving (so the browser can load HTML, CSS files)
- Registers the calculator routes under `/calculator`
- Sets up Swagger documentation at `/api-docs`
- Defines basic routes like the homepage (`/`) and calculator page (`/calculator.html`)

**Key concept:** This file is like the "traffic director" – it tells incoming requests where to go.

---

#### `calculator.html` – The User Interface (View)
**Purpose:** The front-end interface that users interact with.

**What it does:**
- Displays the calculator with input fields, buttons, and result display
- Contains embedded JavaScript that:
  - Captures user input
  - Sends API requests to the server using Axios
  - Updates the display based on server responses
- Includes styling references to `styles.css`

**Key concept:** This is the "face" of your application – what users see and interact with.

---

#### `styles.css` – The Styling
**Purpose:** Defines the visual appearance of the calculator.

**What it does:**
- Sets colors, fonts, sizes, and layouts
- Makes the calculator look nice and user-friendly
- Defines styles for buttons, input fields, and the result display

---

#### `package.json` – The Project Manifest
**Purpose:** Contains metadata about the project and lists all dependencies.

**What it includes:**
- Project name and version
- Scripts (commands like `npm start`, `npm test`)
- Dependencies (external libraries the project needs)

**Key dependencies:**
| Package | Purpose |
|---------|---------|
| `express` | Web server framework |
| `cors` | Enables Cross-Origin Resource Sharing |
| `swagger-ui-express` | Provides API documentation interface |
| `jest` | Testing framework |
| `supertest` | Testing library for HTTP requests |

---

#### `swagger.json` – API Documentation
**Purpose:** Defines the API documentation in a standard format.

**What it does:**
- Describes all available API endpoints
- Documents what parameters each endpoint expects
- Explains what responses to expect
- When you visit `/api-docs` in your browser, this file is used to generate an interactive documentation page

---

### The controllers Folder
#### controllers/calculatorController.js - The HTTP Controller
**Purpose:** Handles the web request and response part of each calculator action.
**What it does:**
- Defines four controller functions:
  - ddNumbers
  - subtractNumbers
  - multiplyNumbers
  - divideNumbers
- Each function:
  - Extracts numbers from the request query parameters
  - Converts query string values into numbers
  - Calls the matching function in services/calculatorService.js
  - Returns the result as JSON
**Key concept:** This file is intentionally thin. It translates web requests into service calls.
---
### The 
outes Folder

#### `routes/calculatorRoutes.js` – The Router (Controller)
**Purpose:** Defines the API endpoints and connects them to controller functions.

**What it does:**
- Creates an Express router
- Defines four GET routes:
  - `/add` → calls `addNumbers`
  - `/subtract` → calls `subtractNumbers`
  - `/multiply` → calls `multiplyNumbers`
  - `/divide` → calls `divideNumbers`
- Exports the router so it can be used in `app.js`

**Key concept:** This is the "receptionist" - it receives requests and directs them to the right handler.
---
### The services Folder
#### services/calculatorService.js - The Business Logic Layer
**Purpose:** Contains the reusable calculator rules and math operations.
**What it does:**
- Defines the dd, subtract, multiply, and divide functions
- Performs the actual calculations
- Keeps the divide-by-zero rule in one place
- Returns plain JavaScript values or objects without knowing anything about Express
**Key concept:** This is the part of the app that knows how the calculator works.
---
### The scripts Folder

This folder contains **test files** that verify the calculator functions work correctly.

| File | Purpose |
|------|---------|
| `add.test.js` | Tests the addition function |
| `subtract.test.js` | Tests the subtraction function |
| `multiply.test.js` | Tests the multiplication function |
| `divide.test.js` | Tests the division function |
| `app.test.js` | Tests the overall application behavior |
| `calculatorService.test.js` | Tests the service layer directly |

**How to run tests:**
```
npm test
```

---

### The `node_modules` Folder

**Do not modify this folder!**

This folder contains all the downloaded dependencies (external libraries) that your project needs. It's automatically created when you run `npm install`. It contains hundreds of files and folders – you don't need to understand or touch any of them.

---

## Testing the Application

### Running Automated Tests

To verify that all calculator functions work correctly:

1. **Stop the server** if it's running (press `Ctrl+C` in the terminal)

2. **Run the tests**:
   ```
   npm test
   ```

3. **Review the output** – you should see all tests pass with green checkmarks.

### Manual Testing

1. **Start the server**: `npm start`

2. **Open the calculator**: Navigate to `http://localhost:3000/calculator.html`

3. **Test each operation**:
   - Addition: `5 + 3 = 8`
   - Subtraction: `10 - 4 = 6`
   - Multiplication: `6 × 7 = 42`
   - Division: `20 ÷ 4 = 5`

4. **Test edge cases**:
   - Division by zero (should show an error)
   - Invalid input (should show an error)
   - Reset button (should clear all fields)

### API Testing with Swagger

1. **Start the server**: `npm start`

2. **Open Swagger UI**: Navigate to `http://localhost:3000/api-docs`

3. **Explore the API documentation** – you'll see all four calculator endpoints listed

4. **Test endpoints directly** from the Swagger interface by clicking "Try it out"

---

## API Documentation

This application exposes four API endpoints that can be called programmatically.

### Base URL
```
http://localhost:3000/calculator
```

### Endpoints

#### 1. Add Two Numbers
- **URL:** `/calculator/add`
- **Method:** GET
- **Parameters:**
  - `num1` – First number
  - `num2` – Second number
- **Example:** `http://localhost:3000/calculator/add?num1=5&num2=3`
- **Response:** `{ "result": 8 }`

#### 2. Subtract Two Numbers
- **URL:** `/calculator/subtract`
- **Method:** GET
- **Parameters:**
  - `num1` – First number
  - `num2` – Second number
- **Example:** `http://localhost:3000/calculator/subtract?num1=10&num2=4`
- **Response:** `{ "result": 6 }`

#### 3. Multiply Two Numbers
- **URL:** `/calculator/multiply`
- **Method:** GET
- **Parameters:**
  - `num1` – First number
  - `num2` – Second number
- **Example:** `http://localhost:3000/calculator/multiply?num1=6&num2=7`
- **Response:** `{ "result": 42 }`

#### 4. Divide Two Numbers
- **URL:** `/calculator/divide`
- **Method:** GET
- **Parameters:**
  - `num1` – First number
  - `num2` – Second number
- **Example:** `http://localhost:3000/calculator/divide?num1=20&num2=4`
- **Response:** `{ "result": 5 }`
- **Error:** If dividing by zero: `{ "error": "Cannot divide by zero" }`

---

## Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| Server won't start | Make sure Node.js is installed. Run `node --version` to check. |
| Port 3000 already in use | Close any other applications using port 3000, or change the port in `index.js` |
| Calculator page doesn't load | Make sure the server is running. Check the terminal for error messages. |
| Calculations don't work | Open the browser's Developer Tools (F12) and check the Console tab for errors. |
| CORS errors | The server already has CORS enabled. If you're still seeing errors, check your browser extensions. |

---

## Glossary

| Term | Definition |
|------|------------|
| **API** | Application Programming Interface – a way for different software applications to communicate with each other |
| **Axios** | A JavaScript library used to make HTTP requests |
| **CORS** | Cross-Origin Resource Sharing – a security feature that allows web pages to request resources from different domains |
| **Express** | A popular web framework for Node.js |
| **HTTP** | Hypertext Transfer Protocol – the foundation of data communication on the web |
| **JSON** | JavaScript Object Notation – a format for structuring data |
| **Middleware** | Functions that process requests before they reach the final handler |
| **Node.js** | A runtime environment that allows JavaScript to run on servers |
| **npm** | Node Package Manager – a tool for installing and managing JavaScript packages |
| **Port** | A number that identifies a specific process on a computer (like a door number) |
| **Query Parameter** | Data appended to a URL to send information to the server |
| **Request** | A message sent from a client to a server asking for something |
| **Response** | A message sent back from a server to a client |
| **Server** | A program that waits for and responds to requests from clients |

---

## Summary

Congratulations! You now have a working understanding of:

1. **How to install and run** a Node.js web application
2. **The MVC architecture pattern** and how it separates concerns
3. **How each file contributes** to the overall application
4. **How the front-end communicates** with the back-end via API calls
5. **How to test** the application both manually and automatically

This calculator is a simplified example of the same architecture used by major web applications. The principles you've learned here apply to much larger and more complex systems!



