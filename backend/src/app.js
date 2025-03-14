const dotenv = require('dotenv');
const express = require('express');
const db = require('./models/index.js');
dotenv.config();

const app = express();

app.use(express.json());

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = app;
