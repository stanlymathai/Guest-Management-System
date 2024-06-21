const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname + "/env/" + process.env.ENVIRONMENT + ".env"),
});
const Sequelize = require("sequelize");

module.exports = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    operatorsAliases: 0, // false
    logging: false,
    dialect: "mysql",
    timezone: "+00:00", // Need to change to client's timezone later

    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
    },
  }
);
