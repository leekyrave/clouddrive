import dotenv from 'dotenv';
import express from 'express';
import db from './models/index.js';
dotenv.config();
console.log(process.env.DB_USERNAME)
const app = express();

app.use(express.json());

try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

export default app;