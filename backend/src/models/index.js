'use strict';
import { URL } from 'node:url';
import fs from 'fs';
import path from 'path'
import Sequelize from 'sequelize';
import process from 'process';
const basename = path.basename(new URL('', import.meta.url).pathname);
const env = process.env.NODE_ENV || 'development';
import configs from '../config/config.js';
const config = configs[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(import.meta.dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;