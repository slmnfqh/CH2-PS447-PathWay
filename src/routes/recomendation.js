/** @format */

const express = require("express");
const router = express.Router();

const QuestionController = require("../controllers/question");

router.post("/question", QuestionController.saveQuestion);
router.get("/answer/:id", QuestionController.getAnswer);

module.exports = router;
