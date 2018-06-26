'use strict';
module.exports = (sequelize, DataTypes) => {
  var file = sequelize.define('file', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    relative_path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    original_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mime_type: {
      type: DataTypes.STRING,
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
  file.associate = function(models) {
    // associations can be defined here
    // file.belongsTo(user, {as: fileId});
    // file.belongsTo(business, {as: fileId});
    // file.belongsTo(outlet, {as: fileId});
    // file.belongsTo(models['user']);
    // file.belongsTo(models['business']);
    // file.belongsTo(models['outlet']);
    file.hasOne(models['business']);
    file.hasOne(models['user']);
    file.hasOne(models['outlet']);
  };
  return file;
};