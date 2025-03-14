'use strict';
const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static async hashPassword(password) {
      return bcrypt.hash(password, +process.env.SALT_ROUNDS)
    }

    async checkPassword(password) {
      return await bcrypt.compare(password, this.password)
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: false
  });

  return User;
};