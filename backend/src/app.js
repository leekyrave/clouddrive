const dotenv = require('dotenv');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');
const db = require('./models/index.js');
const userRoutes = require('./routes/user.js');
const fileRoutes = require('./routes/files.js');

dotenv.config();

const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Drive API',
      version: '1.0.0',
      description: 'API For drive docs',
    },
  },
  apis: ['./src/routes/*.js'], // Путь к файлам, где находятся аннотации
};

// Инициализация Swagger
const swaggerSpec = swaggerJSDoc(options);

app.use(cors())
app.use(express.json());

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.use('/api/users', userRoutes);
app.use('/files', fileRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
module.exports = app;
