const express = require('express');
const app = express();

// middlewares
app.use(express.json());

// health check
app.get('/', (req, res) => {
  res.json({ message: 'ProjectPulse API running' });
});

module.exports = app;
