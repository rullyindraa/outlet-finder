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
      mon_open: {
        type: Sequelize.TIME,
        allowNull: true
      },
      mon_close: {
        type: Sequelize.TIME,
        allowNull: true
      },
      tue_open: {
        type: Sequelize.TIME,
        allowNull: true
      },
      tue_close: {
        type: Sequelize.TIME,
        allowNull: true
      },
      wed_open: {
        type: Sequelize.TIME,
        allowNull: true
      },
      wed_close: {
        type: Sequelize.TIME,
        allowNull: true
      },
      thu_open: {
        type: Sequelize.TIME,
        allowNull: true
      },
      thu_close: {
        type: Sequelize.TIME,
        allowNull: true
      },
      fri_open: {
        type: Sequelize.TIME,
        allowNull: true
      },
      fri_close: {
        type: Sequelize.TIME,
        allowNull: true
      },
      sat_open: {
        type: Sequelize.TIME,
        allowNull: true
      },
      sat_close: {
        type: Sequelize.TIME,
        allowNull: true
      },
      sun_open: {
        type: Sequelize.TIME,
        allowNull: true
      },
      sun_close: {
        type: Sequelize.TIME,
        allowNull: true
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