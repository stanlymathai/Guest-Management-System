const { v4: uuidv4 } = require('uuid');
const clientModal = require('../../client/model/clientModal');
const clientUserModel = require('../../client/model/clientUserModal');
const authUserModel = require('../model/authUserModel');
const userProfileModel = require('../model/userProfileModel');
const queueMessage = require('../../queue/model/queueMessage');

const USER_ACCOUNT_ACTIVATION_EMAIL =
  queueMessage.USER_ACCOUNT_ACTIVATION_EMAIL;
const USER_ACCOUNT_OTP_PASSWORD_EMAIL =
  queueMessage.USER_ACCOUNT_OTP_PASSWORD_EMAIL;

module.exports = {
  index: function (req, res) {
    res.status(404);
    res.json({ message: 'MyGuest API Server' });
  },
  signUp: async function (req, res) {
    let authUserparams = {};
    let userProfileModelparams = {};
    let clientUserParams = {};

    authUserparams.status = 0;
    authUserparams.email = req.body.email;
    authUserparams.roleId = req.body.roleId;
    authUserparams.authAccessToken = uuidv4();
    authUserparams.passwordHash = req.body.password;

    userProfileModelparams.firstName = req.body.firstName;
    userProfileModelparams.lastName = req.body.lastName;
    userProfileModelparams.phone = req.body.phone;
    userProfileModelparams.countryId = req.body.countryId;
    userProfileModelparams.organization = req.body.organization;

    clientUserParams.roleId = req.body.roleId;

    const client = await clientModal.findOne({
      code: req.body.registrationCode.trim().toUpperCase(),
    });
    if (!client) return res.json({ error: 'Invalid Registration Code' });

    clientUserParams.clientId = client.id;

    authUserModel
      .add(authUserparams)
      .then((result) => {
        // Add user profile
        userProfileModelparams.userId = result.id;
        clientUserParams.userId = result.id;
        clientUserModel
          .add(clientUserParams)
          .then(() =>
            userProfileModel
              .add(userProfileModelparams)
              .then((response) => {
                //push to queue function start-----
                let payload = {
                  email: authUserparams.email,
                  firstName: userProfileModelparams.firstName,
                  activationUrl:
                    process.env.BASEURL +
                    'activate?token=' +
                    authUserparams.authAccessToken,
                  queueType: USER_ACCOUNT_ACTIVATION_EMAIL,
                };

                queueMessage
                  .push(JSON.stringify(payload))
                  .then((result) => {
                    if (result) res.json(response);
                  })
                  .catch((err) => res.json(err));
                //push to queue function end------
              })
              .catch((err) => res.json(err))
          )
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  },

  login: function (req, res) {
    authUserModel
      .login(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },

  signUpConfirm: function (req, res) {
    let params = {};
    let token = req.body.token;
    params.token = token;
    authUserModel
      .signUpConfirm(params)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },

  forgotPassword: function (req, res) {
    authUserModel
      .forgotPassword(req.body.email)
      .then((result) => {
        let tokenSnippet = result.authAccessToken
          .replace(/\D+/g, '') // replace all characters other than numbers
          .match(/[1-9][0-9]*/)[0]
          .slice(-6); // take a slice from it, we need 6 digits.

        let payload = {
          email: result.email,
          passcode: tokenSnippet,
          queueType: USER_ACCOUNT_OTP_PASSWORD_EMAIL,
        };
        queueMessage
          .push(JSON.stringify(payload))
          .then((result) => {
            if (result)
              res.json({
                message: 'A passcode has been sent to your email',
              });
          })
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  },

  resetPassword: function (req, res) {
    let token = req.body.token;
    let passwordHash = req.body.password;

    authUserModel
      .resetPassword({ token, passwordHash })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },

  verifyOTP: function (req, res) {
    let email = req.body.email;
    let otp = req.body.otp.trim();

    authUserModel
      .searchOne({ email })
      .then((result) => {
        if (!result) return res.json({ error: 'Invalid email' });
        let tokenSnippet = result.authAccessToken
          ?.replace(/\D+/g, '')
          .match(/[1-9][0-9]*/)[0]
          .slice(-6);
        if (tokenSnippet == otp) {
          return res.json({ token: result.authAccessToken });
        } else return res.json({ error: 'Invalid otp' });
      })
      .catch((err) => console.log(err));
  },

  verifyToken: function (req, res) {
    let token = req.body.token;
    authUserModel
      .searchOne({ authAccessToken: token })
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  },
};
