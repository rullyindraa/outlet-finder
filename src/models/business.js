'use strict';
module.exports = (sequelize, DataTypes) => {
  var business = sequelize.define('business', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    website: {
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
      allowNull: true,
      references: {
        model: 'files',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'set null'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'restrict'
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
  business.associate = function(models) {
    // associations can be defined here
    // business.belongsTo(outlet, {as: businessId});
    //business.hasMany(models.helper_category, {foreignKey: models.helper_category.businessId});
    //business.belongsTo(models['outlet']);
    business.belongsToMany(models['category'], { through: models['helper_category'], foreignKey: models['helper_category'].bussinessId});
    business.hasOne(models['helper_category']);
    business.belongsTo(models['address']);
    business.hasOne(models['outlet']);
    business.belongsTo(models['file']);
    //business.hasOne(models['user']);
    //business.belongsTo(models['helper_category']);
    //business.belongsTo(models.helper_category, {foreignKey: models.helper_category.bussinessId});
    //business.hasMany(models['category', {through: 'helper_category', foreignKey: 'businessId'}]);
  };
  return business;
};