/** @format */

const { Sequelize } = require("sequelize");
require("dotenv").config();

// Cloud SQL
const db = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOSTNAME,
  port: 3306,
  username: process.env.DB_USERNAME, // Ganti dengan username database Anda
  password: process.env.DB_PASSWORD, // Ganti dengan password database Anda
  database: process.env.DB_NAME, // Ganti dengan nama database Anda
  dialectOptions: {
    socketPath: process.env.DB_SOCKETPATCH,
  },
});

module.exports = db;
