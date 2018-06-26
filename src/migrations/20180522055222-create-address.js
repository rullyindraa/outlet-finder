'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('addresses', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      line1: {
        type: Sequelize.STRING
      },
      line2: {
        type: Sequelize.STRING
      },
      adm_area_lv1: {
        type: Sequelize.STRING
      },
      adm_area_lv2: {
        type: Sequelize.STRING
      },
      adm_area_lv3: {
        type: Sequelize.STRING
      },
      adm_area_lv4: {
        type: Sequelize.STRING
      },
      raw_address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      formatted_address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      postal_code: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true
      },
      location: {
        type: Sequelize.GEOMETRY('POINT'),
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
    return queryInterface.dropTable('addresses');
  }
};