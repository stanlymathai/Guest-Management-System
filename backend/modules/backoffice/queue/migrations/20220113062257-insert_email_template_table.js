'use strict';
const firstName = '${firstName}';
const activationUrl = '${activationUrl}';
const locationName = '${locationName}';
const address = '${address}';
const date = '${date}';
const time = '${time}';
const url = '${url}';
const visitorName = '${visitorName}';
const qrCode = '${qrCode}';
const locationManager = '${locationManager}';
const hostName = '${hostName}';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize
      .query(`INSERT INTO email_template(id, template, type) VALUES
     ('1', '<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <title></title>
            <meta http-equiv=" Content-Type " content=" text/html; charset=utf-8 ">
            <meta name=" viewport " content=" width=device-width ">
            <meta name=" x-apple-disable-message-reformatting ">
            <style id=" vendor_styles ">
                html {
                    -ms-overflow-y: auto !important;
                }
        
                body {
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
        
                img {
                    -ms-interpolation-mode: bicubic;
                }
        
                table.radius td {
                    -webkit-border-radius: 3px;
                    -moz-border-radius: 3px;
                }
        
                table.round td {
                    -webkit-border-radius: 500px;
                    -moz-border-radius: 500px;
                }
        
                table.columns td.element_connector,
                td.element_connector {
                    width: 100% !important;
                    width: calc(100%) !important;
                    width: -webkit-calc(100%) !important;
                }
        
                div,
                p,
                a,
                li,
                td {
                    -webkit-text-size-adjust: none;
                }
        
                @media screen {
                    img {
                        width: 100% !important;
                    }
                }
            </style>
        </head>
        
        <body class=" body"
            style="padding:0 !important; margin:0 !important; display:block !important; font-size: 16px;
             min-width:100% !important; width:100% !important;  -webkit-text-size-adjust:none; font-family: Verdana, Geneva, Tahoma, sans-serif;">
            <div style="background:#ededed; padding-top:20px; padding-bottom:20px;">
                <table style="width:600px; table-layout:fixed; background: #ffffff; font-family:Helvetica,Arial,sans-serif; letter-spacing: 0.3px;
            word-spacing: 1px;
            line-height: 1.5;" width="600" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                        <tr>
                            <td style="background-color: #63c3d1; padding: 20px;"></td>
                        </tr>
                        <tr>
                        <tr>
                            <td>
                                <table border="0" cellspacing="0" width="100%">
                                    <tbody>
                                        <tr>
                                            <td align="center" valign="top" style="padding:80px 30px">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <table border="0" cellpadding="0" cellspacing="0" width="15%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                <img src="https://s3-eu-west-1.amazonaws.com/static.backoffice.io/backoffice/img/logos/backoffice-gms-logo-icon_mail.png"
                                                                                    alt="logo">
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td valign="top">
                                                                <h4 style="color:#627da6;font-family:Helvetica,Arial,sans-serif;font-size:25px;font-weight:600;margin-top:0;margin-bottom:10px;text-align:left;letter-spacing: 0px;">Welcome ${firstName},</br></h4>
                                                                    <h3
                                                                    style="color:#00296b;font-family:Helvetica,Arial,sans-serif;font-size:30px; line-height:1.4 ;font-weight:600;margin-top:0;margin-bottom:10px;text-align:left; letter-spacing: 0px;">
                                                                    To activate your new Visitor Management Account please click below!</h3>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding: 10px 0;">
                                                                <table align="center" border="0" cellspacing="0" cellpadding="0"
                                                                    width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="text-align: left; ">
                                                                                <a href="${activationUrl}" target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    data-auth="NotApplicable" style="font-size:16px;
                                                                                font-family:Helvetica,Arial,sans-serif; font-weight:600;
                                                                                border-radius:2px; ">
                                                                                    <span
                                                                                        style="text-align:center; color:white;
                                                                                    font-size:18px; font-weight:500; background-color:#018497;
                                                                                    display:inline-block; border-radius:5px; padding: 5px 40px;
                                                                                    border:1px solid #63c3d1;   
                                                                                    text-decoration: none;letter-spacing: 0.3px;">Click
                                                                                        Here To Activate</span></a>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="padding-top: 20px;">Not you? Please ignore this email</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="background-color: #63c3d1; padding: 20px;letter-spacing: 0.3px;"></td>
                        </tr>
                        <tr>
                    </tbody>
                </table>
            </div>
        </body>
        
        </html>', '1'),
     ('2', '<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <title></title>
            <meta http-equiv=" Content-Type " content=" text/html; charset=utf-8 ">
            <meta name=" viewport " content=" width=device-width ">
            <meta name=" x-apple-disable-message-reformatting ">
            <style id=" vendor_styles ">
                html {
                    -ms-overflow-y: auto !important;
                }
        
                body {
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
        
                img {
                    -ms-interpolation-mode: bicubic;
                }
        
                table.radius td {
                    -webkit-border-radius: 3px;
                    -moz-border-radius: 3px;
                }
        
                table.round td {
                    -webkit-border-radius: 500px;
                    -moz-border-radius: 500px;
                }
        
                table.columns td.element_connector,
                td.element_connector {
                    width: 100% !important;
                    width: calc(100%) !important;
                    width: -webkit-calc(100%) !important;
                }
        
                div,
                p,
                a,
                li,
                td {
                    -webkit-text-size-adjust: none;
                }
        
                @media screen {
                    img {
                        width: 100% !important;
                    }
                }
            </style>
        </head>
        
        <body class=" body"
            style="padding:0 !important; margin:0 !important; display:block !important; font-size: 16px;
             min-width:100% !important; width:100% !important;  -webkit-text-size-adjust:none; font-family: Verdana, Geneva, Tahoma, sans-serif;">
            <div style="background:#ededed; padding-top:20px; padding-bottom:20px;">
                <table style="width:600px; table-layout:fixed; background: #ffffff; font-family:Helvetica,Arial,sans-serif; letter-spacing: 0.3px;
            word-spacing: 1px;
            line-height: 1.5;" width="600" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                        <tr>
                            <td style="background-color: #63c3d1; padding: 20px;"></td>
                        </tr>
                        <tr>
                        <tr>
                            <td>
                                <table border="0" cellspacing="0" width="100%">
                                    <tbody>
                                        <tr>
                                            <td align="center" valign="top" style="padding:80px 30px">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <table border="0" cellpadding="0" cellspacing="0" width="15%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                <img src="https://s3-eu-west-1.amazonaws.com/static.backoffice.io/backoffice/img/logos/backoffice-gms-logo-icon_mail.png"
                                                                                    alt="logo">
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td valign="top">
                                                                <h4 style="color:#00296b;font-family:Helvetica,Arial,sans-serif;font-size:25px;font-weight:600;margin-top:0;margin-bottom:10px;text-align:left;letter-spacing: 0px;">Hello ${firstName},</br></h4>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td valign="top">
                                                                <h1
                                                                    style="color:#00296b;font-family:Helvetica,Arial,sans-serif;font-size:30px; line-height:1.4 ;font-weight:600;margin-top:0;margin-bottom:10px;text-align:left; letter-spacing: 0px;">
                                                                    You are invited to ${locationName} <br> at ${address}!</h1>
        
                                                                <h3
                                                                    style="color:#627da6;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:600;margin-top:0;margin-bottom:0px;text-align:left;letter-spacing: 0px;">
                                                                    Date: ${date}</h3>
                                                                <h3
                                                                    style="color:#627da6;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:600;margin-top:0;margin-bottom:10px;text-align:left;letter-spacing: 0px;">
                                                                    Time: ${time}</h3>
                                                                <h3
                                                                    style="color:#00296b;font-family:Helvetica,Arial,sans-serif;font-size:22px;font-weight:600;margin-top:0;margin-bottom:0px;text-align:left;letter-spacing: 0px;">
                                                                    To confirm or deny your attendance please click below</h3>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding: 10px 0;">
                                                                <table align="center" border="0" cellspacing="0" cellpadding="0"
                                                                    width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="text-align: left; ">
                                                                                <a href="${url}" target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    data-auth="NotApplicable" style="font-size:16px;
                                                                                font-family:Helvetica,Arial,sans-serif; font-weight:600;
                                                                                border-radius:2px; ">
                                                                                    <span
                                                                                        style="text-align:center; color:white;
                                                                                    font-size:18px; font-weight:500; background-color:#018497;
                                                                                    display:inline-block; border-radius:5px; padding: 5px 40px;
                                                                                    border:1px solid #63c3d1;   
                                                                                    text-decoration: none;letter-spacing: 0.3px;">Confirm
                                                                                        Slot</span></a>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="background-color: #63c3d1; padding: 20px;letter-spacing: 0.3px;"></td>
                        </tr>
                        <tr>
                    </tbody>
                </table>
            </div>
        </body>
        
        </html>', '2'),
     ('3', '<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <title></title>
            <meta http-equiv=" Content-Type " content=" text/html; charset=utf-8 ">
            <meta name=" viewport " content=" width=device-width ">
            <meta name=" x-apple-disable-message-reformatting ">
            <style id=" vendor_styles ">
                html {
                    -ms-overflow-y: auto !important;
                }
        
                body {
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
        
                img {
                    -ms-interpolation-mode: bicubic;
                }
        
                table.radius td {
                    -webkit-border-radius: 3px;
                    -moz-border-radius: 3px;
                }
        
                table.round td {
                    -webkit-border-radius: 500px;
                    -moz-border-radius: 500px;
                }
        
                table.columns td.element_connector,
                td.element_connector {
                    width: 100% !important;
                    width: calc(100%) !important;
                    width: -webkit-calc(100%) !important;
                }
        
                div,
                p,
                a,
                li,
                td {
                    -webkit-text-size-adjust: none;
                }
        
                @media screen {
                    img {
                        width: 100% !important;
                    }
                }
            </style>
        </head>
        
        <body class=" body"
            style="padding:0 !important; margin:0 !important; display:block !important; font-size: 16px;
             min-width:100% !important; width:100% !important;  -webkit-text-size-adjust:none; font-family: Verdana, Geneva, Tahoma, sans-serif;">
            <div style="background:#ededed; padding-top:20px; padding-bottom:20px;">
                <table style="width:600px; table-layout:fixed; background: #ffffff; font-family:Helvetica,Arial,sans-serif; letter-spacing: 0.3px;
            word-spacing: 1px;
            line-height: 1.5;" width="600" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                        <tr>
                            <td style="background-color: #63c3d1; padding: 20px;"></td>
                        </tr>
                        <tr>
                        <tr>
                            <td>
                                <table border="0" cellspacing="0" width="100%">
                                    <tbody>
                                        <tr>
                                            <td align="center" valign="top" style="padding:80px 30px">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <table border="0" cellpadding="0" cellspacing="0" width="15%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                <img src="https://s3-eu-west-1.amazonaws.com/static.backoffice.io/backoffice/img/logos/backoffice-gms-logo-icon_mail.png"
                                                                                    alt="logo">
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td valign="top">
                                                                <h4
                                                                    style="color:#627da6;font-family:Helvetica,Arial,sans-serif;font-size:25px;font-weight:600;margin-top:0;margin-bottom:10px;text-align:left;letter-spacing: 0px;">
                                                                    Hi ${visitorName},</br></h4>
                                                                <h1
                                                                    style="color:#00296b;font-family:Helvetica,Arial,sans-serif;font-size:30px; line-height:1.4 ;font-weight:600;margin-top:0;margin-bottom:10px;text-align:left; letter-spacing: 0px;">
                                                                    Thank you for confirming your slot to visit at
                                                                    ${locationName}, ${address} at ${time} on ${date}.</h1>
                                                                <h3
                                                                    style="color:#627da6;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:600;margin-top:0;margin-bottom:0px;text-align:left;letter-spacing: 0px;">
                                                                    We look forward to your visit!</h3>
                                                                <h3
                                                                    style="color:#627da6;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:600;margin-top:0;margin-bottom:0px;text-align:left;letter-spacing: 0px;">
                                                                    Please use the QR code for easy check in.</h3>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding: 10px 0;">
                                                                <table align="center" border="0" cellspacing="0" cellpadding="0"
                                                                    width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="text-align: center; ">
                                                                                <table width="30%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <img alt="QR code"
                                                                                                    src="${qrCode}" />
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="background-color: #63c3d1; padding: 20px;letter-spacing: 0.3px;"></td>
                        </tr>
                        <tr>
                    </tbody>
                </table>
            </div>
        </body>
        
        </html>', '3'),
     ('4', '<!DOCTYPE html>
   <html lang="en">
   
   <head>
       <title></title>
       <meta http-equiv=" Content-Type " content=" text/html; charset=utf-8 ">
       <meta name=" viewport " content=" width=device-width ">
       <meta name=" x-apple-disable-message-reformatting ">
       <style id=" vendor_styles ">
           html {
               -ms-overflow-y: auto !important;
           }
   
           body {
               -webkit-text-size-adjust: 100%;
               -ms-text-size-adjust: 100%;
           }
   
           img {
               -ms-interpolation-mode: bicubic;
           }
   
           table.radius td {
               -webkit-border-radius: 3px;
               -moz-border-radius: 3px;
           }
   
           table.round td {
               -webkit-border-radius: 500px;
               -moz-border-radius: 500px;
           }
   
           table.columns td.element_connector,
           td.element_connector {
               width: 100% !important;
               width: calc(100%) !important;
               width: -webkit-calc(100%) !important;
           }
   
           div,
           p,
           a,
           li,
           td {
               -webkit-text-size-adjust: none;
           }
   
           @media screen {
               img {
                   width: 100% !important;
               }
           }
       </style>
   </head>
   
   <body class=" body"
       style="padding:0 !important; margin:0 !important; display:block !important; font-size: 16px;
        min-width:100% !important; width:100% !important;  -webkit-text-size-adjust:none; font-family: Verdana, Geneva, Tahoma, sans-serif;">
       <div style="background:#ededed; padding-top:20px; padding-bottom:20px;">
           <table style="width:600px; table-layout:fixed; background: #ffffff; font-family:Helvetica,Arial,sans-serif; letter-spacing: 0.3px;
       word-spacing: 1px;
       line-height: 1.5;" width="600" cellspacing="0" cellpadding="0" border="0" align="center">
               <tbody>
                   <tr>
                       <td style="background-color: #63c3d1; padding: 20px;"></td>
                   </tr>
                   <tr>
                   <tr>
                       <td>
                           <table border="0" cellspacing="0" width="100%">
                               <tbody>
                                   <tr>
                                       <td align="center" valign="top" style="padding:80px 30px">
                                           <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                               <tbody>
                                                   <tr>
                                                       <td>
                                                           <table border="0" cellpadding="0" cellspacing="0" width="15%">
                                                               <tbody>
                                                                   <tr>
                                                                       <td>
                                                                           <img src="https://s3-eu-west-1.amazonaws.com/static.backoffice.io/backoffice/img/logos/backoffice-gms-logo-icon_mail.png"
                                                                               alt="logo">
                                                                       </td>
                                                                   </tr>
                                                               </tbody>
                                                           </table>
                                                       </td>
                                                   </tr>
                                                   <tr>
                                                       <td valign="top">
                                                           <h4
                                                               style="color:#627da6;font-family:Helvetica,Arial,sans-serif;font-size:25px;font-weight:600;margin-top:0;margin-bottom:10px;text-align:left;letter-spacing: 0px;">
                                                               Hi ${locationManager},</br></h4>
                                                           <h1
                                                               style="color:#00296b;font-family:Helvetica,Arial,sans-serif;font-size:30px; line-height:1.4 ;font-weight:600;margin-top:0;margin-bottom:10px;text-align:left; letter-spacing: 0px;">
                                                               This is an email to notify you that ${visitorName} checked
                                                               in at ${locationName} at ${time} , ${date} and are currently
                                                               waiting collection by ${hostName}</h1>
   
                                                       </td>
                                                   </tr>
                                               </tbody>
                                           </table>
                                       </td>
                                   </tr>
                               </tbody>
                           </table>
                       </td>
                   </tr>
                   <tr>
                       <td style="background-color: #63c3d1; padding: 20px;letter-spacing: 0.3px;"></td>
                   </tr>
                   <tr>
               </tbody>
           </table>
       </div>
   </body>
   
   </html>', '4'),
     ('5', '<!DOCTYPE html>
   <html lang="en">
   
   <head>
       <title></title>
       <meta http-equiv=" Content-Type " content=" text/html; charset=utf-8 ">
       <meta name=" viewport " content=" width=device-width ">
       <meta name=" x-apple-disable-message-reformatting ">
       <style id=" vendor_styles ">
           html {
               -ms-overflow-y: auto !important;
           }
   
           body {
               -webkit-text-size-adjust: 100%;
               -ms-text-size-adjust: 100%;
           }
   
           img {
               -ms-interpolation-mode: bicubic;
           }
   
           table.radius td {
               -webkit-border-radius: 3px;
               -moz-border-radius: 3px;
           }
   
           table.round td {
               -webkit-border-radius: 500px;
               -moz-border-radius: 500px;
           }
   
           table.columns td.element_connector,
           td.element_connector {
               width: 100% !important;
               width: calc(100%) !important;
               width: -webkit-calc(100%) !important;
           }
   
           div,
           p,
           a,
           li,
           td {
               -webkit-text-size-adjust: none;
           }
   
           @media screen {
               img {
                   width: 100% !important;
               }
           }
       </style>
   </head>
   
   <body class=" body"
       style="padding:0 !important; margin:0 !important; display:block !important; font-size: 16px;
        min-width:100% !important; width:100% !important;  -webkit-text-size-adjust:none; font-family: Verdana, Geneva, Tahoma, sans-serif;">
       <div style="background:#ededed; padding-top:20px; padding-bottom:20px;">
           <table style="width:600px; table-layout:fixed; background: #ffffff; font-family:Helvetica,Arial,sans-serif; letter-spacing: 0.3px;
       word-spacing: 1px;
       line-height: 1.5;" width="600" cellspacing="0" cellpadding="0" border="0" align="center">
               <tbody>
                   <tr>
                       <td style="background-color: #63c3d1; padding: 20px;"></td>
                   </tr>
                   <tr>
                   <tr>
                       <td>
                           <table border="0" cellspacing="0" width="100%">
                               <tbody>
                                   <tr>
                                       <td align="center" valign="top" style="padding:80px 30px">
                                           <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                               <tbody>
                                                   <tr>
                                                       <td>
                                                           <table border="0" cellpadding="0" cellspacing="0" width="15%">
                                                               <tbody>
                                                                   <tr>
                                                                       <td>
                                                                           <img src="https://s3-eu-west-1.amazonaws.com/static.backoffice.io/backoffice/img/logos/backoffice-gms-logo-icon_mail.png"
                                                                               alt="logo">
                                                                       </td>
                                                                   </tr>
                                                               </tbody>
                                                           </table>
                                                       </td>
                                                   </tr>
                                                   <tr>
                                                       <td valign="top">
                                                           <h4
                                                               style="color:#627da6;font-family:Helvetica,Arial,sans-serif;font-size:25px;font-weight:600;margin-top:0;margin-bottom:10px;text-align:left;letter-spacing: 0px;">
                                                               Hi ${hostName},</br></h4>
                                                           <h3
                                                               style="color:#00296b;font-family:Helvetica,Arial,sans-serif;font-size:30px; line-height:1.4 ;font-weight:600;margin-top:0;margin-bottom:10px;text-align:left; letter-spacing: 0px;">
                                                               ${visitorName} has checked in at ${locationName} and passed
                                                               safety checks and is waiting for collection in the waiting
                                                               area for your appointment on ${date} at ${time}</h3>
                                                       </td>
                                                   </tr>
                                               </tbody>
                                           </table>
                                       </td>
                                   </tr>
                               </tbody>
                           </table>
                       </td>
                   </tr>
                   <tr>
                       <td style="background-color: #63c3d1; padding: 20px;letter-spacing: 0.3px;"></td>
                   </tr>
                   <tr>
               </tbody>
           </table>
       </div>
   </body>
   
   </html>', '5');`);
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
