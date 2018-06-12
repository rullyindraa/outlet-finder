'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      username: 'admin-qisty',
      email: 'qisti.rahmah@gmail.com',
      password: '$2a$10$lss4z6XTWCjvKb2TLGSQ6eJ.2We9FGPYPkG8MURctG/Z8YNelogoW',
      phone_number: null,
      token: null,
      two_fa: null,
      token_exp: null,
      secret_key: null,
      ip_address: null,
      whitelist_ip: null,
      addressId: null,
      first_name: 'Qisti',
      last_name: 'Rahmahtilah',
      status: '1',
      role: '1',
      fileId: '1',
      last_login : new Date(),
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54'
    }, {
      username: 'rullyindra',
      email: 'rullyindraa@gmail.com',
      password: '$2a$10$lss4z6XTWCjvKb2TLGSQ6eJ.2We9FGPYPkG8MURctG/Z8YNelogoW',
      phone_number: null,
      token: null,
      two_fa: null,
      token_exp: null,
      secret_key: null,
      ip_address: null,
      whitelist_ip: null,
      addressId: null,
      first_name: 'Rully',
      last_name: 'Indra',
      status: '1',
      role: '0',
      fileId: '2',
      last_login : new Date(),
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54'
    }, {
      username: 'evania1',
      email: 'evania@gmail.com',
      password: '$2a$10$lss4z6XTWCjvKb2TLGSQ6eJ.2We9FGPYPkG8MURctG/Z8YNelogoW',
      phone_number: null,
      token: null,
      two_fa: null,
      token_exp: null,
      secret_key: null,
      ip_address: null,
      whitelist_ip: null,
      addressId: null,
      first_name: 'Evania',
      last_name: 'Kurnia',
      status: '1',
      role: '0',
      fileId: '3',
      last_login : new Date(),
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54'
    }, {
      username: 'amalia12',
      email: 'amalia@gmail.com',
      password: '$2a$10$lss4z6XTWCjvKb2TLGSQ6eJ.2We9FGPYPkG8MURctG/Z8YNelogoW',
      phone_number: null,
      token: null,
      two_fa: null,
      token_exp: null,
      secret_key: null,
      ip_address: null,
      whitelist_ip: null,
      addressId: null,
      first_name: 'Lia',
      last_name: 'Amalia',
      status: '1',
      role: '0',
      fileId: '9',
      last_login : new Date(),
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('categories', [{
    //   name : 'Arts'
    // }])
    return queryInterface.bulkDelete('users', null, {});
  }
};
