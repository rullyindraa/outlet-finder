'use strict';
module.exports = (sequelize, DataTypes) => {
  var page_view = sequelize.define('page_view', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    viewed_date: {
      type: DataTypes.DATE,
      allowNull: false,
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
  page_view.associate = function(models) {
    // associations can be defined here
  };
  return page_view;
};