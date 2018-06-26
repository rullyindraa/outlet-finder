'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'categories',
      'picture',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('categories', 'picture')
  }
};
