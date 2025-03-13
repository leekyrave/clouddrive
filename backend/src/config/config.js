import dotenv from 'dotenv';
dotenv.config();

export default {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD ,
    "database": process.env.DB_DATABAsE,
    "host": process.env.DB_HOST,
    "dialect": "mariadb"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mariadb"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mariadb"
  }
}
