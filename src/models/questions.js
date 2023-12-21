/** @format */

// questions.js
const { DataTypes } = require("sequelize");
const db = require("../config/database.js");

// questions.js
const Questions = db.define("Questions", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  question: DataTypes.STRING,
});

module.exports = Questions;
