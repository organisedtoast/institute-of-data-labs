const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

const calculatorRoutes = require('./routes/calculatorRoutes');
const swaggerDocument = require('./swagger.json');

// import the CORS middleware to enable Cross-Origin Resource Sharing,
// which allows your server to handle requests from different origins.
const cors = require('cors');

const app = express();


// enable CORS for all routes in the application by using the cors middleware. 
app.use(cors());

app.use(express.json());
app.use(express.static(__dirname));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/calculator', calculatorRoutes);

app.get('/', (req, res) => {
  res.send('Hello from server 1!');
});

app.get('/calculator.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'calculator.html'));
});

module.exports = app;
