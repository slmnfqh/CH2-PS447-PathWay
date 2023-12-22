/** @format */

// answer.js
const { DataTypes } = require("sequelize");
const db = require("../config/database.js");

const Answer = db.define("Answer", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  Question: DataTypes.STRING,
  rekomendasi_jurusan: DataTypes.STRING, // Sesuaikan dengan tipe data yang diterima dari respons ML
  rekomendasi_karir: DataTypes.JSON, // Sesuaikan dengan tipe data yang diterima dari respons ML
  recommended_labels: DataTypes.JSON, // Sesuaikan dengan tipe data yang diterima dari respons ML
  similarities: DataTypes.JSON, // Sesuaikan dengan tipe data yang diterima dari respons ML
});

module.exports = Answer;
