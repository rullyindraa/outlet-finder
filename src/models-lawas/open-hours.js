/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('open_hours', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    day: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    open_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    close_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    outlet_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      references: {
        model: 'outlets',
        key: 'id'
      }
    }
  }, {
    tableName: 'open_hours'
  });
};
