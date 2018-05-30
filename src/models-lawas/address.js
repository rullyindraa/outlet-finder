/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('address', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    line1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    line2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    adm_area_lv1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    adm_area_lv2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    adm_area_lv3: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    adm_area_lv4: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    raw_address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    formated_address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    postal_code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    latitude: {
      type: "POINT",
      allowNull: true
    },
    longitude: {
      type: "POINT",
      allowNull: true
    }
  }, {
    tableName: 'address'
  });
};
