const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const aws = require("../../../../config/aws");
const readXlsxFile = require("read-excel-file/node");

const queueMessage = require("../../queue/model/queueMessage");
const authUserModel = require("../../auth/model/authUserModel");
const locationModel = require("../../location/model/locationModel");
const visitModel = require("../../visitManagement/model/visitModel");
const clientUserModel = require("../../client/model/clientUserModal");
const userProfileModel = require("../../auth/model/userProfileModel");
const locationUserModel = require("../../location/model/locationUserModel");

const USER_ACCOUNT_ACTIVATION_EMAIL =
  queueMessage.USER_ACCOUNT_ACTIVATION_EMAIL;

const USERS_IMAGE_DIR = "users/profile-pics/";

module.exports = {
  getCurrentUser: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    let userParams = {
      id: USER.userId,
      userAttributes: ["id", "roleId", "email"],
      profileAttributes: ["phone", "organization", "firstName", "lastName"],
    };
    authUserModel
      .findOne({ ...userParams })
      .then((user) =>
        res.json({
          id: user.id,
          role: user.roleId,
          email: user.email,
          clientId: USER.clientId,
          hasEntryInInvitations: false,
          hasEntryInNotifications: false,
          phone: user.dataValues.userProfile.phone,
          organization: user.dataValues.userProfile.organization,
          name: `${user.dataValues.userProfile.firstName} ${user.dataValues.userProfile.lastName}`.trim(),
        })
      )
      .catch((err) => res.json(err));
  },

  getUserById: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER || USER.roleId != 1)
      return res.json({ error: "User is not authorized." });

    let queryParams = {
      id: req.params.id,
      userAttributes: ["id", "roleId", "email"],
      profileAttributes: ["phone", "firstName", "lastName"],
    };

    authUserModel
      .findOne({ ...queryParams })
      .then(async (user) =>
        res.json({
          id: user.id,
          role: user.roleId,
          email: user.email,
          phone: user.userProfile.phone,
          firstName: user.userProfile.firstName,
          lastName: user.userProfile.lastName,
          userLocations: await locationUserModel.getUserLocations(user.id),
        })
      )
      .catch((err) => res.json(err));
  },

  getUsers: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER || USER.roleId != 1)
      return res.json({ error: "User is not authorized." });

    let clientUsers = await authUserModel.clientUsers(USER.clientId);
    let usersWithLocation = [];
    for (let user of clientUsers) {
      let userData = {
        ...user,
        userLocations: await locationUserModel.getUserLocations(user.id),
      };
      usersWithLocation.push(userData);
    }
    res.json(usersWithLocation);
  },

  addUser: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    const userLocations = req.body.locations;
    if (!userLocations || !Object.keys(userLocations).length)
      return res.json({ error: "ser locations not found" });

    const authUserparams = {
      email: req.body.email,
      passwordHash: req.body.password,
      roleId: req.body.role,
      authAccessToken: uuidv4(),
      status: 1,
    };
    let clientUserParams = {
      clientId: USER.clientId,
      createdBy: req.user.id,
      roleId: req.body.role,
    };
    let userProfileModelparams = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      countryId: req.body.countryId,
      organization: req.body.organization,
    };
    authUserModel
      .add(authUserparams)
      .then((authResponse) => {
        const USER_ID = authResponse.id;
        // Entry to client user
        clientUserParams.userId = USER_ID;
        clientUserModel
          .add(clientUserParams)
          .then((clientUserResponse) => {
            // Entry to User profile
            userProfileModelparams.userId = USER_ID;
            userProfileModel
              .add(userProfileModelparams)
              .then((_) => {
                // link user locations
                userLocations.forEach(
                  async (locationId) =>
                    await locationUserModel.add({ userId: USER_ID, locationId })
                );
                // send response
                res.json({ id: USER_ID });
              })
              .catch((error) =>
                clientUserModel
                  .remove({ id: clientUserResponse.id })
                  .then((_) => {
                    authUserModel
                      .remove({ id: USER_ID }, (hardDelete = true))
                      .then((_) => res.json(error))
                      .catch((e) => res.json({ error: e }));
                  })
                  .catch((rollbackError) => res.json({ error: rollbackError }))
              );
          })
          .catch((error) =>
            authUserModel
              .remove({ id: USER_ID }, (hardDelete = true))
              .then((_) => res.json(error))
              .catch((rollbackError) => res.json({ error: rollbackError }))
          );
      })
      .catch((error) => res.json(error));
  },
  editUser: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    const userLocations = req.body.locations;
    if (!userLocations || !Object.keys(userLocations).length)
      return res.json({ error: "user locations not found" });

    let authUserparams = {
      id: req.body.id,
      email: req.body.email,
      passwordHash: req.body.password,
      roleId: req.body.role,
      updatedBy: USER.userId,
    };
    let userProfileModelparams = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      countryId: req.body.country,
    };

    authUserModel
      .update(authUserparams)
      .then((_) =>
        // Update user profile
        userProfileModel
          .edit(userProfileModelparams, authUserparams.id)
          .then(() =>
            // remove all relations
            locationUserModel
              .removeRelations({ userId: authUserparams.id })
              .then(async () => {
                // Link user locations
                await userLocations.forEach(
                  async (locationId) =>
                    await locationUserModel.add({
                      userId: authUserparams.id,
                      locationId,
                    })
                );
                // send userId as response
                res.json({ id: authUserparams.id });
              })
              .catch((err) => res.json(err))
          )
          .catch((err) => res.json(err))
      )
      .catch((err) => res.json(err));
  },
  removeUser: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER || USER.roleId != 1)
      return res.json({ error: "User is not authorized." });

    authUserModel
      .remove({ id: req.params.id }, (hardDelete = false))
      .then((result) => {
        if (result) res.json({ id: req.params.id });
      })
      .catch((err) => res.json(err));
  },

  changePassword: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    authUserModel
      .update({ id: USER.userId, passwordHash: req.body.password })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },

  updateProfileImage: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    try {
      const imageBuffer = Buffer.from(
        req.body.image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      const imageType = req.body.image.split(";")[0].split("/")[1];
      const image_name = Date.now() + "-" + Math.floor(Math.random() * 1000);
      const imagePath = USERS_IMAGE_DIR + `${image_name}.${imageType}`;
      await aws
        .s3Upload(imageBuffer, imagePath, `image/${imageType}`)
        .then(function (uploadPath) {
          let imageSignedPath = aws.s3PreSignedUrl(
            uploadPath,
            (expires = 60 * 10080)
          );
          userProfileModel
            .edit({ image: imageSignedPath }, USER.userId)
            .then((result) => res.json(result));
        });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },

  addMultipleHosts: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    const userLocations = req.body.locations.trim();
    if (!userLocations || !Object.keys(userLocations).length)
      return res.json({ error: "user locations not found" });

    const filePath = "/temp/uploads/" + req.file.filename;
    await readXlsxFile(filePath)
      .then(async (hosts) => {
        fs.unlinkSync(filePath);
        let HOSTS = hosts.slice(1);
        if (!HOSTS.length)
          return res.json({ error: "Uploaded file contains no data" });

        let failedUploads = [];
        let emailRegex =
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let phoneRegex = /^[0-9\+]{10,14}$/;

        for (const host of HOSTS) {
          if (host.length > 5) {
            host[4] = "Invalid data format";
            failedUploads.push(host.slice(0, 5));
            continue;
          }
          if (host[0] == null) {
            host[4] = "Invalid first name";
            failedUploads.push(host);
            continue;
          }
          if (host[1] == null) {
            host[4] = "Invalid last name";
            failedUploads.push(host);
            continue;
          }
          if (!emailRegex.test(host[2])) {
            host[4] = "Invalid email address";
            failedUploads.push(host);
            continue;
          }
          if (!phoneRegex.test(host[3])) {
            host[4] = "Invalid phone number";
            failedUploads.push(host);
            continue;
          }
          let authUserparams = {
            status: 1,
            email: host[2],
            roleId: req.body.role,
            authAccessToken: uuidv4(),
            passwordHash: Math.random().toString(36).slice(2, 10),
          };
          let clientUserParams = {
            clientId: USER.clientId,
            createdBy: req.user.id,
            roleId: req.body.role,
          };
          let userProfileModelparams = {
            organization: req.body.organization,
            countryId: req.body.country,
            firstName: host[0],
            lastName: host[1],
            phone: host[3],
          };

          await authUserModel
            .add(authUserparams)
            .then((result) => {
              userProfileModelparams.userId = result.id;
              // Entry to client user
              clientUserParams.userId = result.id;
              clientUserModel
                .add(clientUserParams)
                .then((_) =>
                  // Entry to User profile
                  userProfileModel
                    .add(userProfileModelparams)
                    .then(async () =>
                      userLocations.split(",").forEach(
                        async (locationId) =>
                          await locationUserModel.add({
                            userId: userProfileModelparams.userId,
                            locationId,
                          })
                      )
                    )
                    .then(() => {
                      let payload = {
                        email: authUserparams.email,
                        firstName: userProfileModelparams.firstName,
                        lastName: userProfileModelparams.lastName,
                        activationUrl:
                          process.env.BASEURL +
                          "reset-password?token=" +
                          authUserparams.authAccessToken,
                        queueType: USER_ACCOUNT_ACTIVATION_EMAIL,
                      };

                      queueMessage.push(JSON.stringify(payload));
                    })
                    .catch((err) => console.log(err))
                    .catch((err) => console.log(err))
                )
                .catch((err) => console.log(err));
            })
            .catch((err) => {
              host[4] = err.errors[0].message;
              failedUploads.push(host);
            });
        }
        res.json({
          uploadSucceeded: HOSTS.length - failedUploads.length,
          totalCount: HOSTS.length,
          failedUploads,
        });
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  getSpreadSheetUrl: async function (_, res) {
    let spreadSheetUrl = aws.s3PreSignedUrl(
      "public/HOST_BULK_UPLOAD.xlsx",
      (expires = 60 * 10080)
    );
    res.json(spreadSheetUrl);
  },

  sendEvacuationNotice: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    let locations = req.body.locations;
    let message = req.body.message;
    let date = req.query.date;
    let visitorEmails = [];
    try {
      let selectedLocations =
        locations ?? USER.roleId == 1
          ? (await locationModel.locations(USER.clientId)).map(({ id }) => id)
          : (await locationUserModel.getUserLocations(USER.userId)).map(
              ({ id }) => id
            );
      if (!selectedLocations) return res.json({ error: "No locations found" });

      // visitors currently on your premises
      let queryParams = {
        visitStatus: [
          visitModel.VISIT_STATUS_CHECK_IN,
          visitModel.VISIT_STATUS_COLLECTED,
        ],
        ...(USER.roleId != 1 && { hostId: USER.userId }),

        from: new Date(new Date(date).setHours(0, 0, 0, 0)),
        to: new Date(new Date(date).setHours(23, 59, 59)), //whole day

        orderBy: [["check_in_date_time", "ASC"]],
        locationIds: selectedLocations,
        clientId: USER.clientId,
        attributes: ["email"],
      };

      let visitorsCheckedIn = await visitModel.visits(queryParams);
      if (visitorsCheckedIn.length)
        visitorEmails.push(visitorsCheckedIn[0]["dataValues"]);

      // upcoming visits
      queryParams.visitStatus = [
        visitModel.VISIT_STATUS_PENDING,
        visitModel.VISIT_STATUS_CONFIRMED,
      ];
      let dateNow = new Date(date);
      queryParams.from = dateNow;
      queryParams.to = new Date(
        new Date(dateNow).setHours(dateNow.getHours() + 1)
      );
      let upcomingVisits = await visitModel.visits(queryParams);
      if (upcomingVisits.length)
        visitorEmails.push(upcomingVisits[0]["dataValues"]);

      res.json({ message: "Evacuation notice has been sent." });
    } catch (e) {
      console.log(e);
      res.json({ error: e.name });
    }
  },
};
