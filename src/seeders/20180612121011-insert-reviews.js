'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('reviews', [{
      name : 'ani',
      email : 'ani2029@gmail.com',
      content : 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
      rating : '5',
      token : null,
      ip_address : null,
      outletId : '1',
      createdAt : '2018-05-28 04:13:54',
      updatedAt : new Date(),
      status : '1'
    }, {
      name : 'nia',
      email : 'nia2829@gmail.com',
      content : 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
      rating : '5',
      token : null,
      ip_address : null,
      outletId : '1',
      createdAt : '2018-05-28 04:13:54',
      updatedAt : new Date(),
      status : '1'
    }, {
      name : 'ina',
      email : 'ina111@gmail.com',
      content : 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
      rating : '4',
      token : null,
      ip_address : null,
      outletId : '1',
      createdAt : '2018-05-28 04:13:54',
      updatedAt : new Date(),
      status : null
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('reviews', null, {});
  }
};
