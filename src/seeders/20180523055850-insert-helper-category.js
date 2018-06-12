'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('helper_categories', [{
      businessId: '1',
      categoryId: '2',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    },
    {
      businessId: '1',
      categoryId: '3',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    }, {
      businessId: '2',
      categoryId: '10',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    }, {
      businessId: '3',
      categoryId: '2',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    }, {
      businessId: '3',
      categoryId: '5',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    }, {
      businessId: '3',
      categoryId: '10',
      createdAt : '2018-05-24 04:13:54',
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
