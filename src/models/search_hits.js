'use strict';
module.exports = (sequelize, DataTypes) => {
  var search_hits = sequelize.define('search_hits', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    keyword: {
      type: DataTypes.STRING
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
  search_hits.associate = function(models) {
    // associations can be defined here
    // search_hits.belongsTo(search_analysis, {as: search_hitsId});
    search_hits.belongsTo(models['search_analysis']);
  };
  return search_hits;
};