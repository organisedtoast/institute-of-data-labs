const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

const calculatorRoutes = require('./routes/calculatorRoutes');
const swaggerDocument = require('./swagger.json');

const app = express();

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
