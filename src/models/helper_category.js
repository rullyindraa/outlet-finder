'use strict';
module.exports = (sequelize, DataTypes) => {
  var helper_category = sequelize.define('helper_category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    businessId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'businesses',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'set null'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'set null'
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
  helper_category.associate = function(models) {
    // associations can be defined here
    // helper_category.belongsTo(models['category'], {foreignKey: models.category.categoryId});
    // helper_category.belongsTo(models['business'], {foreignKey: models.business.businessId});
    //User.belongsTo(Company, {foreignKey: 'fk_company'})
    //helper_category.hasOne(models.business, {foreignKey: models.business.businessId});
    //helper_category.belongsTo(models.business, {foreignKey: models.business.businessId});
    helper_category.belongsTo(models['business']);
    helper_category.belongsTo(models['category']);
  };
  return helper_category;
};