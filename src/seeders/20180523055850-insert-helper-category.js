'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('helper_categories', [{
      businessId: '1',
      categoryId: '2',
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      businessId: '1',
      categoryId: '7',
      createdAt : new Date(),
      updatedAt : new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('categories', [{
    //   name : 'Arts'
    // }])
    return queryInterface.bulkDelete('helper_categories', null, {});
  }
};
