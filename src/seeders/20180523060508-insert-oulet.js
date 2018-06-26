'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('outlets', [{
      name: 'Wonderlabs Amstrong',
      phone_number: '628112525223',
      email: 'info@wonderlabs.io',
      website: 'http://info.wonderlabs.io/',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nulla non arcu lacinia neque faucibus fringilla. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Phasellus enim erat, vestibulum vel, aliquam a, posuere eu, velit. Nullam sit amet magna in magna gravida vehicula. Integer tempor. Curabitur bibendum justo non orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla est. Aenean fermentum risus id tortor.',
      addressId: '2',
      fileId: '5',
      businessId: '1',
      close_on_public_holiday: null,
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    }, {
      name: 'Indomaret Point Colombo',
      phone_number: '02129559100',
      email: 'cs@indomaret.co.id',
      website: 'http://indomaret.co.id/',
      description: 'Lorem ipsum dolor sit amet',
      addressId: '5',
      fileId: '8',
      businessId: '3',
      close_on_public_holiday: null,
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('outlets', null, {});
  }
};
