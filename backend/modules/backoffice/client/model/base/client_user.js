module.exports = function (sequelize, DataTypes) {
  let clientUser = sequelize.define(
    "clientUser",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        field: "id",
      },
      clientId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "client",
          key: "id",
        },
        unique: "fk_client_user_client",
        field: "client_id",
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "auth_user",
          key: "user_id",
        },
        unique: "fk_client_user_user",
        field: "user_id",
      },
      roleId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        references: {
          model: "role",
          key: "id",
        },
        field: "role_id",
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
      tableName: "client_user",
    }
  );

  return clientUser;
};
