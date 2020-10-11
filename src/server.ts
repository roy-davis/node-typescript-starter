import express = require('express');
import { config } from './config';
import './utils/hateos';
import * as exampleController from './controllers/example';

// Create a new express app instance
const app: express.Application = express();

// Routes
app.get('/', exampleController.sample );

// Configure ports
app.listen(config.server_port, () => {
  console.log(`App is listening on port ${config.server_port}!`);
});