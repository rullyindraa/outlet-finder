'use strict';
module.exports = (sequelize, DataTypes) => {
  var address = sequelize.define('address', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    line1: {
      type: DataTypes.STRING
    },
    line2: {
      type: DataTypes.STRING
    },
    adm_area_lv1: {
      type: DataTypes.STRING
    },
    adm_area_lv2: {
      type: DataTypes.STRING
    },
    adm_area_lv3: {
      type: DataTypes.STRING
    },
    adm_area_lv4: {
      type: DataTypes.STRING
    },
    adm_area_lv4: {
      type: DataTypes.STRING
    },
    raw_address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    formatted_address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    postal_code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.GEOMETRY('POINT'),
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
  address.associate = function(models) {
    // associations can be defined here
    
    // address.belongsTo(models['user']);
    address.hasOne(models['business']);
    //address.belongsTo(models['outlet']);
  };
  return address;
};