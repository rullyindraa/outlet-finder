'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('op_times', [{
      outletId : '1',
      day: '1',
      open_time: '01:00:00',
      close_time: '09:00:00',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    }, 
    {
      outletId : '1',
      day: '2',
      open_time: '01:00:00',
      close_time: '09:00:00',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    },
    {
      outletId : '1',
      day: '3',
      open_time: '01:00:00',
      close_time: '09:00:00',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    },
    {
      outletId : '1',
      day: '4',
      open_time: '01:00:00',
      close_time: '09:00:00',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    },
    {
      outletId : '1',
      day: '5',
      open_time: '01:00:00',
      close_time: '09:00:00',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    },
    {
      outletId : '1',
      day: '6',
      open_time: null,
      close_time: null,
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    },
    {
      outletId : '1',
      day: '7',
      open_time: null,
      close_time: null,
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    },
    {
      outletId : '2',
      day: '1',
      open_time: '01:00:00',
      close_time: '09:00:00',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    }, 
    {
      outletId : '2',
      day: '2',
      open_time: '01:00:00',
      close_time: '09:00:00',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    },
    {
      outletId : '2',
      day: '3',
      open_time: '01:00:00',
      close_time: '09:00:00',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    },
    {
      outletId : '2',
      day: '4',
      open_time: '01:00:00',
      close_time: '09:00:00',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    },
    {
      outletId : '2',
      day: '5',
      open_time: '01:00:00',
      close_time: '09:00:00',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    },
    {
      outletId : '2',
      day: '6',
      open_time: '01:00:00',
      close_time: '09:00:00',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    },
    {
      outletId : '2',
      day: '7',
      open_time: '01:00:00',
      close_time: '09:00:00',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : new Date(),
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('op_times', null, {});
  }
};
