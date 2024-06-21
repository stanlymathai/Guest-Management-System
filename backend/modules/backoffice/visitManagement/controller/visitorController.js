const aws = require("../../../../config/aws");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const QRCode = require("qrcode");

const clientUserModel = require("../../client/model/clientUserModal");
const userProfileModel = require("../../auth/model/userProfileModel");
const locationModel = require("../../location/model/locationModel");
const authUserModel = require("../../auth/model/authUserModel");
const queueMessage = require("../../queue/model/queueMessage");
const visitModel = require("../model/visitModel");

const VISITORS_QR_CODES_DIR = "visitors/qrcodes/";
const VISITORS_IMAGE_DIR = "visitors/profile-pics/";

const VISITOR_CHECKED_IN_TO_LOC_MANAGER_EMAIL =
  queueMessage.VISITOR_CHECKED_IN_TO_LOC_MANAGER_EMAIL;
const NOTIFY_HOST_EMAIL = queueMessage.NOTIFY_HOST_EMAIL;
const BOLO_PASSED_HOST_EMAIL = queueMessage.BOLO_PASSED_HOST_EMAIL;
const VISITOR_SLOT_CONFIRMED_EMAIL = queueMessage.VISITOR_SLOT_CONFIRMED_EMAIL;

const VISIT_STATUS_DENIED = visitModel.VISIT_STATUS_DENIED;
const VISIT_STATUS_CHECK_IN = visitModel.VISIT_STATUS_CHECK_IN;
const VISIT_STATUS_CHECK_OUT = visitModel.VISIT_STATUS_CHECK_OUT;
const VISIT_STATUS_COLLECTED = visitModel.VISIT_STATUS_COLLECTED;
const VISIT_STATUS_CONFIRMED = visitModel.VISIT_STATUS_CONFIRMED;

const BOLO_STATUS_PASSED = visitModel.BOLO_STATUS_PASSED;
const BOLO_STATUS_FAILED = visitModel.BOLO_STATUS_FAILED;
const NOTIFY_HOST_STATUS = visitModel.NOTIFY_HOST_STATUS;

