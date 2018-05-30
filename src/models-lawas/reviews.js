/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('search_analysis', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    search_hits_id: {
      type: DataTypes.INTEGER(255).UNSIGNED,
      allowNull: true,
      references: {
        model: 'search_hits',
        key: 'id'
      }
    },
    count_keyword: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    }
  }, {
    tableName: 'search_analysis'
  });
};
