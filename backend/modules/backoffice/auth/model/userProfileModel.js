const sequelize = require("sequelize");
const con = require("../../../../config/db.js");
const userProfileBase = require("./base/user_profile")(con, sequelize);

module.exports = {
  add: function (params) {
    return new Promise((resolve, reject) => {
      userProfileBase
        .create(params)
        .then((result) => {
          resolve({ id: result.id });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  edit: function (params, userId) {
    return new Promise((resolve, reject) => {
      userProfileBase
        .update(params, { where: { userId } })
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
      userProfileBase
        .findOne({ where: params })
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
        userProfileBase
          .destroy({ where: params })
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        userProfileBase
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
};
