const sequelize = require("sequelize");
const con = require("../../../../config/db.js");
const clientBase = require("./base/client")(con, sequelize);

module.exports = {
  findOne,
};

function findOne(params) {
  return new Promise((resolve, reject) => {
    clientBase
      .findOne({ where: params })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
