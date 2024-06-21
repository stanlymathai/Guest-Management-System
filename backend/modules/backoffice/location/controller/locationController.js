const locationModel = require("../model/locationModel");
const locationUserModel = require("../model/locationUserModel");
const clientUserModel = require("../../client/model/clientUserModal");

module.exports = {
  getUserLocations: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    if (USER.roleId == 1) {
      res.json(await locationModel.locations(USER.clientId));
    } else res.json(await locationModel.userLocations(USER.userId));
  },

  addLocation: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER || USER.roleId != 1)
      return res.json({ error: "User is not authorized." });

    let locationModelparams = {
      countryId: 1,
      name: req.body.name,
      postCode: req.body.postCode,
      timeZone: req.body.timeZone,
      dateFormat: req.body.dateFormat,
      timeFormat: req.body.timeFormat,
      primaryFunction: req.body.primaryFunction,
      physicalAddress: req.body.physicalAddress,
      phone: req.body.phone,
      description: req.body.description,
      boloCheck: req.body.boloCheck,
      createdBy: USER.userId,
      clientId: USER.clientId,
    };

    locationModel
      .add(locationModelparams)
      .then((result) => res.json(result.dataValues))
      .catch((error) => res.json(error));
  },

  editLocation: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER || USER.roleId != 1)
      return res.json({ error: "User is not authorized." });

    let locationModelparams = {
      id: req.body.id,
      name: req.body.name,
      phone: req.body.phone,
      postCode: req.body.postCode,
      timeZone: req.body.timeZone,
      dateFormat: req.body.dateFormat,
      timeFormat: req.body.timeFormat,
      primaryFunction: req.body.primaryFunction,
      physicalAddress: req.body.physicalAddress,
      description: req.body.description,
      boloCheck: req.body.boloCheck,
      updatedBy: USER.userId,
      clientId: USER.clientId,
    };
    locationModel
      .edit(locationModelparams)
      .then(() => res.json({ id: locationModelparams.id }))
      .catch((error) => res.json(error));
  },

  removeLocation: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER || USER.roleId != 1)
      return res.json({ error: "User is not authorized." });

    let locationId = req.params.id;
    let locationUsers = await locationUserModel.getLocationUsers(locationId);
    if (locationUsers.length) {
      res.json({
        error: "Users are assigned to this location and cannot be deleted.",
      });
      return;
    }
    locationModel
      .remove({ id: locationId })
      .then(() => res.json({ id: locationId }))
      .catch((err) => res.json(err));
  },
};
