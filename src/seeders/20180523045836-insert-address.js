'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('addresses', [{
      line1: 'Jl. Laksda Adisucipto',
      line2: 'No.27',
      adm_area_lv1: 'Daerah Istimewa Yogyakarta',
      adm_area_lv2: 'Kota Yogyakarta',
      adm_area_lv3: 'Gondokusuman',
      adm_area_lv4: 'Demangan',
      raw_address: 'Jl. Laksda Adisucipto No.27',
      formated_address: 'Jl. Laksda Adisucipto No.27, Demangan, Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55221, Indonesia',
      postal_code: '55221',
      country: 'ID',
      location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.7830011 110.3892038)'),
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54',
    }, {
      line1: 'Jl. Timoho',
      line2: 'No.90',
      adm_area_lv1: 'Daerah Istimewa Yogyakarta',
      adm_area_lv2: 'Kota Yogyakarta',
      adm_area_lv3: 'Gondokusuman',
      adm_area_lv4: 'Baciro',
      raw_address: 'Jl. Timoho No.90',
      formated_address: 'Jl. Timoho No.90, Baciro, Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55251, Indonesia',
      postal_code: '55251',
      country: 'ID',
      location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.790180599999999 110.3935235)'),
      createdAt : '2018-05-24 06:31:38',
      updatedAt : '2018-05-24 06:31:38',
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
