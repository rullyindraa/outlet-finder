'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('page_views', [{
      viewed_date : '2018-05-26 04:13:54',
      outletId : '1',
      location : Sequelize.fn('ST_GeomFromText', 'POINT(-7.7600473 110.394995)'),
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    }, {
      viewed_date : '2018-05-26 05:13:54',
      outletId : '1',
      location : Sequelize.fn('ST_GeomFromText', 'POINT(-7.7600473 110.394995)'),
      createdAt : '2018-05-24 05:13:54',
      updatedAt : new Date(),
    }, {
      viewed_date : '2018-05-27 04:13:54',
      outletId : '1',
      location : Sequelize.fn('ST_GeomFromText', 'POINT(-7.7600473 110.394995)'),
      createdAt : '2018-05-27 04:13:54',
      updatedAt : new Date(),
    }, {
      viewed_date : '2018-05-30 04:13:54',
      outletId : '1',
      location : Sequelize.fn('ST_GeomFromText', 'POINT(-7.7600473 110.394995)'),
      createdAt : '2018-05-30 04:13:54',
      updatedAt : new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('page_views', null, {});
  }
};
