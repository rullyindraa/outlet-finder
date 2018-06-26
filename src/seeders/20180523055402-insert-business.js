'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('businesses', [{
      name: 'Wonderlabs',
      phone_number: '628112525223',
      email: 'info@wonderlabs.io',
      website: 'http://info.wonderlabs.io/',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nulla non arcu lacinia neque faucibus fringilla. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Phasellus enim erat, vestibulum vel, aliquam a, posuere eu, velit. Nullam sit amet magna in magna gravida vehicula. Integer tempor. Curabitur bibendum justo non orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla est. Aenean fermentum risus id tortor.',
      addressId: '1',
      fileId: '4',
      userId: '2',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    }, {
      name: 'Wonderfood',
      phone_number: '628112525223',
      email: 'cs@wonderfood.io',
      website: 'http://info.wonderfood.io/',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nulla non arcu lacinia neque faucibus fringilla. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Phasellus enim erat, vestibulum vel, aliquam a, posuere eu, velit. Nullam sit amet magna in magna gravida vehicula. Integer tempor. Curabitur bibendum justo non orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla est. Aenean fermentum risus id tortor.',
      addressId: '3',
      fileId: '6',
      userId: '2',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    }, {
      name: 'PT. Indomarco Prismatama',
      phone_number: '02129559100',
      email: 'cs@indomaret.co.id',
      website: 'http://indomaret.co.id/',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nulla non arcu lacinia neque faucibus fringilla. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Phasellus enim erat, vestibulum vel, aliquam a, posuere eu, velit. Nullam sit amet magna in magna gravida vehicula. Integer tempor. Curabitur bibendum justo non orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla est. Aenean fermentum risus id tortor.',
      addressId: '4',
      fileId: '7',
      userId: '3',
      createdAt : '2018-05-24 04:13:54',
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
