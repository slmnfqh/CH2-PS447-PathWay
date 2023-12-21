/** @format */

// question.js
const Questions = require("../models/questions.js");
const Answer = require("../models/answer.js");
const axios = require("axios");
const { nanoid } = require("nanoid");
const { getSearchProdi } = require("../services/apiPddikti");

const saveQuestion = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: "Harap Isi Question!" });
  }

  try {
    console.log("Mengakses fungsi saveQuestion");
    const id = nanoid(20);
    const dataResult = await Questions.create({
      id: id,
      question: question,
    });

    const getAnswer = await axios.post(
      "https://endpoint-ml-hzihrybpka-uc.a.run.app/predict",
      {
        text: question,
      }
    );

    let recommendation = [];
    if (typeof getAnswer.data === "string") {
      recommendation = getAnswer.data
        .match(/[^,]+/g)
        .map((item) => item.trim());
    } else {
      console.error(
        "Tipe data yang tidak diharapkan diterima:",
        typeof getAnswer.data
      );
    }

    await Promise.all(
      recommendation.map(async (item) => {
        let percentage = Math.floor(Math.random() * 11) + 80;

        await Answer.create({
          id_question: id,
          answer: item,
          percentage: percentage,
        });

        percentage -= 10;
      })
    );

    res.status(201).json({
      id_question: id,
      message: "Question created successfully",
      data: dataResult,
    });
    console.log("Fungsi saveQuestion selesai");
  } catch (error) {
    console.error("Terjadi kesalahan pada fungsi saveQuestion:", error);
    console.error(error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

// Endpoint untuk mendapatkan hasil pertanyaan sebelumnya
const getAnswer = async (req, res) => {
  const id = req.params.id; // id_question pertanyaan sebelumnya

  if (!id) {
    return res.status(400).json({ message: "Id Undefined" });
  }

  try {
    // Ambil pertanyaan dari tabel Questions berdasarkan id
    const questionData = await Questions.findByPk(id);

    if (!questionData) {
      return res.status(404).json({ message: "Question not found" });
    }

    const question = questionData.question;

    const allAnswer = await Answer.findAll({
      attributes: ["answer", "percentage"],
      where: {
        id_question: id,
      },
      order: [["percentage", "DESC"]],
    });

    // ... (kode lainnya)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

// const saveQuestion = async (req, res) => {
//   const { question } = req.body;

//   if (!question) {
//     return res.status(400).json({ message: "Harap Isi Question!" });
//   }

//   try {
//     const id = nanoid(20);
//     const dataResult = await Questions.create({
//       id: id,
//       question: question,
//     });

//     const getAnswer = await axios.post(
//       "https://endpoint-ml-hzihrybpka-uc.a.run.app/predict",
//       {
//         text: question,
//       }
//     );

//     let recommendation = [];
//     if (typeof getAnswer.data === "string") {
//       recommendation = getAnswer.data
//         .match(/[^,]+/g)
//         .map((item) => item.trim());
//     } else {
//       console.error(
//         "Tipe data yang tidak diharapkan diterima:",
//         typeof getAnswer.data
//       );
//     }

//     await Promise.all(
//       recommendation.map(async (item) => {
//         let percentage = Math.floor(Math.random() * 11) + 80;

//         await Answer.create({
//           id_question: id,
//           answer: item,
//           percentage: percentage,
//         });

//         percentage -= 10;
//       })
//     );

//     res.status(201).json({
//       id_question: id,
//       message: "Question created successfully",
//       data: dataResult,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Terjadi kesalahan pada server",
//       error: error.message,
//     });
//   }
// };

// const getAnswer = async (req, res) => {
//   const id = req.params.id;

//   if (!id) {
//     return res.status(400).json({ message: "Id Undefined" });
//   }

//   try {
//     const allAnswer = await Answer.findAll({
//       attributes: ["answer", "percentage"],
//       where: {
//         id_question: id,
//         question: question,
//       },
//       order: [["percentage", "DESC"]],
//     });

//     const result = [];
//     for (const index of allAnswer) {
//       try {
//         const response = await getSearchProdi(index.question);
//         result.push(response.prodi.length);
//       } catch (prodiError) {
//         console.error("Error while fetching prodi:", prodiError.message);
//         result.push(0); // Jika ada kesalahan, set jumlah prodi menjadi 0
//       }
//     }

//     const data = allAnswer.map((item, index) => {
//       return {
//         prodi: item.answer,
//         percentage: item.percentage,
//         university: result[index],
//       };
//     });

//     res.json({
//       id_question: id,
//       data: data,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Terjadi kesalahan pada server",
//       error: error.message,
//     });
//   }
// };

module.exports = { saveQuestion, getAnswer };
