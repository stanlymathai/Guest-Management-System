module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "client",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: "name",
      },
      code: {
        type: DataTypes.STRING(60),
        allowNull: false,
        field: "code",
      },
      status: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        defaultValue: 1,
        field: "status",
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
      tableName: "client",
    }
  );
};
