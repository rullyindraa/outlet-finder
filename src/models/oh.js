'use strict';
module.exports = (sequelize, DataTypes) => {
  var open_hours = sequelize.define('open_hours', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    day: {
      type: DataTypes.INTEGER
    },
    open_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    close_time: {
      type: DataTypes.TIME,
      allowNull: true
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
  };
  return open_hours;
};