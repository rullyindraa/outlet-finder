'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [{
      name: 'Arts',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce aliquam vestibulum ipsum. ',
      createdAt : new Date(),
      updatedAt : new Date(),
    }, {
      name: 'Business',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce aliquam vestibulum ipsum. ',
      createdAt : new Date(),
      updatedAt : new Date(),
    }, {
      name: 'Computers',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce aliquam vestibulum ipsum. ',
      createdAt : new Date(),
      updatedAt : new Date(),
    }, {
      name: 'Games',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce aliquam vestibulum ipsum. ',
      createdAt : new Date(),
      updatedAt : new Date(),
    }, {
      name: 'Health',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce aliquam vestibulum ipsum. ',
      createdAt : new Date(),
      updatedAt : new Date(),
    }, {
      name: 'News',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce aliquam vestibulum ipsum. ',
      createdAt : new Date(),
      updatedAt : new Date(),
    }, {
      name: 'Recreation',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce aliquam vestibulum ipsum. ',
      createdAt : new Date(),
      updatedAt : new Date(),
    }, {
      name: 'References',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce aliquam vestibulum ipsum. ',
      createdAt : new Date(),
      updatedAt : new Date(),
    }, {
      name: 'Regional',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce aliquam vestibulum ipsum. ',
      createdAt : new Date(),
      updatedAt : new Date(),
    }, {
      name: 'Science',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce aliquam vestibulum ipsum. ',
      createdAt : new Date(),
      updatedAt : new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('categories', [{
    //   name : 'Arts'
    // }])
    return queryInterface.bulkDelete('categories', null, {});
  }
};
