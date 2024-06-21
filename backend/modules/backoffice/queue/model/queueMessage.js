const sequelize = require('sequelize');
const con = require('../../../../config/db');
const queueMessage = require('./base/queue_message')(con, sequelize);
const emailTemplate = require('./base/email_template')(con, sequelize);
const authUserModel = require('../../auth/model/authUserModel');
const mailer = require('../../../../config/mailer');

const USER_ACCOUNT_ACTIVATION_EMAIL_TEMPLATE = 1;
const VISITOR_INVITATION_EMAIL_TEMPLATE = 2;
const VISITOR_SLOT_CONFIRMED_EMAIL_TEMPLATE = 3;
const VISITOR_CHECKED_IN_TO_LOC_MANAGER_EMAIL_TEMPLATE = 4;
const BOLO_PASSED_HOST_EMAIL_TEMPLATE = 5;
const NOTIFY_HOST_EMAIL_TEMPLATE = 6;
const USER_ACCOUNT_FORGOT_PASSWORD_EMAIL_TEMPLATE = 7;

const USER_ACCOUNT_ACTIVATION_EMAIL = 'USER_ACCOUNT_ACTIVATION_EMAIL';
const VISITOR_INVITATION_EMAIL = 'VISITOR_INVITATION_EMAIL';
const VISITOR_SLOT_CONFIRMED_EMAIL = 'VISITOR_SLOT_CONFIRMED_EMAIL';
const VISITOR_CHECKED_IN_TO_LOC_MANAGER_EMAIL =
  'VISITOR_CHECKED_IN_TO_LOC_MANAGER_EMAIL';
const BOLO_PASSED_HOST_EMAIL = 'BOLO_PASSED_HOST_EMAIL';
const NOTIFY_HOST_EMAIL = 'NOTIFY_HOST_EMAIL';
const USER_ACCOUNT_OTP_PASSWORD_EMAIL = 'USER_ACCOUNT_OTP_PASSWORD_EMAIL';

