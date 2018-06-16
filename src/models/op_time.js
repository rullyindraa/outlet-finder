'use strict';
module.exports = (sequelize, DataTypes) => {
  var op_time = sequelize.define('op_time', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    day: {
      type: DataTypes.ENUM('0','1','2','3','4','5','6'),
      allowNull: false,
      defaultValue: null
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
  op_time.associate = function(models) {
    op_time.belongsTo(models['outlet']);
  };
  return op_time;
};