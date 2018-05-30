'use strict';
module.exports = (sequelize, DataTypes) => {
  var category = sequelize.define('category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
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
  category.associate = function(models) {
    // associations can be defined here
    // category.belongsTo(helper_category, {as: categoryId});
    category.hasOne(models['helper_category']);
    //category.belongsTo(models['business'], {through: models['helper_category']});
  };
  return category;
};