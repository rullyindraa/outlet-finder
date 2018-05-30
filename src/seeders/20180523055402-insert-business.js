'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('businesses', [{
      name: 'Neko',
      phone_number: '0818181818',
      email: 'neko@gmail.com',
      website: 'neko.co.id',
      description: 'Lorem ipsum dolor sit amet',
      addressId: '1',
      fileId: '1',
      userId: '1',
      createdAt : new Date(),
      updatedAt : new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('categories', [{
    //   name : 'Arts'
    // }])
    return queryInterface.bulkDelete('businesses', null, {});
  }
};