module.exports = {
  confirmVisit: async function (req, res) {
    let token = req.body.visit.trim();
    let queryParams = {
      params: { token },
      visitAttributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "hostId",
        "scheduleTimeFrom",
      ],
      locationAttributes: [
        "name",
        "dateFormat",
        "timeFormat",
        "physicalAddress",
        "postCode",
      ],
    };

    let visitData = await visitModel.searchOne(queryParams);

    let visitParams = {};
    visitParams.id = visitData.id;
    visitParams.visitStatus = VISIT_STATUS_CONFIRMED;

    // upload visitor image if we have one
    if (req.body.visitorImage) {
      try {
        const imageBuffer = Buffer.from(
          req.body.visitorImage.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
        const imageType = req.body.visitorImage.split(";")[0].split("/")[1];
        const image_name = Date.now() + "-" + Math.floor(Math.random() * 1000);
        const imagePath = VISITORS_IMAGE_DIR + `${image_name}.${imageType}`;
        await aws
          .s3Upload(imageBuffer, imagePath, `image/${imageType}`)
          .then(function (uploadPath) {
            let imageSignedPath = aws.s3PreSignedUrl(
              uploadPath,
              (expires = 60 * 10080)
            );
            visitParams.image = imageSignedPath;
          });
      } catch (err) {
        res.json(err);
      }
    }

    QRCode.toDataURL(token, async function (err, base64) {
      try {
        const base64Data = new Buffer.from(
          base64.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );

        const QRtype = base64.split(";")[0].split("/")[1];
        const QR_name = Date.now() + "-" + Math.floor(Math.random() * 1000);
        const QRpath = VISITORS_QR_CODES_DIR + `${QR_name}.${QRtype}`;
        await aws
          .s3Upload(base64Data, QRpath, `image/${QRtype}`)
          .then(function (uploadPath) {
            let qrCodesignedPath = aws.s3PreSignedUrl(
              uploadPath,
              (expires = 60 * 10080)
            );
            visitParams.qrCode = qrCodesignedPath;
            visitModel
              .edit(visitParams)
              .then(async (result) => {
                //send slot confirmation response
                if (result) res.json({ id: visitParams.id });

                // send slot confirmation email

                let hostData = await userProfileModel.searchOne({
                  userId: visitData.hostId,
                });
                let locationData = {
                  dateFormat: visitData.location.dateFormat,
                  timeFormat: visitData.location.timeFormat,
                  address:
                    visitData.location.name +
                    ", " +
                    visitData.location.physicalAddress,
                  addressUrl: `${
                    visitData.location.name +
                    "+" +
                    visitData.location.physicalAddress +
                    "+" +
                    visitData.location.postCode
                  }`
                    .split(" ")
                    .join("+"),
                };

                // generate registration code for PIN code check-In
                let tokenSnippet = token
                  .replace(/\D+/g, "") // replace all characters other than numbers
                  .match(/[1-9][0-9]*/)[0]
                  .slice(-4);

                let visitReference = [
                  tokenSnippet.slice(0, 2), // sandwich the visit ID with the generated token snippet
                  visitData.id,
                  tokenSnippet.slice(2),
                ].join("");

                let sheduleDate = moment(visitData.scheduleTimeFrom)
                  .utc()
                  .format(locationData.dateFormat);
                let sheduleTime = moment(visitData.scheduleTimeFrom)
                  .utc()
                  .format(locationData.timeFormat == 24 ? "HH:mm" : "hh:mm a");

                let payload = {
                  date: sheduleDate,
                  time: sheduleTime,
                  email: visitData.email,
                  organization: hostData.organization,
                  visitorName: `${visitData.firstName} ${visitData.lastName}`,
                  hostName: `${hostData.firstName} ${hostData.lastName}`,

                  qrImage: base64,
                  qrCode: qrCodesignedPath,
                  address: locationData.address,
                  registrationCode: visitReference,
                  addressUrl: locationData.addressUrl,
                  queueType: VISITOR_SLOT_CONFIRMED_EMAIL,
                };
                queueMessage
                  .push(JSON.stringify(payload))
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log("QRCode.toDataURL", err);
      }
    });
  },

  denyVisit: async function (req, res) {
    let queryParams = {
      params: { token: req.body.visit.trim() },
      visitAttributes: ["id"],
    };
    let visitData = await visitModel.searchOne(queryParams);

    let visitParams = {
      id: visitData.id,
      visitStatus: VISIT_STATUS_DENIED,
    };

    visitModel
      .edit(visitParams)
      .then((result) => {
        if (result) res.json({ id: visitParams.id });
      })
      .catch((err) => res.json(err));
  },

  selfRegister: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    let visitParams = {
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      email: req.body.email,
      reason: req.body.reason,
      organization: req.body.organization,

      clientId: USER.clientId,
      locationId: req.body.location,
      hostName: req.body.host_name,
      hostId: req.body.host_id,

      checkInDateTime: req.body.check_in_date_time,
      scheduleTimeFrom: req.body.schedule_time_from,
      scheduleTimeTo: req.body.schedule_time_to,
      visitStatus: VISIT_STATUS_CHECK_IN,
      notifyHost: 1,

      createdBy: req.user.id,
      token: uuidv4(),
    };

    visitModel
      .add(visitParams)
      .then((visitData) => {
        // send response
        if (visitData) res.json({ id: visitData.id });
      })
      .catch((err) => res.json({ error: err }));

    let hostParams = {
      id: visitParams.hostId,
      userAttributes: ["email"],
      profileAttributes: ["firstName", "lastName"],
    };

    let hostData = await authUserModel.findOne({ ...hostParams });
    let locationData = await locationModel.findOne(visitParams.locationId);

    let locationManagerParams = {
      id: locationData.createdBy,
      userAttributes: ["email"],
      profileAttributes: ["firstName"],
    };
    let locationManager = await authUserModel.findOne({
      ...locationManagerParams,
    });

    let sheduleDate = moment(visitParams.scheduleTimeFrom)
      .utc()
      .format(locationData.dateFormat);
    let sheduleTime = moment(visitParams.scheduleTimeFrom)
      .utc()
      .format("hh:mm a");
    if (locationData.timeFormat == 24)
      sheduleTime = moment(visitParams.scheduleTimeFrom).utc().format("HH:mm");

    // send email to Location Manager
    let payload = {
      email: locationManager.email,
      queueType: VISITOR_CHECKED_IN_TO_LOC_MANAGER_EMAIL,
      locationManagerName: locationManager.userProfile.firstName,
      visitorName: `${visitParams.firstName} ${visitParams.lastName}`,
      hostName: `${hostData.userProfile.firstName} ${hostData.userProfile.lastName}`,
      locationName: locationData.name,
      date: sheduleDate,
      time: sheduleTime,
    };

    queueMessage
      .push(JSON.stringify(payload))
      .then(() => {
        let payload = {
          email: hostData.email,
          hostName: hostData.userProfile.firstName,
          visitorName: `${visitParams.firstName} ${visitParams.lastName}`,
          locationName: locationData.name,
          date: sheduleDate,
          time: sheduleTime,
          queueType: NOTIFY_HOST_EMAIL,
        };
        // send email to Host
        queueMessage
          .push(JSON.stringify(payload))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },

  checkInVisitor: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    let visitId = req.body.visitId;
    let notifyHost = !!req.body.notifyHost;

    let visitParams = {
      id: visitId,
      updatedBy: req.user.id,
      visitStatus: VISIT_STATUS_CHECK_IN,
      ...(notifyHost && { notifyHost: 1 }),
      checkInDateTime: req.body.checkInDateTime,
    };
    visitModel
      .edit(visitParams)
      .then((result) => {
        if (result) res.json({ id: visitParams.id });
      })
      .catch((err) => console.log(err));

    let visitData = await visitModel.findOne(visitId);
    let hostParams = {
      id: visitData.hostId,
      userAttributes: ["email"],
      profileAttributes: ["firstName", "lastName"],
    };
    let hostData = await authUserModel.findOne({ ...hostParams });
    let locationData = await locationModel.findOne(visitData.locationId);

    let locationManagerParams = {
      id: visitData.createdBy,
      userAttributes: ["email"],
      profileAttributes: ["firstName"],
    };
    let locationManager = await authUserModel.findOne({
      ...locationManagerParams,
    });

    let sheduleDate = moment(visitData.scheduleTimeFrom)
      .utc()
      .format(locationData.dateFormat);
    let sheduleTime = moment(visitData.scheduleTimeFrom)
      .utc()
      .format("hh:mm a");
    if (locationData.timeFormat == 24)
      sheduleTime = moment(visitData.scheduleTimeFrom).utc().format("HH:mm");

    // send email to Location Manager
    let payload = {
      locationManagerName: locationManager.userProfile.firstName,
      email: locationManager.email,
      visitorName: `${visitData.firstName} ${visitData.lastName}`,
      hostName: `${hostData.userProfile.firstName} ${hostData.userProfile.lastName}`,
      locationName: locationData.name,
      date: sheduleDate,
      time: sheduleTime,
      queueType: VISITOR_CHECKED_IN_TO_LOC_MANAGER_EMAIL,
    };

    queueMessage
      .push(JSON.stringify(payload))
      .then(() => {
        if (notifyHost) {
          let payload = {
            email: hostData.email,
            hostName: hostData.userProfile.firstName,
            visitorName: `${visitData.firstName} ${visitData.lastName}`,
            locationName: locationData.name,
            date: sheduleDate,
            time: sheduleTime,
            queueType: NOTIFY_HOST_EMAIL,
          };

          queueMessage
            .push(JSON.stringify(payload))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  },

  checkOutVisitor: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    let visitParams = {
      id: req.body.visitId,
      updatedBy: req.user.id,
      visitStatus: VISIT_STATUS_CHECK_OUT,
      checkOutDateTime: req.body.timeStamp,
    };
    visitModel
      .edit(visitParams)
      .then((result) => {
        if (result) res.json({ id: visitParams.id });
      })
      .catch((err) => {
        res.json(err);
      });
  },

  collectVisit: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    let visitParams = {
      id: req.body.visitId,
      updatedBy: req.user.id,
      visitStatus: VISIT_STATUS_COLLECTED,
      hostCollectedAt: req.body.timeStamp,
    };

    visitModel
      .edit(visitParams)
      .then((result) => {
        if (result) res.json({ id: visitParams.id });
      })
      .catch((err) => {
        res.json(err);
      });
  },

  boloPassed: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });

    if (!USER) return res.json({ error: "User is not authorized." });

    let visitParams = {
      id: req.body.visitId,
      updatedBy: req.user.id,
      boloStatus: BOLO_STATUS_PASSED,
    };
    visitModel
      .edit(visitParams)
      .then((result) => {
        if (result) res.json({ id: visitParams.id });
      })
      .catch((err) => res.json(err));

    let visitData = await visitModel.findOne(visitParams.id);

    let hostParams = {
      id: visitData.hostId,
      userAttributes: ["email"],
      profileAttributes: ["firstName"],
    };
    let hostData = await authUserModel.findOne({ ...hostParams });
    let locationData = await locationModel.findOne(visitData.locationId);

    let sheduleDate = moment(visitData.scheduleTimeFrom)
      .utc()
      .format(locationData.dateFormat);
    let sheduleTime = moment(visitData.scheduleTimeFrom)
      .utc()
      .format("hh:mm a");
    if (locationData.timeFormat == 24)
      sheduleTime = moment(visitData.scheduleTimeFrom).utc().format("HH:mm");

    let payload = {
      email: hostData.email,
      hostName: hostData.userProfile.firstName,
      visitorName: `${visitData.firstName} ${visitData.lastName}`,
      locationName: locationData.name,
      date: sheduleDate,
      time: sheduleTime,
      queueType: BOLO_PASSED_HOST_EMAIL,
    };

    queueMessage.push(JSON.stringify(payload)).catch((err) => {
      res.json(err);
    });
  },

  boloFailed: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    let visitParams = {
      id: req.body.visitId,
      updatedBy: req.user.id,
      boloStatus: BOLO_STATUS_FAILED,
    };

    visitModel
      .edit(visitParams)
      .then((result) => {
        if (result) res.json({ id: visitParams.id });
      })
      .catch((err) => res.json(err));
  },

  notifyHost: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    let visitParams = {
      id: req.body.visitId,
      notifyHost: NOTIFY_HOST_STATUS,
      updatedBy: req.user.id,
    };
    let visitData = await visitModel.findOne(visitParams.id);

    let hostParams = {
      id: visitData.hostId,
      userAttributes: ["email"],
      profileAttributes: ["firstName"],
    };
    let hostData = await authUserModel.findOne({ ...hostParams });
    let locationData = await locationModel.findOne(visitData.locationId);

    let sheduleDate = moment(visitData.scheduleTimeFrom)
      .utc()
      .format(locationData.dateFormat);
    let sheduleTime = moment(visitData.scheduleTimeFrom)
      .utc()
      .format("hh:mm a");
    if (locationData.timeFormat == 24)
      sheduleTime = moment(visitData.scheduleTimeFrom).utc().format("HH:mm");

    visitModel.edit(visitParams).then(() => {
      // send email to host
      let payload = {
        email: hostData.email,
        hostName: hostData.userProfile.firstName,
        visitorName: `${visitData.firstName} ${visitData.lastName}`,
        locationName: locationData.name,
        date: sheduleDate,
        time: sheduleTime,
        queueType: NOTIFY_HOST_EMAIL,
      };

      queueMessage
        .push(JSON.stringify(payload))
        .then((result) => {
          if (result) res.json({ id: visitParams.id });
        })
        .catch((err) => res.json(err));
    });
  },

  removeVisit: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    let visitParams = {
      id: req.body.visitId,
      updatedBy: req.user.id,
      visitStatus: VISIT_STATUS_DENIED,
    };

    visitModel
      .edit(visitParams)
      .then((result) => {
        if (result) res.json({ id: req.body.visitId });
      })
      .catch((err) => res.json(err));
  },
};
