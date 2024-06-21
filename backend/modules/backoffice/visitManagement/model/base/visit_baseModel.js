module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "visit_management",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "id",
      },
      firstName: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: "last_name",
      },
      email: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          isEmail: true,
        },
        field: "email",
      },
      organization: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: "organization",
      },
      reason: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "reason",
      },
      clientId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "client",
          key: "id",
        },
        unique: "fk_visit_management_client",
        field: "client_id",
      },
      locationId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "location",
          key: "id",
        },
        unique: "fk_visit_management_location",
        field: "location_id",
      },
      hostId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "auth_user",
          key: "id",
        },
        unique: "fk_visit_management_host",
        field: "host_id",
      },
      hostName: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: "host_name",
      },
      recurring: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
        field: "recurring",
      },
      scheduleTimeFrom: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "schedule_time_from",
      },
      scheduleTimeTo: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "schedule_time_to",
      },
      visitStatus: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
        field: "visit_status",
      },
      token: {
        type: DataTypes.STRING(255),
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        field: "token",
      },
      image: {
        type: DataTypes.STRING(900),
        allowNull: true,
        field: "image",
      },
      qrCode: {
        type: DataTypes.STRING(900),
        allowNull: true,
        field: "qr_code",
      },
      checkInDateTime: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "check_in_date_time",
      },
      checkOutDateTime: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "check_out_date_time",
      },
      notifyHost: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
        field: "notify_host",
      },
      boloStatus: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
        field: "bolo_status",
      },
      hostCollectedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "host_collected_at",
      },
      createdBy: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "auth_user",
          key: "id",
        },
        unique: "fk_visit_management_owner",
        field: "created_by",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "created_at",
      },
      updatedBy: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "updated_by",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "updated_at",
      },
    },
    {
      tableName: "visit_management",
    }
  );
};
