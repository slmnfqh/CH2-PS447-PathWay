/** @format */

// question.js
const Answer = require("../models/answer.js");
const axios = require("axios");
const { nanoid } = require("nanoid");

const getAnswer = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: "Harap Isi Question!" });
  }

  try {
    const mlResponse = await axios.post(
      "https://endpoint-ml-hzihrybpka-uc.a.run.app/predict",
      {
        user_input: question,
      }
    );

    const id = nanoid(20);

    await Answer.create({
      id: id,
      Question: question,
      Prediksi_Jurusan: mlResponse.data["Prediksi Jurusan"], // Sesuaikan dengan struktur respons ML
    });

    const jsonResponse = {
      id_question: id,
      message: "Question created successfully",
      "Prediksi Jurusan": mlResponse.data["Prediksi Jurusan"],
    };
    res.status(201).json(jsonResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

module.exports = { getAnswer };
