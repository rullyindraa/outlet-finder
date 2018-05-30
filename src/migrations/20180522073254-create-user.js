'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(32),
        unique: true,
        allowNull: false,
        defaultValue: ''
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        defaultValue: ''
      },
      password: {
        type: Sequelize.CHAR(60),
        allowNull: false,
        defaultValue: ''
      },
      phone_number: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      token: {
        type: Sequelize.CHAR(60),
        allowNull: true
      },
      two_fa: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      token_exp: {
        type: Sequelize.DATE,
        allowNull: true
      },
      secret_key: {
        type: Sequelize.CHAR(32),
        allowNull: true
      },
      ip_address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      whitelist_ip: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      addressId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'addresses',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      role: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      fileId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'files',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};