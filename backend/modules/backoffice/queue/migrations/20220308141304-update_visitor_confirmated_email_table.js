'use strict';
const organization1 = '${organization1}';
const visitorName = '${visitorName}';
const hostName = '${hostName}';
const time = '${time}';
const date = '${date}';
const addressUrl = '${addressUrl}';
const address = '${address}';
const qrCode = '${qrCode}';
const registrationCode = '${registrationCode}';
const organization2 = '${organization2}';

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
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <title>Slot Confimed</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
    
      <body
        class="body"
        style="
          padding: 0 !important;
          margin: 0 !important;
          display: block !important;
          font-size: 16px;
          min-width: 100% !important;
          width: 100% !important;
          -webkit-text-size-adjust: none;
          font-family: Verdana, Geneva, Tahoma, sans-serif;
        "
      >
        <div style="background: #ededed; padding-top: 20px; padding-bottom: 20px">
          <table
            style="
              width: 600px;
              table-layout: fixed;
              font-family: Helvetica, Arial, sans-serif;
              letter-spacing: 0.3px;
              word-spacing: 1px;
              padding: 20px;
              background-color: #f2f7fa;
              line-height: 1.5;
            "
            width="600"
            cellspacing="0"
            cellpadding="0"
            border="0"
            align="center"
          >
            <tbody>
              <tr>
                <td align="left">
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
                    font-size: 16px;
                    font-family: Helvetica, Arial, sans-serif;
                    border-top: 3px solid #d4dadf;
                    border-right: 3px solid #d4dadf;
                    border-left: 3px solid #d4dadf;
                    border-top-left-radius: 20px;
                    border-top-right-radius: 20px;
                  "
                >
                  <h6 style="margin: 0; font-size: 25px; color: #002a6c">
                    Your slot at ${organization1} has been Confimed
                  </h6>
                </td>
              </tr>
              <tr>
                <td
                  align="left"
                  bgcolor="#ffffff"
                  style="
                    padding: 20px 20px 0px 20px;
                    font-size: 16px;
                    font-family: Helvetica, Arial, sans-serif;
                    border-left: 3px solid #d4dadf;
                    border-right: 3px solid #d4dadf;
                  "
                >
                  <p style="margin: 0; margin-bottom: 10px; color: #002a6c">
                    <strong>${visitorName}</strong> to meet
                    <strong>${hostName}</strong> on
                    <strong>${time} ${date}</strong> check in at
                    <strong>Front Desk</strong>
                  </p>
    
                  <h4 style="margin: 0; color: #002a6c">
                    <strong>Location:</strong>
                  </h4>
                  <p style="margin: 0">
                    <a
                      href="https://www.google.com/maps?saddr=My+Location&daddr=${addressUrl}"
                      target="_blank"
                      style="text-decoration: none; color: #0c7eff"
                      >${address} <strong>&#x1f4cc;</strong></a
                    >
                  </p>
                </td>
              </tr>
              <tr>
                <td
                  align="center"
                  bgcolor="#ffffff"
                  style="
                    font-family: Helvetica, Arial, sans-serif;
                    border-left: 3px solid #d4dadf;
                    border-right: 3px solid #d4dadf;
                  "
                >
                  <figure style="margin: 0">
                    <img alt="QR code" src="${qrCode}" />
                    <figcaption style="color: #1b417c">
                      Check-In Refernce:<strong> ${registrationCode}</strong>
                    </figcaption>
                  </figure>
                </td>
              </tr>
              <tr>
                <td
                  align="left"
                  bgcolor="#ffffff"
                  style="
                    padding: 0px 20px 25px 20px;
                    font-family: Helvetica, Arial, sans-serif;
                    font-size: 16px;
                    line-height: 24px;
                    color: #002a6c;
                    border-bottom: 3px solid #d4dadf;
                    border-left: 3px solid #d4dadf;
                    border-right: 3px solid #d4dadf;
                    border-bottom-right-radius: 20px;
                    border-bottom-left-radius: 20px;
                  "
                >
                  <p>
                    Please use the attached QR code or reference code to check-in
                    when you arrive. For further assistance, please contact your
                    host.
                  </p>
                  <p>We wish you a pleasent visit</p>
                  <p>See you soon,</p>
                  <strong style="color: #002a6c">${organization2}</strong>
                  <br />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>
    </html>    
' WHERE id='3';`);
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
