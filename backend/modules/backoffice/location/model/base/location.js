module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "location",
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
      primaryFunction: {
        type: DataTypes.STRING(60),
        allowNull: true,
        field: "primary_function",
      },
      boloCheck: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        field: "bolo_check",
      },
      phone: {
        type: DataTypes.STRING(60),
        allowNull: true,
        field: "phone",
      },
      description: {
        type: DataTypes.STRING(60),
        allowNull: true,
        field: "description",
      },
      clientId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "client",
          key: "id",
        },
        unique: "fk_location_client",
        field: "client_id",
      },
      countryId: {
        type: DataTypes.STRING(60),
        allowNull: true,
        field: "country_id",
      },
      physicalAddress: {
        type: DataTypes.STRING(60),
        allowNull: true,
        field: "physical_address",
      },
      postCode: {
        type: DataTypes.STRING(60),
        allowNull: true,
        field: "post_code",
      },
      timeZone: {
        type: DataTypes.STRING(60),
        allowNull: true,
        field: "time_zone",
      },
      dateFormat: {
        type: DataTypes.STRING(60),
        allowNull: true,
        field: "date_format",
      },
      timeFormat: {
        type: DataTypes.STRING(60),
        allowNull: true,
        field: "time_format",
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
      tableName: "location",
    }
  );
};
