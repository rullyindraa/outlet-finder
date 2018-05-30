'use strict';
module.exports = (sequelize, DataTypes) => {
  var search_analysis = sequelize.define('search_analysis', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    count_keyword: {
      type: DataTypes.INTEGER
    },
    search_hitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'search_hits',
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
  search_analysis.associate = function(models) {
    // associations can be defined here
  };
  return search_analysis;
};