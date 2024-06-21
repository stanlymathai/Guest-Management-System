const sequelize = require("sequelize");
const con = require("../../../../config/db.js");
const locationUserBase = require("./base/location_user")(con, sequelize);
const locationBase = require("./base/location")(con, sequelize);
const authUserBase = require("../../auth/model/base/auth_user")(con, sequelize);

// Defining the associations
locationUserBase.belongsTo(locationBase, { foreignKey: "locationId" });
locationUserBase.belongsTo(authUserBase, { foreignKey: "userId" });

module.exports = {
  add,
  removeRelations,
  getLocationUsers,
  getUserLocations,
};

function add(params) {
  return new Promise((resolve, reject) => {
    locationUserBase
      .create(params)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function getLocationUsers(locationId) {
  return new Promise((resolve, reject) => {
    locationUserBase
      .findAll({
        attributes: ["id"],
        where: { locationId },
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function getUserLocations(userId) {
  return new Promise((resolve, reject) => {
    con
      .query(
        `SELECT 
             location.id
             FROM location_user
             INNER JOIN location ON location.id = location_user.location_id
             WHERE (location_user.user_id = ${userId}) AND (location.status = 1)
             ORDER BY location.created_at DESC`,
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
}
function removeRelations(params) {
  return new Promise((resolve, reject) => {
    locationUserBase
      .destroy({ where: params })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
