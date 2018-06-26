'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'reviews',
      'status',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('reviews', 'status')
  }
};
