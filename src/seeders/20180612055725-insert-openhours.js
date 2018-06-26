'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('open_hours', [{
      outletId : '1',
      mon_open: '01:00:00',
      mon_close: '09:00:00',
      tue_open: '01:00:00',
      tue_close: '09:00:00',
      wed_open: '01:00:00',
      wed_close: '09:00:00',
      thu_open: '01:00:00',
      thu_close: '09:00:00',
      fri_open: '01:00:00',
      fri_close: '09:00:00',
      sat_open: '01:00:00',
      sat_close: '09:00:00',
      sun_open: '01:00:00',
      sun_close: '09:00:00',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    }, {
      outletId : '2',
      mon_open: '00:00:00',
      mon_close: '00:00:00',
      tue_open: '00:00:00',
      tue_close: '00:00:00',
      wed_open: '00:00:00',
      wed_close: '00:00:00',
      thu_open: '00:00:00',
      thu_close: '00:00:00',
      fri_open: '00:00:00',
      fri_close: '00:00:00',
      sat_open: '00:00:00',
      sat_close: '00:00:00',
      sun_open: '00:00:00',
      sun_close: '00:00:00',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('open_hours', null, {});
  }
};
