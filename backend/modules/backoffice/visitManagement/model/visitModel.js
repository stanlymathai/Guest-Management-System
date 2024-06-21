const sequelize = require("sequelize");
const { Op } = require("sequelize");
const con = require("../../../../config/db.js");
const visitBase = require("./base/visit_baseModel")(con, sequelize);
const clientBase = require("../../client/model/base/client")(con, sequelize);
const authUserBase = require("../../auth/model/base/auth_user")(con, sequelize);
const locationBase = require("../../location/model/base/location")(
  con,
  sequelize
);
// Defining the associations
visitBase.belongsTo(clientBase, { as: "client", foreignKey: "clientId" });
visitBase.belongsTo(authUserBase, { as: "host", foreignKey: "hostId" });
visitBase.belongsTo(authUserBase, { as: "owner", foreignKey: "createdBy" });
visitBase.belongsTo(locationBase, {
  as: "location",
  foreignKey: "locationId",
});

const VISIT_STATUS_DENIED = 0;
const VISIT_STATUS_PENDING = 1;
const VISIT_STATUS_CONFIRMED = 2;
const VISIT_STATUS_CHECK_IN = 3;
const VISIT_STATUS_COLLECTED = 4;
const VISIT_STATUS_CHECK_OUT = 5;
const BOLO_STATUS_PASSED = 1;
const BOLO_STATUS_FAILED = 0;
const NOTIFY_HOST_STATUS = 1;

module.exports = {
  VISIT_STATUS_DENIED,
  VISIT_STATUS_PENDING,
  VISIT_STATUS_CONFIRMED,
  VISIT_STATUS_CHECK_IN,
  VISIT_STATUS_CHECK_OUT,
  VISIT_STATUS_COLLECTED,
  BOLO_STATUS_PASSED,
  BOLO_STATUS_FAILED,
  NOTIFY_HOST_STATUS,
  add: function (params) {
    return new Promise((resolve, reject) => {
      visitBase
        .create(params)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  edit: function (params) {
    return new Promise((resolve, reject) => {
      visitBase
        .update(params, { where: { id: params.id } })
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
      visitBase
        .destroy({ where: params })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  visits: function (params) {
    return new Promise((resolve, reject) => {
      visitBase
        .findAll({
          attributes: params.attributes,
          where: {
            clientId: params.clientId,
            visitStatus: {
              [Op.or]: params.visitStatus,
            },
            [Op.or]: [
              {
                scheduleTimeFrom: {
                  [Op.between]: [params.from, params.to],
                },
              },
              {
                scheduleTimeTo: {
                  [Op.between]: [params.from, params.to],
                },
              },
            ],
            ...(params.locationIds && {
              locationId: { [Op.or]: params.locationIds },
            }),
            ...(params.hostId && { hostId: params.hostId }),
          },
          ...(params.locationAttributes && {
            include: [
              {
                model: locationBase,
                as: "location",
                attributes: params.locationAttributes,
              },
            ],
          }),
          order: params.orderBy ?? [["schedule_time_from", "ASC"]],
        })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  findOne: function (id) {
    return new Promise((resolve, reject) => {
      visitBase
        .findByPk(id)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  searchOne: function (query) {
    return new Promise((resolve, reject) => {
      visitBase
        .findOne({
          where: query.params,
          attributes: query.visitAttributes,
          ...(query.locationAttributes && {
            include: [
              {
                model: locationBase,
                as: "location",
                attributes: query.locationAttributes,
              },
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
  reports: function (params) {
    return new Promise((resolve, reject) => {
      visitBase
        .findAll({
          attributes: params.attributes,

          where: {
            clientId: params.clientId,

            [Op.or]: [
              {
                [Op.and]: [
                  {
                    checkOutDateTime: {
                      [Op.between]: [params.from, params.to],
                    },
                    visitStatus: VISIT_STATUS_CHECK_OUT,
                  },
                ],
              },
              {
                [Op.and]: [
                  {
                    checkInDateTime: {
                      [Op.between]: [params.from, params.to],
                    },
                    boloStatus: BOLO_STATUS_FAILED,
                  },
                ],
              },
            ],

            ...(params.hostId && { hostId: params.hostId }),
          },
          order: [["updated_at", "DESC"]],
        })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
