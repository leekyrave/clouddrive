'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('files', 'author_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Имя таблицы, где хранятся пользователи
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
    
    await queryInterface.changeColumn('files', 'uploadedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    });
    
    await queryInterface.changeColumn('files', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('files', 'author_id');
    
    await queryInterface.changeColumn('files', 'uploadedAt', {
      type: Sequelize.DATE,
      allowNull: true
    });
    
    await queryInterface.changeColumn('files', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false
    });
  }
};
