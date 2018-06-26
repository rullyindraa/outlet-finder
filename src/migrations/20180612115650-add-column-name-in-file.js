'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'files',
      'name',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('files', 'name')
  }
};
