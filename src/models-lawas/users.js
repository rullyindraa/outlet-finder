/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ''
    },
    email: {
      type: DataTypes.STRING(255),
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
      type: DataTypes.INTEGER(1),
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
    whitelist_ip: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      references: {
        model: 'address',
        key: 'id'
      }
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active','inactive'),
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('admin','bo'),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'users'
  });
  return users;
};
