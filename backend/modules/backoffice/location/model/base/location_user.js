/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('location_user', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    locationId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'location',
        key: 'id'
      },
      unique: "fk_location_user_location_id",
      field: 'location_id'
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'auth_user',
        key: 'user_id'
      },
      unique: "fk_location_user_user_id",
      field: 'user_id'
    },
    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'created_by'
    },
    updatedBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'updated_by'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at'
    }
  }, {
    tableName: 'location_user',
    });
};
