'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('files', [{
      name : null,
      relative_path: 'https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-256.png',
      original_name: null,
      mime_type: 'image/jpeg',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54',
    }, {
      name : null,
      relative_path: 'https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-256.png',
      original_name: null,
      mime_type: 'image/jpeg',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54',
    }, {
      name : null,
      relative_path: 'https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-256.png',
      original_name: null,
      mime_type: 'image/jpeg',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54',
    }, {
      name : null,
      relative_path: 'https://media.licdn.com/dms/image/C4E0BAQE6om_Sgbo0UQ/company-logo_200_200/0?e=2159024400&v=beta&t=4rj2JL9xLmImln9zgrL99aKwGYu3m9po-0SQJeCkQJA',
      original_name: null,
      mime_type: 'image/jpeg',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54',
    }, {
      name : null,
      relative_path: 'https://png.icons8.com/ios/1600/small-business.png',
      original_name: null,
      mime_type: 'image/jpeg',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54',
    }, {
      name : null,
      relative_path: 'https://png.icons8.com/ios/1600/small-business.png',
      original_name: null,
      mime_type: 'image/jpeg',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54',
    }, {
      name : null,
      relative_path: 'http://indomaret.co.id/logo_indomaret.png',
      original_name: null,
      mime_type: 'image/jpeg',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54',
    }, {
      name : null,
      relative_path: 'https://image.freepik.com/free-icon/city_318-112631.jpg',
      original_name: null,
      mime_type: 'image/jpeg',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54',
    }, {
      name : null,
      relative_path: 'https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-256.png',
      original_name: null,
      mime_type: 'image/jpeg',
      createdAt : '2018-05-24 04:13:54',
      updatedAt : '2018-05-24 04:13:54',
    },
    // {
    //   name : null,
    //   relative_path: 'https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-256.png',
    //   original_name: null,
    //   mime_type: 'image/jpeg',
    //   createdAt : new Date(),
    //   updatedAt : new Date(),
    // }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('files', null, {});
  }
};
