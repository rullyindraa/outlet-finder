/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('files', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    relative_path: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    user_id: {
      type: DataTypes.INTEGER(255).UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    original_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mime_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    file_size: {
      type: DataTypes.INTEGER(6),
      allowNull: true
    },
    hash: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'files'
  });
};
