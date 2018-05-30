'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('addresses', [{
      line1: 'Jalan Laksda Adi Sucipto no 27',
      line2: 'Caturtunggal, Depok, Sleman',
      adm_area_lv1: 'Yogyakarta',
      adm_area_lv2: 'Sleman',
      adm_area_lv3: 'Depok',
      adm_area_lv4: 'Caturtunggal',
      raw_address: 'Jl Laksda Adi Sucipto no 27',
      formated_address: 'Jalan Laksda Adi Sucipto no 27, Depok, Yogyakarta, 55238',
      postal_code: '55238',
      country: 'ID',
      location: null,
      createdAt : new Date(),
      updatedAt : new Date(),
    }, {
      line1: 'Jalan Kompleks Colombo No 24',
      line2: 'Caturtunggal, Depok, Sleman',
      adm_area_lv1: 'Yogyakarta',
      adm_area_lv2: 'Sleman',
      adm_area_lv3: 'Depok',
      adm_area_lv4: 'Caturtunggal',
      raw_address: 'Jl Kompleks Colombo No 24',
      formated_address: 'Jalan Kompleks Colombo No 24, Depok, Yogyakarta, 55238',
      postal_code: '55238',
      country: 'ID',
      location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.778737 110.389407)'),
      createdAt : new Date(),
      updatedAt : new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('categories', [{
    //   name : 'Arts'
    // }])
    return queryInterface.bulkDelete('addresses', null, {});
  }
};
