'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('open_hours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      day: {
        type: Sequelize.INTEGER
      },
      open_time: {
        type: Sequelize.TIME,
        allowNull: true
      },
      close_time: {
        type: Sequelize.TIME,
        allowNull: true
      },
      outletId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'outlets',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('open_hours');
  }
};