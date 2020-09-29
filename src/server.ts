import express = require('express');

// Get variables config from env file
require('dotenv').config()
const SERVER_PORT = process.env.SERVER_PORT;

// Create a new express app instance
const app: express.Application = express();

// Routes
app.get('/', (_req, res) => {
  res.json({ status: 200, message: 'HTTP OK', });
});

// Configure ports
app.listen(SERVER_PORT, () => {
  console.log(`App is listening on port ${SERVER_PORT}!`);
});