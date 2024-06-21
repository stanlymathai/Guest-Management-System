const sequelize = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const con = require('../../../../config/db.js');
const authUserBase = require('./base/auth_user')(con, sequelize);
const userProfile = require('./base/user_profile')(con, sequelize);
const clientUserBase = require('../../client/model/base/client_user')(
  con,
  sequelize
);

// Defining the associations
authUserBase.hasOne(userProfile, { foreignKey: 'userId' });
authUserBase.hasOne(clientUserBase, { foreignKey: 'userId' });

userProfile.belongsTo(authUserBase, { foreignKey: 'userId' });

module.exports = {
  add: function (params) {
    return new Promise((resolve, reject) => {
      authUserBase
        .create(params)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  update: function (params) {
    return new Promise((resolve, reject) => {
      authUserBase
        .update(params, { where: { id: params.id } })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  remove: function (params, hardDelete = false) {
    return new Promise((resolve, reject) => {
      if (hardDelete) {
        authUserBase
          .destroy({ where: params })
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        authUserBase
          .update({ status: 0 }, { where: params })
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  },
  login: function (params) {
    let credentials = { email: params.email };
    return new Promise((resolve, reject) => {
      authUserBase
        .findOne({
          where: credentials,
          include: [{ model: userProfile }, { model: clientUserBase }],
        })
        .then((user) => {
          if (!user) {
            reject({
              error: { email: "Couldn't find your MyGuest Account." },
            });
          } else if (!user.validPassword(params.password)) {
            reject({
              error: { password: "Sorry, that didn't work. please try again." },
            });
          } else if (user.status == 0) {
            reject({
              error: {
                email: 'Account deleted. Contact your support person',
              },
            });
          }

          let payload = {
            id: user.id,
            authAccessToken: user.authAccessToken,
            role: user.role,
          };
          const token = jwt.sign(
            payload,
            Buffer.from(process.env.AUTHENTICATION_KEY).toString('base64'),
            { expiresIn: '30m' }
          );
          const refreshToken = jwt.sign(
            payload,
            Buffer.from(process.env.REFRESH_TOKEN_KEY).toString('base64'),
            { expiresIn: '1y' }
          );
          //Update user and send status
          authUserBase
            .update(
              { loginCount: +user.loginCount + 1 },
              { where: { id: user.id } }
            )
            .then((res) => {
              resolve({
                token: 'Bearer ' + token,
                refreshToken,
                roleId: user.roleId,
                clientId: user.clientUser.clientId,
              });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  authenticate: function (payload) {
    return new Promise((resolve, reject) => {
      authUserBase
        .findOne({
          where: {
            id: payload.id,
            authAccessToken: payload.authAccessToken,
            status: 1,
          },
        })
        .then(function (dbUser) {
          if (!dbUser) {
            reject({ message: 'Unauthorized' });
          }
          if (dbUser) {
            resolve(dbUser);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  signUpConfirm: function (params) {
    let token = params.token.trim();
    return new Promise((resolve, reject) => {
      authUserBase
        .findOne({
          where: { authAccessToken: token },
        })
        .then((user) => {
          if (!user) {
            reject({ message: 'Invalid/Expired Token.' });
          } else {
            authUserBase
              .update(
                { authAccessToken: uuidv4(), status: 1 },
                { where: { id: user.id } }
              )
              .then((res) => resolve({ id: user.id, email: user.email }));
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  findOne: function (params) {
    return new Promise((resolve, reject) => {
      authUserBase
        .findOne({
          attributes: params.userAttributes,
          where: { id: params.id },
          ...(params.profileAttributes && {
            include: [
              { model: userProfile, attributes: params.profileAttributes },
            ],
          }),
        })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  searchOne: function (params) {
    return new Promise((resolve, reject) => {
      authUserBase
        .findOne({ where: params })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  clientUsers: function (clientId) {
    return new Promise((resolve, reject) => {
      con
        .query(
          `SELECT 
          auth_user.id as id,
          auth_user.email as email,
          auth_user.role_id as role,

          user_profile.first_name as firstName,
          user_profile.last_name as lastName,
          user_profile.phone as phone
         
          FROM auth_user  
          INNER JOIN user_profile  
          ON auth_user.id = user_profile.user_id
          INNER JOIN client_user
          ON auth_user.id = client_user.user_id

          WHERE (client_user.client_id = ${clientId}) AND (auth_user.status = 1)
          ORDER BY auth_user.created_at DESC`,

          {
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  findUsersByRoleIds: function (roles) {
    return new Promise((resolve, reject) => {
      con
        .query(
          `SELECT 
                 user.id as id,
                 user.email as email,
                 user.role_id as role_id,
                 user.status as status,
                 user.login_count as login_count,
                 user.created_by as created_by,
                 user.updated_by as updated_by,
                 user.created_at as created_at,
                 user.updated_at as updated_at,
                 profile.id as profile_id,
                 profile.first_name as first_name,
                 profile.last_name as last_name,
                 profile.phone as phone,
                 profile.country_id as country_id,
                 profile.organization as organization
                 FROM auth_user AS user
                 INNER JOIN user_profile AS profile ON user.id = profile.user_id
                 WHERE user.role_id IN (${roles})`,
          {
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  findOneUser: function (id) {
    return new Promise((resolve, reject) => {
      con
        .query(
          `SELECT 
                 user.id as id,
                 user.email as email,
                 user.role_id as role_id,
                 user.status as status,
                 user.login_count as login_count,
                 user.created_by as created_by,
                 user.updated_by as updated_by,
                 user.created_at as created_at,
                 user.updated_at as updated_at,
                 profile.id as profile_id,
                 profile.first_name as first_name,
                 profile.last_name as last_name,
                 profile.phone as phone,
                 profile.country_id as country_id,
                 profile.organization as organization
                 FROM auth_user AS user
                 INNER JOIN user_profile AS profile ON user.id = profile.user_id
                 WHERE user.id = ${id}`,
          {
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((result) => {
          resolve(result[0]);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  forgotPassword: function (email) {
    return new Promise((resolve, reject) => {
      authUserBase
        .findOne({
          where: { email },
        })
        .then((user) => {
          if (!user || user.roleId == 2) {
            reject({ error: 'User not found.' });
          } else {
            resolve({
              email: user.email,
              authAccessToken: user.authAccessToken,
            });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  resetPassword: function (payload) {
    let authAccessToken = payload.token.trim();
    let passwordHash = payload.passwordHash;

    return new Promise((resolve, reject) => {
      authUserBase
        .findOne({
          where: { authAccessToken },
        })
        .then((user) => {
          if (!user) {
            reject({ error: 'Your password reset link was already used.' });
          } else {
            authUserBase
              .update(
                { authAccessToken: uuidv4(), passwordHash },
                { where: { id: user.id } }
              )
              .then(() =>
                resolve({ message: 'Password has been reset successfully.' })
              );
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
