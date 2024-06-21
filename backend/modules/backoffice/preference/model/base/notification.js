module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "notification",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: "id",
      },
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "client_id",
      },
      type: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        field: "type",
      },
      userEmail: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        field: "user_email",
      },
      userSMS: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        field: "user_sms",
      },
      hostEmail: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        field: "host_email",
      },
      hostSMS: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        field: "host_sms",
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
      tableName: "notification",
    }
  );
};
