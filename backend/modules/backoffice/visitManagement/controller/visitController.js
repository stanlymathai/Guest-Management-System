const clientUserModel = require("../../client/model/clientUserModal");
const locationModel = require("../../location/model/locationModel");
const authUserModel = require("../../auth/model/authUserModel");
const visitModel = require("../model/visitModel");

const VISIT_STATUS_DENIED = visitModel.VISIT_STATUS_DENIED;
const VISIT_STATUS_PENDING = visitModel.VISIT_STATUS_PENDING;
const VISIT_STATUS_COLLECTED = visitModel.VISIT_STATUS_COLLECTED;
const VISIT_STATUS_CONFIRMED = visitModel.VISIT_STATUS_CONFIRMED;
const VISIT_STATUS_CHECKED_IN = visitModel.VISIT_STATUS_CHECK_IN;
const VISIT_STATUS_CHECKED_OUT = visitModel.VISIT_STATUS_CHECK_OUT;

const helper = require("../../common/helper");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

module.exports = {
  addVisit: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    let visitParams = {
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      email: req.body.email,
      organization: req.body.organization,
      reason: req.body.reason,

      clientId: USER.clientId,
      locationId: req.body.location,
      hostId: req.body.host_id,
      hostName: req.body.host_name,

      recurring: req.body.recurring,
      scheduleTimeFrom: req.body.schedule_time_from,
      scheduleTimeTo: req.body.schedule_time_to,
      visitStatus: VISIT_STATUS_PENDING,

      token: uuidv4(),
      createdBy: req.user.id,
    };
    visitModel
      .add(visitParams)
      .then(async (result) => {
        // send response
        if (result) res.json({ id: result.id });

        // send invitation email to visitor
        let emailData = {
          visit: { token: result.token, ...visitParams },
          host: await authUserModel.findOne({
            id: result.hostId,
            userAttributes: ["email"],
            profileAttributes: ["phone", "organization"],
          }),
          location: await locationModel.findOne(result.locationId),
        };

        helper.sendInvitationEmail(emailData);
      })
      .catch((err) => res.json({ error: err }));
  },

  editVisit: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    let visitParams = {
      id: req.body.id,
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      email: req.body.email,

      reason: req.body.reason,
      hostId: req.body.host_id,
      hostName: req.body.host_name,
      locationId: req.body.location,
      organization: req.body.organization,

      scheduleTimeFrom: req.body.schedule_time_from,
      scheduleTimeTo: req.body.schedule_time_to,
      recurring: req.body.recurring,

      visitStatus: VISIT_STATUS_PENDING,
      clientId: USER.clientId,
      updatedBy: req.user.id,
      token: uuidv4(),
    };

    visitModel
      .edit(visitParams)
      .then(async (result) => {
        if (result) res.json({ id: visitParams.id });
        // send invitation email to visitor
        let emailData = {
          visit: await visitModel.findOne(visitParams.id),
          host: await authUserModel.findOne({
            id: visitParams.hostId,
            userAttributes: ["email"],
            profileAttributes: ["phone", "organization"],
          }),
          location: await locationModel.findOne(visitParams.locationId),
        };

        helper.sendInvitationEmail(emailData);
      })
      .catch((error) => {
        res.json({ error });
        console.log(error);
      });
  },

  visitsToday: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    let queryParams = {
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "organization",
        "scheduleTimeFrom",
        "scheduleTimeTo",
        "checkInDateTime",
        "hostCollectedAt",
        "visitStatus",
        "boloStatus",
        "notifyHost",
        "locationId",
        "hostId",
        "reason",
        "image",
      ],
      visitStatus: [
        VISIT_STATUS_DENIED,
        VISIT_STATUS_PENDING,
        VISIT_STATUS_CHECKED_IN,
        VISIT_STATUS_CONFIRMED,
        VISIT_STATUS_COLLECTED,
      ],
      ...(USER.roleId != 1 && { hostId: USER.userId }),
      from: new Date(new Date(req.query.from).setHours(0, 0, 0, 0)),
      to: new Date(new Date(req.query.to).setHours(23, 59, 59)),
      orderBy: [["check_in_date_time", "ASC"]],
      clientId: USER.clientId,
    };

    let visits = await visitModel.visits(queryParams);
    res.json(visits);
  },

  upcomingVisits: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    let queryParams = {
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "hostName",
        "organization",
        "scheduleTimeFrom",
        "scheduleTimeTo",
        "visitStatus",
        "locationId",
        "hostId",
        "reason",
        "image",
      ],
      visitStatus: [
        VISIT_STATUS_DENIED,
        VISIT_STATUS_PENDING,
        VISIT_STATUS_CONFIRMED,
      ],
      from: new Date(new Date(req.query.from).setHours(0, 59, 59, 59)), // to cover the edge cases and avoid midnight
      to: new Date(+new Date(req.query.to).setHours(0, 0, 0, 0) + 864e5), //864e5 -> milliseconds in a day(upto midnight)

      clientId: USER.clientId,
      orderBy: [["schedule_time_from", "ASC"]],
      ...(USER.roleId != 1 && { hostId: USER.userId }),
    };

    let visits = await visitModel.visits(queryParams);
    res.json(visits);
  },

  calendarEvents: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    let queryParams = {
      attributes: [
        "id",
        "firstName",
        "lastName",
        "hostName",
        "organization",
        "scheduleTimeFrom",
        "scheduleTimeTo",
        "visitStatus",
        "reason",
        "locationId",
      ],
      visitStatus: [
        VISIT_STATUS_DENIED,
        VISIT_STATUS_PENDING,
        VISIT_STATUS_CONFIRMED,
        VISIT_STATUS_CHECKED_IN,
        VISIT_STATUS_COLLECTED,
        VISIT_STATUS_CHECKED_OUT,
      ],
      clientId: USER.clientId,
      from: req.query.start_of,
      to: req.query.end_of,
      ...(USER.roleId != 1 && { hostId: USER.userId }),
    };

    let visits = await visitModel.visits(queryParams);

    let events = [];
    for (const visit of visits) {
      let visitStatus = visit.visitStatus;
      let eventClass = "bg-primary";
      if (visitStatus == 0) {
        eventClass = "bg-danger";
      } else if (visitStatus >= 2) eventClass = "bg-success";

      let visitorName = `${visit.firstName} ${visit.lastName} `;
      let companyName = visit.organization;
      let hostName = visit.hostName;
      let reason = visit.reason;

      let title = `${visitorName} (${companyName}) `;

      let eventStart = new Date(visit.scheduleTimeFrom);
      let eventend = new Date(visit.scheduleTimeTo);

      let timeDifference = eventend - eventStart;
      if (timeDifference > 3600000) title += hostName + "\r\n";
      if (timeDifference > 7200000) title += reason;

      let visitData = {
        classNames: [eventClass, "bg-gradient"],
        resourceId: visit.locationId,
        start: visit.scheduleTimeFrom,
        end: visit.scheduleTimeTo,
        id: visit.id,
        visitStatus,
        visitorName,
        companyName,
        hostName,
        reason,
        title,
      };
      events.push(visitData);
    }
    res.json(events);
  },

  visitReport: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    let queryParams = {
      attributes: [
        "firstName",
        "lastName",
        "email",
        "organization",
        "hostName",
        "scheduleTimeFrom",
        "scheduleTimeTo",
        "visitStatus",
        "checkInDateTime",
        "hostCollectedAt",
        "checkOutDateTime",
        "boloStatus",
      ],
      from: new Date(new Date(req.query.from).setHours(0, 0, 0, 0)), // to cover the edge cases
      to: new Date(new Date(req.query.to).setHours(0, 0, 0, 0) + 864e5), //864e5 -> milliseconds in a day
      ...(USER.roleId != 1 && { hostId: USER.userId }),
      clientId: USER.clientId,
    };
    res.json(await visitModel.reports(queryParams));
  },

  csvReport: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    let queryParams = {
      attributes: [
        "firstName",
        "lastName",
        "email",
        "organization",
        "hostName",
        "scheduleTimeFrom",
        "scheduleTimeTo",
        "visitStatus",
        "checkInDateTime",
        "hostCollectedAt",
        "checkOutDateTime",
        "boloStatus",
      ],
      from: new Date(new Date(req.query.from).setHours(0, 0, 0, 0)), // to cover the edge cases
      to: new Date(new Date(req.query.to).setHours(0, 0, 0, 0) + 864e5), //864e5 -> milliseconds in a day
      clientId: USER.clientId,
      ...(USER.roleId != 1 && { hostId: USER.userId }),
    };
    const visits = await visitModel.reports(queryParams);

    let rowData = [];
    for (const visit of visits) {
      let visitData = {
        visitorName: `${visit.firstName} ${visit.lastName}`,
        visitorEmail: visit.email,
        hostName: visit.hostName,
        companyName: visit.organization,
        checkInDateTime: moment(visit.checkInDateTime).format("h:mm a"),
        hostCollectedAt: visit.hostCollectedAt
          ? moment(visit.hostCollectedAt).format("h:mm a")
          : "",
        checkOutDateTime: visit.checkOutDateTime
          ? moment(visit.checkOutDateTime).format("h:mm a")
          : "",
        appointmentTime: `${moment(visit.scheduleTimeFrom).format(
          "h:mm a"
        )} ⇔ ${moment(visit.scheduleTimeTo).format("h:mm a")} / ${moment(
          visit.scheduleTimeFrom
        ).format("Do MMM")}`,

        securityStatus:
          visit.boloStatus == 1
            ? "Passed"
            : visit.boloStatus == 0
            ? "Failed"
            : "unavailable",
      };
      rowData.push(visitData);
    }
    const columnDefs = [
      {
        label: "Visitor Name",
        value: "visitorName",
      },
      {
        label: "Email Address",
        value: "visitorEmail",
      },
      {
        label: "Company",
        value: "companyName",
      },
      {
        label: "Appointment Time",
        value: "appointmentTime",
      },
      {
        label: "Check-In Time",
        value: "checkInDateTime",
      },

      {
        label: "Host Collected-At",
        value: "hostCollectedAt",
      },
      {
        label: "Check-Out Time",
        value: "checkOutDateTime",
      },
      {
        label: "Host Name",
        value: "hostName",
      },

      {
        label: "Security Status",
        value: "securityStatus",
      },
    ];

    return helper.generateCSV(res, "reports.csv", columnDefs, rowData);
  },

  visitById: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    let visitData = await visitModel.findOne(req.params.id);
    if (visitData.clientId != USER.clientId) {
      res.json({ error: "User is not authorized." });
    } else res.json(visitData);
  },

  visitByToken: async function (req, res) {
    let queryParams = {
      params: { token: req.body.token.trim() },
      visitAttributes: [
        "id",
        "image",
        "email",
        "hostId",
        "firstName",
        "lastName",
        "hostName",
        "organization",
        "scheduleTimeFrom",
        "scheduleTimeTo",
        "checkInDateTime",
        "visitStatus",
        "updatedBy",
      ],

      locationAttributes: [
        "id",
        "name",
        "dateFormat",
        "timeFormat",
        "physicalAddress",
      ],
    };
    let visitProfile = await visitModel.searchOne(queryParams);
    if (!visitProfile) return res.json({ error: "Invalid/Expired Token" });

    let hostQueryParams = {
      id: visitProfile.hostId,
      userAttributes: ["id"],
      profileAttributes: ["organization"],
    };

    let hostProfile = await authUserModel.findOne({ ...hostQueryParams });

    res.json({
      ...visitProfile.dataValues,
      hostOrganization: hostProfile.dataValues.userProfile.organization,
    });
  },

  visitByregistrationCode: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    let registrationCode = req.query.code.trim();
    let tokenSnippet = registrationCode // first and last two digits
      .slice(0, 2)
      .concat(registrationCode.slice(-2));
    visitModel
      .findOne(registrationCode.slice(2, -2)) // middle one
      .then((visit) => {
        if (
          visit == null ||
          visit.clientId != USER.clientId ||
          !visit.token?.replace(/\D+/g, "").includes(tokenSnippet)
        ) {
          res.json({ message: "No visit information found" });
        } else if (visit.checkInDateTime) {
          res.json({ message: "This code is already used" });
        } else if (visit.visitStatus == 0) {
          res.json({ message: "This Visit has been denied" });
        } else {
          locationModel
            .findOne(visit.locationId)
            .then((location) => {
              let visitData = {
                id: visit.id,
                firstName: visit.firstName,
                lastName: visit.lastName,
                hostName: visit.hostName,
                locationName: location.name,
                visitStatus: visit.visitStatus,
                scheduleTimeTo: visit.scheduleTimeTo,
                scheduleTimeFrom: visit.scheduleTimeFrom,
                ...(visit.image && { image: visit.image }),
              };
              res.json(visitData);
            })
            .catch((err) => res.json(err));
        }
      })
      .catch((err) => res.json(err));
  },

  rollCallList: async function (req, res) {
    const USER = await clientUserModel.findOne({ userId: req.user.id });
    if (!USER) return res.json({ error: "User is not authorized." });

    let date = req.query.date;
    let visitList = [];
    let visitData = [];

    // visitors checked In
    let findQuery = {
      visitStatus: [VISIT_STATUS_CHECKED_IN, VISIT_STATUS_COLLECTED],
      from: new Date(new Date(date).setHours(0, 0, 0, 0)),
      to: new Date(new Date(date).setHours(23, 59, 59)), //whole day
      ...(USER.roleId != 1 && { hostId: USER.userId }),
      attributes: ["firstName", "lastName", "email"],
      orderBy: [["check_in_date_time", "ASC"]],
      clientId: USER.clientId,
    };
    let visitsPresent = await visitModel.visits(findQuery);
    if (visitsPresent.length) visitList.push(visitsPresent[0]["dataValues"]);

    // upcoming visits
    findQuery.visitStatus = [VISIT_STATUS_PENDING, VISIT_STATUS_CONFIRMED];
    let dateNow = new Date(date);
    findQuery.from = dateNow;
    findQuery.to = new Date(new Date(dateNow).setHours(dateNow.getHours() + 1));
    let upcomingVisits = await visitModel.visits(findQuery);
    if (upcomingVisits.length) visitList.push(upcomingVisits[0]["dataValues"]);

    for (const visit of visitList) {
      visitData.push({
        firstName: visit.firstName,
        lastName: visit.lastName,
        email: visit.email,
      });
    }

    const columnDefs = [
      {
        label: "First Name",
        value: "firstName",
      },
      {
        label: "Last Name",
        value: "lastName",
      },
      {
        label: "Email",
        value: "email",
      },
    ];

    return helper.generateCSV(res, "roll_call_list.csv", columnDefs, visitData);
  },
};
