module.exports = function(sequelize, DataTypes) {

    let userLog =  sequelize.define('userLog', {
      id: {
        type: DataTypes.INTEGER,
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
      userType: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: 'user_type'
      },
      idAddress: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: 'ip_address'
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'last_login'
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
      tableName: 'user_log'
    });
   
      return userLog
}