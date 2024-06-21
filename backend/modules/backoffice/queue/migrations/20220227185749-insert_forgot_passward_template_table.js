'use strict';
const activationUrl = '${activationUrl}';
const directUrl = '${directUrl}';
const directUrlLink = '${directUrlLink}';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize
      .query(`INSERT INTO email_template(id, template, type) VALUE 
    ('7','<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <title>Password Reset</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style="background-color: #e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
              >
                <tr>
                  <td
                    style="
                      background-color: #63c3d1;
                      padding: 20px;
                      letter-spacing: 0.3px;
                    "
                  ></td>
                </tr>
    
                <tr>
                  <td
                    align="left"
                    bgcolor="#ffffff"
                    style="
                      padding: 36px 24px 0;
                      font-family: Helvetica, Arial, sans-serif;
                      border-top: 3px solid #d4dadf;
                    "
                  >
                    <h1
                      style="
                        margin: 0;
                        font-size: 32px;
                        font-weight: 700;
                        letter-spacing: -1px;
                        line-height: 48px;
                      "
                    >
                      Reset Your Password
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
              >
                <tr>
                  <td
                    align="left"
                    bgcolor="#ffffff"
                    style="
                      padding: 24px;
                      font-family: Helvetica, Arial, sans-serif;
                      font-size: 16px;
                      line-height: 24px;
                    "
                  >
                    <p style="margin: 0">
                      Tap the button below to reset your MyGuest account password.
                      If you did not request a new password, you can safely delete
                      this email.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="left" bgcolor="#ffffff">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="center" bgcolor="#ffffff" style="padding: 12px">
                          <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td
                                align="center"
                                bgcolor="#1a82e2"
                                style="border-radius: 6px"
                              >
                                <a
                                  href="${activationUrl}"
                                  target="_blank"
                                  style="
                                    display: inline-block;
                                    padding: 16px 36px;
                                    font-family: Helvetica, Arial, sans-serif;
                                    font-size: 16px;
                                    color: #ffffff;
                                    text-decoration: none;
                                    border-radius: 6px;
                                  "
                                  >Click Here To Reset</a
                                >
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td
                    align="left"
                    bgcolor="#ffffff"
                    style="
                      padding: 24px;
                      font-family: Helvetica, Arial, sans-serif;
                      font-size: 16px;
                      line-height: 24px;
                    "
                  >
                    <p style="margin: 0">
                      If that does not work, copy and paste the following link in
                      your browser:
                    </p>
                    <br />
                    <p style="margin: 0">
                      <a href="${directUrlLink}">${directUrl}</a>
                    </p>
                  </td>
                </tr>
    
                <tr>
                  <td
                    align="left"
                    bgcolor="#ffffff"
                    style="
                      padding: 24px;
                      font-family: Helvetica, Arial, sans-serif;
                      font-size: 16px;
                      line-height: 24px;
                      border-bottom: 3px solid #d4dadf;
                    "
                  >
                    <p style="margin: 0">
                      Cheers,<br />
                      backoffice Team
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                      background-color: #63c3d1;
                      padding: 20px;
                      letter-spacing: 0.3px;
                    "
                  ></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>'
    ,'7');`);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
