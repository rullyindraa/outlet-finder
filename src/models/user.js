'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ''
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    password: {
      type: DataTypes.CHAR(60),
      allowNull: false,
      defaultValue: ''
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    token: {
      type: DataTypes.CHAR(60),
      allowNull: true
    },
    two_fa: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    token_exp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    secret_key: {
      type: DataTypes.CHAR(32),
      allowNull: true
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    whitelist_ip: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    addressId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'addresses',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    role: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    fileId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'files',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    // user.belongsTo(business, {as: userId});
    user.hasOne(models['business']);
    user.belongsTo(models['file']);
  };
  return user;
};