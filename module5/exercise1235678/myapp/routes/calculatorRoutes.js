const express = require('express');
const router = express.Router();

// route for adding two numbers
router.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const result = num1 + num2;
    res.json({ result });
})


// route for subtracting two numbers
router.get('/subtract', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const result = num1 - num2;
    res.json({ result });
})


// route for multiplying two numbers
router.get('/multiply', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const result = num1 * num2;
    res.json({ result });
})


// route for dividing two numbers
router.get('/divide', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if (num2 === 0) {
        return res.status(400).json({ error: 'Cannot divide by zero' });
    }
    const result = num1 / num2;
    res.json({ result });
})

module.exports = router;




















module.exports = router;  

