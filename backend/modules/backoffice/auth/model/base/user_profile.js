module.exports = function(sequelize, DataTypes) {
  let userProfile = sequelize.define('userProfile', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'auth_user',
        key: 'id'
      },
      field: 'user_id'
    },
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'last_name'
    },
    organization: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'organization'
    },
    phone: {
      type: DataTypes.CHAR(20),
      allowNull: true,
      field: 'phone'
    },
    image: {
      type: DataTypes.STRING(900),
      allowNull: true,
      field: 'image'
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'country',
        key: 'id'
      },
      field: 'country_id'
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
    tableName: 'user_profile'
  });

  return userProfile
};
