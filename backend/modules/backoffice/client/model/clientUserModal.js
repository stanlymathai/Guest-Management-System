const sequelize = require("sequelize");
const con = require("../../../../config/db.js");
const clientUserBase = require("./base/client_user")(con, sequelize);

module.exports = {
  add: function (params) {
    return new Promise((resolve, reject) => {
      clientUserBase
        .create(params)
        .then((result) => {
          resolve({ id: result.id });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  remove: function (params) {
    return new Promise((resolve, reject) => {
      clientUserBase
        .destroy({ where: params })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  findOne: function (params) {
    return new Promise((resolve, reject) => {
      clientUserBase
        .findOne({ where: params })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
