const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from server 2!');
});

app.listen(4000, () => {
  console.log('Server 2 is running on port 4000');
});
