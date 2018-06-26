'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('addresses', [{
      line1: 'Jl. Laksda Adisucipto No.27',
      line2: 'Caturtunggal, Depok',
      adm_area_lv1: 'Daerah Istimewa Yogyakarta',
      adm_area_lv2: 'Kota Yogyakarta',
      adm_area_lv3: 'Gondokusuman',
      adm_area_lv4: 'Demangan',
      raw_address: 'Jl. Laksda Adisucipto No.27 Caturtunggal, Depok',
      formatted_address: 'Jl. Laksda Adisucipto No.27, Demangan, Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55221, Indonesia',
      postal_code: '55221',
      country: 'ID',
      location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.7830011 110.3892038)'),
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54',
    }, {
      line1: 'Jl. Laksda Adisucipto No.27',
      line2: 'Caturtunggal, Depok',
      adm_area_lv1: 'Daerah Istimewa Yogyakarta',
      adm_area_lv2: 'Kota Yogyakarta',
      adm_area_lv3: 'Gondokusuman',
      adm_area_lv4: 'Demangan',
      raw_address: 'Jl. Laksda Adisucipto No.27 Caturtunggal, Depok',
      formatted_address: 'Jl. Laksda Adisucipto No.27, Demangan, Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55221, Indonesia',
      postal_code: '55221',
      country: 'ID',
      location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.7830011 110.3892038)'),
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54',
    }, 
    {
      line1: 'Jl. Komp. Colombo 24',
      line2: 'Mrican',
      adm_area_lv1: 'Daerah Istimewa Yogyakarta',
      adm_area_lv2: 'Kabupaten Sleman',
      adm_area_lv3: 'Kec. Depok',
      adm_area_lv4: 'Caturtunggal',
      raw_address: 'Jl. Komp. Colombo 24 Mrican',
      formatted_address: 'Jl. Komp. Colombo No.24, Mrican, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281, Indonesia',
      postal_code: '55281',
      country: 'ID',
      location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.778739700000002 110.3894064)'),
      createdAt : '2018-05-24 04:15:54',
      updatedAt : '2018-05-24 04:15:54',
    }, {
      line1: 'Jl. Industri Raya 17E',
      line2: 'Bedog',
      adm_area_lv1: 'Daerah Khusus Ibukota Jakarta',
      adm_area_lv2: 'Kota Jakarta Pusat',
      adm_area_lv3: 'Sawah Besar',
      adm_area_lv4: 'Gn. Sahari Utara',
      raw_address: 'Jl. Industri Raya 17E Bedog',
      formatted_address: 'Jl. Industri Raya No.17E, RT.13/RW.1, Gn. Sahari Utara, Sawah Besar, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270, Indonesia',
      postal_code: '10270',
      country: 'ID',
      location: Sequelize.fn('ST_GeomFromText', 'POINT(-6.147338599999999 106.8367337)'),
      createdAt : '2018-05-24 06:27:13',
      updatedAt : '2018-05-24 06:27:13',
    }, {
      line1: '',
      line2: 'Karang Malang',
      adm_area_lv1: 'Daerah Istimewa Yogyakarta',
      adm_area_lv2: 'Kabupaten Sleman',
      adm_area_lv3: 'Kec. Depok',
      adm_area_lv4: 'Caturtunggal',
      raw_address: 'Karang Malang',
      formatted_address: 'Jalan Colombo, Caturtunggal, Kecamatan Depok, Karang Malang, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281, Indonesia',
      postal_code: '55281',
      country: 'ID',
      location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.777563900000001 110.3845324)'),
      createdAt : '2018-05-24 06:27:13',
      updatedAt : '2018-05-24 06:27:13',
    }, 
    // {
    //   line1: 'Jl. Sawitsari',
    //   line2: 'Candok',
    //   adm_area_lv1: 'Daerah Istimewa Yogyakarta',
    //   adm_area_lv2: 'Kabupaten Sleman',
    //   adm_area_lv3: 'Kec. Depok',
    //   adm_area_lv4: 'Condongcatur',
    //   raw_address: 'Jl. Sawitsari Candok',
    //   formated_address: 'JL. Kemuning No.17, Sleman, Jl. Sawitsari, Candok, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55283, Indonesia',
    //   postal_code: '55283',
    //   country: 'ID',
    //   location: Sequelize.fn('ST_GeomFromText', 'POINT(-7.759043999999998 110.390764)'),
    //   createdAt : new Date(),
    //   updatedAt : new Date(),
    // }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('categories', [{
    //   name : 'Arts'
    // }])
    return queryInterface.bulkDelete('addresses', null, {});
  }
};
