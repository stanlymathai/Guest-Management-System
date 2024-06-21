const sequelize = require("sequelize");
const con = require("../../../../config/db.js");
const emailTemplateBase = require("./base/email_template")(con, sequelize);

module.exports = {
  add: function (params) {
    return new Promise((resolve, reject) => {
      emailTemplateBase
        .create(params)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  remove: function (params) {
    return new Promise((resolve, reject) => {
      emailTemplateBase
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
      emailTemplateBase
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
