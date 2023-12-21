/** @format */

// answer.js
const { DataTypes } = require("sequelize");
const db = require("../config/database.js");

const Answer = db.define("answer", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  Question: DataTypes.STRING,
  Prediksi_Jurusan: DataTypes.STRING, // Sesuaikan dengan tipe data yang diterima dari respons ML
});

module.exports = Answer;
