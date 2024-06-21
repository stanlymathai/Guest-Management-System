/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "emailTemplate",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      template: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "template",
      },
      type: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        field: "type",
      },
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "client",
          key: "id",
        },
        unique: "fk_email_template_client",
        field: "client_id",
      },
      createdBy: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "created_by",
      },
      updatedBy: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "updated_by",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "updated_at",
      },
    },
    {
      tableName: "email_template",
    }
  );
};
