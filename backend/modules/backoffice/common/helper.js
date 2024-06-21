const passport = require("passport");
const jwt = require("jsonwebtoken");

const moment = require("moment");
const { Parser } = require("json2csv");

const queueMessage = require("../queue/model/queueMessage");

module.exports = {
  // Verify API call is from node server and restrict API from browser
  verifyAccessScheduler: function (req, res, next) {
    if (req.headers["access-scheduler"] == "true") {
      next();
    } else {
      res.status(401);
      res.end();
    }
  },
  verifyAuthentication: function (req, res, next) {
    passport.authenticate("jwt", function (err, user, info) {
      try {
        let isTokenExpired = 0;
        const payload = payloadFromRefreshToken(req.headers.refreshtoken);

        if (info && info.name == "TokenExpiredError") {
          isTokenExpired = 1;
          const token = jwt.sign(
            payload,
            Buffer.from(process.env.AUTHENTICATION_KEY).toString("base64"),
            { expiresIn: "30m" }
          );
          req.headers.authorization = "Bearer " + token;
          res.setHeader("token", "Bearer " + token);
          res.setHeader("isTokenExpired", isTokenExpired);
          req.user = { id: payload.id };
          next();
        } else if (!err && user) {
          req.user = { id: payload.id };
          next();
        } else if (!user || err) {
          res.status(401);
          res.end();
          return;
        }
      } catch (err) {
        if (err) next(err);
        res.status(401);
        res.end();
        return;
      }
    })(req, res, next);
  },
  payloadFromRefreshToken: payloadFromRefreshToken,

  sendInvitationEmail: async function (payload) {
    let emailData = {
      slotUrl:
        `${process.env.BASEURL}visit/confirm-slot?visit=${payload.visit.token}`.trim(),
      visitorName:
        `${payload.visit.firstName} ${payload.visit.lastName}`.trim(),
      greetings: payload.visit.firstName,
      company: payload.visit.organization,
      hostName: payload.visit.hostName,
      email: payload.visit.email,

      hostEmail: payload.host.email,
      hostPhone: payload.host.dataValues.userProfile.phone,
      hostOrganization: payload.host.dataValues.userProfile.organization,

      locationName: payload.location.name,
      locationAddress:
        payload.location.name + ", " + payload.location.physicalAddress,
      locationUrl:
        `${payload.location.name}+${payload.location.physicalAddress}+${payload.location.postCode}`
          .split(" ")
          .join("+"),

      date: moment(payload.visit.scheduleTimeFrom)
        .utc()
        .format(payload.location.dateFormat),
      time: `${moment(payload.visit.scheduleTimeFrom)
        .utc()
        .format(
          payload.location.timeFormat == 24 ? "HH:mm" : "hh:mm a"
        )} ⇔ ${moment(payload.visit.scheduleTimeTo)
        .utc()
        .format(
          payload.location.timeFormat == 24 ? "HH:mm" : "hh:mm a"
        )}`.trim(),

      queueType: queueMessage.VISITOR_INVITATION_EMAIL,
    };
    queueMessage
      .push(JSON.stringify(emailData))
      .catch((err) => console.log("sendInvitationEmail", err));
  },

  generateCSV: (res, fileName, fields, data) => {
    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(data);
    res.header("Content-Type", "text/csv");
    res.attachment(fileName);
    return res.send(csv);
  },
};

function payloadFromRefreshToken(token) {
  return jwt.verify(
    token,
    Buffer.from(process.env.REFRESH_TOKEN_KEY).toString("base64"),
    function (err, payload) {
      if (payload) {
        delete payload.iat;
        delete payload.exp;
        return payload;
      }
    }
  );
}
