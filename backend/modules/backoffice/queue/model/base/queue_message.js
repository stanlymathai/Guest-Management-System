/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('queueMessage', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    parentId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0',
      field: 'parent_id'
    },
    queue: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'queue'
    },
    payload: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'payload'
    },
    priority: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      field: 'priority'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at'
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deleted_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at'
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      field: 'status'
    }
  }, {
    tableName: 'queue_message'
  });
};
