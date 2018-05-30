/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('page_views', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    oulet_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      references: {
        model: 'outlets',
        key: 'id'
      }
    },
    location: {
      type: "POINT",
      allowNull: true
    },
    date_views: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'page_views'
  });
};
