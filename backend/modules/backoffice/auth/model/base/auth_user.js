const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function(sequelize, DataTypes) {

    let authUser =  sequelize.define('authUser', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      email: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          isEmail: true
        },
        unique: {
          args: true,
          msg: 'Email address already in use!'
        },
        field: 'email'
      },
      passwordHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'password_hash'
      },
      authAccessToken: {
        type: DataTypes.STRING(255),
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        field: 'auth_access_token'
      },
      roleId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        references: {
          model: 'role',
          key: 'id'
        },
        field: 'role_id'
      },
      status: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        defaultValue: '0',
        field: 'status'
      },
      loginCount: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: '0',
        field: 'login_count'
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
      tableName: 'auth_user'
    });
    // Creating a custom method for our User model. 
  //This will check if an unhashed password entered by the 
  //user can be compared to the hashed password stored in our database

    authUser.prototype.validPassword = function(password) {
      return bcrypt.compareSync(password, this.passwordHash);
    };

    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password

    authUser.beforeCreate(user => {
      user.passwordHash = bcrypt.hashSync(user.passwordHash, saltRounds);
    });

    authUser.beforeUpdate(user => {
      if(user.passwordHash){
        user.passwordHash = bcrypt.hashSync(user.passwordHash, saltRounds);
      }
    });

    authUser.beforeBulkUpdate(({attributes,where}) => {
      if(attributes.passwordHash){
        attributes.passwordHash = bcrypt.hashSync(attributes.passwordHash, saltRounds);
      }
    });
      return authUser
}