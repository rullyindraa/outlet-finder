'use strict';
module.exports = (sequelize, DataTypes) => {
  var open_hours = sequelize.define('open_hours', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    outletId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'outlets',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    mon_open: {
      type: DataTypes.TIME,
      allowNull: true
    },
    mon_close: {
      type: DataTypes.TIME,
      allowNull: true
    },
    tue_open: {
      type: DataTypes.TIME,
      allowNull: true
    },
    tue_close: {
      type: DataTypes.TIME,
      allowNull: true
    },
    wed_open: {
      type: DataTypes.TIME,
      allowNull: true
    },
    wed_close: {
      type: DataTypes.TIME,
      allowNull: true
    },
    thu_open: {
      type: DataTypes.TIME,
      allowNull: true
    },
    thu_close: {
      type: DataTypes.TIME,
      allowNull: true
    },
    fri_open: {
      type: DataTypes.TIME,
      allowNull: true
    },
    fri_close: {
      type: DataTypes.TIME,
      allowNull: true
    },
    sat_open: {
      type: DataTypes.TIME,
      allowNull: true
    },
    sat_close: {
      type: DataTypes.TIME,
      allowNull: true
    },
    sun_open: {
      type: DataTypes.TIME,
      allowNull: true
    },
    sun_close: {
      type: DataTypes.TIME,
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
  open_hours.associate = function(models) {
    // associations can be defined here
    open_hours.belongsTo(models['outlet']);
  };
  return open_hours;
};