'use strict';
const passcode = '${passcode}';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `UPDATE email_template SET template='
      <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta http-equiv="x-ua-compatible" content="ie=edge" />
            <title>Set User Password</title>
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
                        <img
                          src="https://s3-eu-west-1.amazonaws.com/static.backoffice.io/backoffice/img/logos/my_visitor_logo.png"
                          alt="logo"
                          width="35%"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        align="left"
                        bgcolor="#ffffff"
                        style="
                          padding: 36px 24px 0;
                          font-family: Helvetica, Arial, sans-serif;
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
                          Verify your login
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
                        <p style="margin: 0">Below is your one time passcode.</p>
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
                                    <span
                                      style="
                                        display: inline-block;
                                        padding: 16px 36px;
                                        font-family: Helvetica, Arial, sans-serif;
                                        font-size: 16px;
                                        color: #ffffff;
                                        text-decoration: none;
                                        border-radius: 6px;
                                      "
                                      ><h2
                                        style="
                                          background: #00466a;
                                          margin: 0 auto;
                                          width: max-content;
                                          color: #fff;
                                          border-radius: 4px;
                                        "
                                      >
                                        ${passcode}
                                      </h2>
                                    </span>
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
                          font-size: 12px;
                          line-height: 24px;
                        "
                      >
                        <p style="margin: 0">
                          Need a hand? If you need any help or support please do not
                          hesitate to
                          <a href="mailto:help@backoffice.io?subject=GMS"> Contact us </a>
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
                      />
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      ' WHERE id='7';`
    );
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
