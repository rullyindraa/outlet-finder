'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('files', [{
      relative_path: 'https://www.youtube.com/watch?v=g7ZnOq-o7rc',
      original_name: 'hhshshsnc.jpg',
      mime_type: null,
      createdAt : new Date(),
      updatedAt : new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('categories', [{
    //   name : 'Arts'
    // }])
    return queryInterface.bulkDelete('files', null, {});
  }
};
