'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      File.belongsTo(models.User, {
        foreignKey: 'author_id',
        as: 'author'
      })
      // define association here
    }
  }
  
  File.init({
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },

    uploadedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    createdAt: {
      type: DataTypes.DATE
    }
    
  }, {
    sequelize,
    modelName: 'File',
    tableName: 'files',
    timestamps: false
  });
  return File;
};