"use strict";
const greetings = "${greetings}";
const visitorName = "${visitorName}";
const company = "${company}";

const hostName = "${hostName}";
const hostPhone = "${hostPhone}";
const hostEmail = "${hostEmail}";
const hostOrganization = "${hostOrganization}";

const date = "${date}";
const time = "${time}";
const slotUrl = "${slotUrl}";

const locationName = "${locationName}";
const locationAddress = "${locationAddress}";
const locationUrl = "${locationUrl}";

const directions = "${directions}";
const additionalText = "${additionalText}";
const logoUrl = "${logoUrl}";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize
      .query(`UPDATE email_template SET template='<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Invitation Email</title>
      </head>
      <body
        style="
          font-family: Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -webkit-text-size-adjust: none;
          height: 100%;
          margin: 0;
          padding: 0;
          width: 100% !important;
        "
      >
        <div style="background: #ededed4b; padding-top: 20px; padding-bottom: 20px">
          <table style="width: 100%; margin: 0; padding: 0">
            <tr>
              <td>
                <div
                  style="
                    max-width: 600px;
                    display: block;
                    margin: 0 auto;
                    padding: 15px;
                  "
                >
                  <table border="0" cellpadding="0" cellspacing="0" width="15%">
                    <tr>
                      <td>
                        <img src="${logoUrl}" alt="logo" />
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </table>
          <!-- /HEADER --><!-- BODY -->
          <table style="width: 100%; margin: 0; padding: 0">
            <tr>
              <td>
                <div
                  style="
                    max-width: 600px;
                    display: block;
                    margin: 0 auto;
                    padding: 15px;
                  "
                >
                  <table style="width: 100%; margin: 0; padding: 0; color: #00296b">
                    <tr>
                      <td>
                        <p>
                          <strong>Hello ${greetings},</strong>
                        </p>
                        <p
                          style="
                            font-family: Helvetica, Arial, sans-serif;
                            font-size: 14px;
                            font-weight: normal;
                            line-height: 1.6;
                            text-align: justify;
                          "
                        >
                          You are invited to ${locationName} at ${hostOrganization}!
                        </p>
    
                        <p
                          style="
                            font-family: Helvetica, Arial, sans-serif;
                            font-size: 14px;
                            font-weight: normal;
                            line-height: 1.6;
                            text-align: justify;
                          "
                        >
                          <b>${visitorName}</b> from <b>${company}</b> to meet
                          <b>${hostName}</b>.
                        </p>
                        <div
                          style="
                            background-color: #bcbcbc;
                            font-family: Helvetica, Arial, sans-serif;
                            font-size: 14px;
                            font-weight: normal;
                            line-height: 1.6;
                            padding: 15px;
                            text-align: justify;
                          "
                        >
                          Date: <b>${date}</b><br />
                          Time: <b>${time}</b> <br />
                          <span>${directions}</span>
                        </div>
                        <p
                          style="
                            background-color: #bcbcbc;
                            font-family: Helvetica, Arial, sans-serif;
                            font-weight: bold;
                            padding: 15px;
                          "
                        >
                          To confirm or deny your attendance please click below.
                        </p>
    
                        <!-- Callout Panel -->
                        <center>
                          <a
                            href="${slotUrl}"
                            target="_blank"
                            rel="noopener noreferrer"
                            data-auth="NotApplicable"
                            style="
                              font-size: 16px;
                              font-family: Helvetica, Arial, sans-serif;
                              font-weight: 600;
                              border-radius: 2px;
                            "
                          >
                            <span
                              style="
                                text-align: center;
                                color: white;
                                font-size: 18px;
                                font-weight: 500;
                                background-color: #018497;
                                display: inline-block;
                                border-radius: 5px;
                                padding: 5px 40px;
                                border: 1px solid #63c3d1;
                                text-decoration: none;
                                letter-spacing: 0.3px;
                              "
                              >Confirm Slot</span
                            ></a
                          >
                        </center>
                        <br />
    
                        <table
                          style="
                            width: 100%;
                            background-color: #ebebeb;
                            font-family: Helvetica, Arial, sans-serif;
                            padding: 15px;
                          "
                        >
                          <tr>
                            <td>
                              <table>
                                <tr>
                                  <td>
                                    <p>
                                      <strong
                                        >For more details, please contact your
                                        host.<br />
                                      </strong>
                                    </p>
                                    <div
                                      style="
                                        font-weight: normal;
                                        font-size: 14px;
                                        line-height: 1.8;
                                      "
                                    >
                                      <b>Contact Info:</b><br />
                                      Phone:
                                      <strong>${hostPhone}</strong><br />
                                      Email:
                                      <strong
                                        ><a
                                          href="mailto:contact-name@domain"
                                          style="
                                            font-family: Helvetica, Arial,
                                              sans-serif;
                                            color: #2ba6cb;
                                          "
                                        >
                                          ${hostEmail}</a
                                        ></strong
                                      ><br />
                                      Location:
                                      <strong>
                                        <a
                                          href="https://www.google.com/maps?saddr=My+Location&daddr=${locationUrl}"
                                          target="_blank"
                                          style="
                                            text-decoration: none;
                                            color: #0c7eff;
                                          "
                                          >${locationAddress}
                                          <strong>&#x1f4cc;</strong></a
                                        >
                                      </strong>
                                      <br />
                                      <span>${additionalText}</span>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </table>
          <!-- /BODY --><!-- FOOTER -->
          <table style="width: 100%; margin: 0; padding: 0; clear: both !important">
            <tr>
              <td>
                <div
                  style="
                    max-width: 600px;
                    display: block;
                    margin: 0 auto;
                    padding: 15px;
                  "
                >
                  <table>
                    <tr>
                      <td>
                        <center>
                          <small
                            style="
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 60%;
                              color: #6f6f6f;
                              text-transform: none;
                              margin: 0;
                              padding: 0;
                            "
                            ><hr />
                            <center><strong>Disclaimer</strong></center>
    
                            The content of this email is private and intended for
                            the recipient designated in the message. Transmission of
                            any part of this message to any outside party without
                            the express consent of the sender is strictly
                            prohibited.
                          </small>
                        </center>
                        <br />
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
                </div>
              </td>
            </tr>
          </table>
          <br />
        </div>
      </body>
    </html>
    ' WHERE id='2';`);
  },

  down: async (queryInterface, Sequelize) => {},
};
