/** @format */

// answer.js
const { DataTypes } = require("sequelize");
const db = require("../config/database.js");
const Questions = require("./questions.js"); // Pastikan untuk mengganti sesuai dengan path ke model Questions

// answer.js
const Answer = db.define("Answer", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  answer: DataTypes.STRING,
  percentage: DataTypes.INTEGER,
});

Questions.hasMany(Answer, { foreignKey: "id_question" });
Answer.belongsTo(Questions, { foreignKey: "id_question" });
module.exports = Answer;