module.exports = {
  USER_ACCOUNT_ACTIVATION_EMAIL,
  VISITOR_INVITATION_EMAIL,
  VISITOR_SLOT_CONFIRMED_EMAIL,
  VISITOR_CHECKED_IN_TO_LOC_MANAGER_EMAIL,
  BOLO_PASSED_HOST_EMAIL,
  NOTIFY_HOST_EMAIL,
  USER_ACCOUNT_OTP_PASSWORD_EMAIL,
  push: function (payload) {
    return new Promise((resolve, reject) => {
      let payloadObj = JSON.parse(payload);
      queueMessage
        .create({
          queue: payloadObj.queueType,
          payload: payload,
          priority: 100,
          status: 0,
        })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  listen: function (params) {
    return new Promise((resolve, reject) => {
      queueMessage
        .findAll({
          where: {
            status: 0,
          },
          order: [['createdAt', 'ASC']],
        })
        .then((result) => {
          result.forEach((queue, key) => {
            let payload = JSON.parse(queue.payload);
            if (payload.queueType == USER_ACCOUNT_ACTIVATION_EMAIL) {
              sendActivationLinkMailTemplate(
                payload,
                queue.id,
                key + 1,
                function (err, result) {
                  err ? reject(err) : resolve(null, data);
                }
              );
            }
            if (payload.queueType == VISITOR_INVITATION_EMAIL) {
              sendVisitorInvitationLinkMailTemplate(
                payload,
                queue.id,
                key + 1,
                function (err, result) {
                  err ? reject(err) : resolve(null, data);
                }
              );
            }
            if (payload.queueType == VISITOR_SLOT_CONFIRMED_EMAIL) {
              sendVisitorConfirmedMailTemplate(
                payload,
                queue.id,
                key + 1,
                function (err, result) {
                  err ? reject(err) : resolve(null, data);
                }
              );
            }
            if (payload.queueType == VISITOR_CHECKED_IN_TO_LOC_MANAGER_EMAIL) {
              sendVisitorCheckedInToLocManagerMailTemplate(
                payload,
                queue.id,
                key + 1,
                function (err, result) {
                  err ? reject(err) : resolve(null, data);
                }
              );
            }
            if (payload.queueType == BOLO_PASSED_HOST_EMAIL) {
              sendBoloPassedHostMailTemplate(
                payload,
                queue.id,
                key + 1,
                function (err, result) {
                  err ? reject(err) : resolve(null, data);
                }
              );
            }
            if (payload.queueType == NOTIFY_HOST_EMAIL) {
              sendNotifyHostMailTemplate(
                payload,
                queue.id,
                key + 1,
                function (err, result) {
                  err ? reject(err) : resolve(null, data);
                }
              );
            }
            if (payload.queueType == USER_ACCOUNT_OTP_PASSWORD_EMAIL) {
              sendForgotPasswordMailTemplate(
                payload,
                queue.id,
                key + 1,
                function (err, result) {
                  err ? reject(err) : resolve(null, data);
                }
              );
            }
          });
          resolve(null, result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  update: update,
};

function sendActivationLinkMailTemplate(payload, queueId, key, callback) {
  emailTemplate
    .findOne({
      attributes: ['template'],
      where: { type: USER_ACCOUNT_ACTIVATION_EMAIL_TEMPLATE },
    })
    .then(function (result) {
      if (result.template) {
        data = result.template;
        data = data.replace('${firstName}', payload.firstName);
        data = data.replace('${activationUrl}', payload.activationUrl);
        sendMail(
          queueId,
          data,
          payload,
          key,
          'Activate your MyGuest account',
          function (err, result) {
            return err ? callback(err) : callback(null, result);
          }
        );
      }
    })
    .catch(function (err) {
      delete payload.password;
      err.payload = payload;
      update({ status: 2 }, queueId, function (result) {
        return callback(err);
      });
    });
}
function sendVisitorInvitationLinkMailTemplate(
  payload,
  queueId,
  key,
  callback
) {
  emailTemplate
    .findOne({
      attributes: ['template'],
      where: { type: VISITOR_INVITATION_EMAIL_TEMPLATE },
    })
    .then(function (result) {
      if (result.template) {
        data = result.template;
        data = data.replace('${greetings}', payload.greetings);
        data = data.replace('${visitorName}', payload.visitorName);
        data = data.replace('${company}', payload.company);

        data = data.replace('${hostName}', payload.hostName);
        data = data.replace('${hostPhone}', payload.hostPhone);
        data = data.replace('${hostEmail}', payload.hostEmail);
        data = data.replace('${hostOrganization}', payload.hostOrganization);

        data = data.replace('${date}', payload.date);
        data = data.replace('${time}', payload.time);
        data = data.replace('${slotUrl}', payload.slotUrl);

        data = data.replace('${locationName}', payload.locationName);
        data = data.replace('${locationAddress}', payload.locationAddress);
        data = data.replace('${locationUrl}', payload.locationUrl);

        data = data.replace('${directions}', payload.directions ?? '');
        data = data.replace('${additionalText}', payload.additionalText ?? '');
        data = data.replace(
          '${logoUrl}',
          payload.logoUrl ??
            'https://s3-eu-west-1.amazonaws.com/static.backoffice.io/backoffice/img/logos/backoffice-gms-logo-icon_mail.png'
        );

        sendMail(
          queueId,
          data,
          payload,
          key,
          'Invitation Email',
          function (err, result) {
            return err ? callback(err) : callback(null, result);
          }
        );
      }
    })
    .catch(function (err) {
      delete payload.password;
      err.payload = payload;
      update({ status: 2 }, queueId, function (result) {
        return callback(err);
      });
    });
}
function sendVisitorConfirmedMailTemplate(payload, queueId, key, callback) {
  emailTemplate
    .findOne({
      attributes: ['template'],
      where: { type: VISITOR_SLOT_CONFIRMED_EMAIL_TEMPLATE },
    })
    .then(function (result) {
      if (result.template) {
        data = result.template;
        data = data.replace('${organization1}', payload.organization);
        data = data.replace('${visitorName}', payload.visitorName);
        data = data.replace('${hostName}', payload.hostName);
        data = data.replace('${time}', payload.time);
        data = data.replace('${date}', payload.date);
        data = data.replace('${addressUrl}', payload.addressUrl);
        data = data.replace('${address}', payload.address);
        data = data.replace('${qrCode}', payload.qrCode);
        data = data.replace('${registrationCode}', payload.registrationCode);
        data = data.replace('${organization2}', payload.organization);

        payload.attachments = [
          {
            filename: payload.visitorName + ' ' + 'QR Code.png',
            content: Buffer.from(payload.qrImage.split('base64,')[1], 'base64'),
            encoding: 'base64',
          },
        ];
        sendMail(
          queueId,
          data,
          payload,
          key,
          'Slot Confirmed',
          function (err, result) {
            return err ? callback(err) : callback(null, result);
          }
        );
      }
    })
    .catch(function (err) {
      delete payload.password;
      err.payload = payload;
      update({ status: 2 }, queueId, function (result) {
        return callback(err);
      });
    });
}
function sendVisitorCheckedInToLocManagerMailTemplate(
  payload,
  queueId,
  key,
  callback
) {
  emailTemplate
    .findOne({
      attributes: ['template'],
      where: { type: VISITOR_CHECKED_IN_TO_LOC_MANAGER_EMAIL_TEMPLATE },
    })
    .then(function (result) {
      if (result.template) {
        data = result.template;
        data = data.replace('${locationManager}', payload.locationManagerName);
        data = data.replace('${hostName}', payload.hostName);
        data = data.replace('${visitorName}', payload.visitorName);
        data = data.replace('${locationName}', payload.locationName);
        data = data.replace('${date}', payload.date);
        data = data.replace('${time}', payload.time);
        sendMail(
          queueId,
          data,
          payload,
          key,
          'Visitor checked in',
          function (err, result) {
            return err ? callback(err) : callback(null, result);
          }
        );
      }
    })
    .catch(function (err) {
      delete payload.password;
      err.payload = payload;
      update({ status: 2 }, queueId, function (result) {
        return callback(err);
      });
    });
}
function sendBoloPassedHostMailTemplate(payload, queueId, key, callback) {
  emailTemplate
    .findOne({
      attributes: ['template'],
      where: { type: BOLO_PASSED_HOST_EMAIL_TEMPLATE },
    })
    .then(function (result) {
      if (result.template) {
        data = result.template;
        data = data.replace('${hostName}', payload.hostName);
        data = data.replace('${visitorName}', payload.visitorName);
        data = data.replace('${locationName}', payload.locationName);
        data = data.replace('${date}', payload.date);
        data = data.replace('${time}', payload.time);
        sendMail(
          queueId,
          data,
          payload,
          key,
          'Visitor passed BOLO check',
          function (err, result) {
            return err ? callback(err) : callback(null, result);
          }
        );
      }
    })
    .catch(function (err) {
      delete payload.password;
      err.payload = payload;
      update({ status: 2 }, queueId, function (result) {
        return callback(err);
      });
    });
}
function sendNotifyHostMailTemplate(payload, queueId, key, callback) {
  emailTemplate
    .findOne({
      attributes: ['template'],
      where: { type: NOTIFY_HOST_EMAIL_TEMPLATE },
    })
    .then(function (result) {
      if (result.template) {
        data = result.template;
        data = data.replace('${hostName}', payload.hostName);
        data = data.replace('${visitorName}', payload.visitorName);
        data = data.replace('${locationName}', payload.locationName);
        data = data.replace('${date}', payload.date);
        data = data.replace('${time}', payload.time);
        sendMail(
          queueId,
          data,
          payload,
          key,
          'Visitor checked in',
          function (err, result) {
            return err ? callback(err) : callback(null, result);
          }
        );
      }
    })
    .catch(function (err) {
      delete payload.password;
      err.payload = payload;
      update({ status: 2 }, queueId, function (result) {
        return callback(err);
      });
    });
}
function sendForgotPasswordMailTemplate(payload, queueId, key, callback) {
  emailTemplate
    .findOne({
      attributes: ['template'],
      where: { type: USER_ACCOUNT_FORGOT_PASSWORD_EMAIL_TEMPLATE },
    })
    .then(function (result) {
      if (result.template) {
        data = result.template;
        data = data.replace('${passcode}', payload.passcode);
        sendMail(
          queueId,
          data,
          payload,
          key,
          'Reset your MyGuest account password',
          function (err, result) {
            return err ? callback(err) : callback(null, result);
          }
        );
      }
    })
    .catch(function (err) {
      delete payload.password;
      err.payload = payload;
      update({ status: 2 }, queueId, function (result) {
        return callback(err);
      });
    });
}

/**
 * Convert the given emails to development email ids.
 * @param {*} email
 * @returns email
 */
function changeToDevEmails(email) {
  if (Array.isArray(email)) {
    let devEmails = email.map((recp) => {
      let index = recp.indexOf('@');
      recp = recp.substring(0, index);
      recp = recp + '@domain.com';
      return recp;
    });
    return devEmails;
  } else {
    let index = email.indexOf('@');
    email = email.substring(0, index);
    email = email + '@domain.com';
    return email;
  }
}

function sendMail(id, content, payload, count, subjecttext, callback) {
  // To sent mail to local, domain when mail is triggered from local
  if (process.env.NODE_ENV == 'local') {
    if (payload.email) {
      payload.email = changeToDevEmails(payload.email);
    }
    if (payload.ccEmail) {
      payload.ccEmail = changeToDevEmails(payload.ccEmail);
    }
    if (payload.bccEmail) {
      payload.bccEmail = changeToDevEmails(payload.bccEmail);
    }
  }

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: payload.email || null,
    cc: payload.ccEmail || null,
    bcc: payload.bccEmail || null,
    subject: subjecttext,
    html: content,
    attachments: payload.attachments ? payload.attachments : [],
  };

  mailer.sendMail(mailOptions, function (err, result) {
    // on email send fail status changes to 2
    // on email send success status changes to 1
    let status = err ? 2 : 1;
    let updateFields = {
      status: status,
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    queueMessage
      .update(updateFields, { where: { id: id } })
      .then(function (result) {
        if (err) {
          if (payload.password) delete payload.password;
          err.payload = payload;
          return callback(err);
        }
        if (payload.userId) {
          authUserModel.update(
            payload.userId,
            { emailNotify: 1 },
            false,
            function (err, result) {
              return callback(null, result);
            }
          );
        }
      })
      .catch(function (err) {
        if (payload.password) delete payload.password;
        err.payload = payload;
        return callback(err);
      });

    if (!err) {
      console.log(count + ' Emails sent successfully');
    } else {
      console.log(err);
    }
  });
}

function update(updateFields, id, callback) {
  queueMessage.update(updateFields, { where: { id } }).then(function (result) {
    return callback(result);
  });
}
