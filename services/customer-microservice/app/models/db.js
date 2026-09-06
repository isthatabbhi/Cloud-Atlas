const mysql = require("mysql");
const dbConfig = require("../config/config.js");

const connection = mysql.createPool({
  host: dbConfig.APP_DB_HOST,
  user: dbConfig.APP_DB_USER,
  password: dbConfig.APP_DB_PASSWORD,
  database: dbConfig.APP_DB_NAME
});

module.exports = connection;
