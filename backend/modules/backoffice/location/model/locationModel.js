const sequelize = require("sequelize");
const con = require("../../../../config/db.js");
const locationBase = require("./base/location")(con, sequelize);

module.exports = {
  add,
  edit,
  remove,
  findOne,
  locations,
  userLocations,
};

function add(params) {
  return new Promise((resolve, reject) => {
    locationBase
      .create(params)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function edit(params) {
  return new Promise((resolve, reject) => {
    locationBase
      .update(params, { where: { id: params.id } })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function remove(params, hardDelete = false) {
  return new Promise((resolve, reject) => {
    if (hardDelete) {
      locationBase
        .destroy({ where: params })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      locationBase
        .update({ status: 0 }, { where: params })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
function findOne(id) {
  return new Promise((resolve, reject) => {
    locationBase
      .findByPk(id)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function locations(clientId) {
  return new Promise((resolve, reject) => {
    locationBase
      .findAll({
        attributes: [
          "id",
          "name",
          "phone",
          "description",
          ["time_zone", "timeZone"],
          ["post_code", "postCode"],
          ["bolo_check", "boloCheck"],
          ["date_format", "dateFormat"],
          ["time_format", "timeFormat"],
          ["physical_address", "physicalAddress"],
          ["primary_function", "primaryFunction"],
        ],
        where: {
          clientId,
          status: 1,
        },
        order: [["created_at", "DESC"]],
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function userLocations(userId) {
  return new Promise((resolve, reject) => {
    con
      .query(
        `SELECT 
             location.id,
             location.name,
             location.phone,
             location.description,
             location.time_zone as timeZone,
             location.post_code as postCode,
             location.bolo_check as boloCheck,
             location.date_format as dateFormat,
             location.time_format as timeFormat,
             location.physical_address as physicalAddress,
             location.primary_function as primaryFunction
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
