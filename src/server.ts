import express = require('express');
import { Hal, HalMeta } from './types/hateos';

// Get variables config from env file
require('dotenv').config()
const SERVER_PORT = process.env.SERVER_PORT;
const HOST_ID = process.env.HOST_ID;
const VERSION = process.env.VERSION;

// Create a new express app instance
const app: express.Application = express();
const meta:HalMeta = { host: HOST_ID, version: VERSION }

// Routes
app.get('/', (req, res) => {
  const payload = { message: "Hypermedia response" };
  res.json(Hal.create(req, payload, meta));
});

// Configure ports
app.listen(SERVER_PORT, () => {
  console.log(`App is listening on port ${SERVER_PORT}!`);
});