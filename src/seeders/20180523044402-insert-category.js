'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [{
      name: 'Arts',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce aliquam vestibulum ipsum. ',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54',
    }, {
      name: 'Business',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce aliquam vestibulum ipsum. ',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54',
    }, {
      name: 'Computers',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce aliquam vestibulum ipsum. ',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54',
    }, {
      name: 'Games',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce aliquam vestibulum ipsum. ',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54',
    }, {
      name: 'Health',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce aliquam vestibulum ipsum. ',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54',
    }, {
      name: 'News',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce aliquam vestibulum ipsum. ',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54',
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
      name: 'Food',
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
