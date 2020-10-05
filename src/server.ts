import express = require('express');
import { Hal } from './types/hateos';

// Get variables config from env file
require('dotenv').config()
const SERVER_PORT = process.env.SERVER_PORT;

// Create a new express app instance
const app: express.Application = express();

// Routes
app.get('/', (req, res) => {
  const payload = { message: "Hypermedia response" };
  res.json(Hal.create(req, payload));
});

// Configure ports
app.listen(SERVER_PORT, () => {
  console.log(`App is listening on port ${SERVER_PORT}!`);
});