/** @format */

const express = require("express");
const router = express.Router();

const QuestionController = require("../controllers/question");

router.post("/answer", QuestionController.getAnswer);

module.exports = router;
