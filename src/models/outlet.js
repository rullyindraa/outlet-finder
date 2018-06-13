'use strict';
module.exports = (sequelize, DataTypes) => {
  var outlet = sequelize.define('outlet', {
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
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    addressId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'addresses',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'set null'
    },
    fileId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'files',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'set null'
    },
    businessId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'businesses',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'restrict'
    },
    close_on_public_holiday: {
      type: DataTypes.BOOLEAN,
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
  outlet.associate = function(models) {
    // associations can be defined here
    // oulet.belongsTo(open_hours, {as: ouletId});
    // oulet.belongsTo(review, {as: ouletId});
    // oulet.belongsTo(page_view, {as: ouletId});
    // outlet.belongsTo(models['open_hours']);
    // outlet.belongsTo(models['review']);
    // outlet.belongsTo(models['page_view']);
    outlet.belongsTo(models['business']);
    outlet.belongsTo(models['address']);
    outlet.hasOne(models['page_view']);
    outlet.belongsTo(models['file']);
    outlet.hasOne(models['review']);
    outlet.hasOne(models['open_hours']);
  };
  return outlet;
};