/** @format */

const express = require("express");
const router = express.Router();

const Controller = require("../controllers/universitas");

router.post("/cari", Controller.searchUniversity);
router.post("/detail", Controller.universityDetail);
router.post("/prodi", Controller.prodiAtUniversity);
router.post("/cari/prodi", Controller.searchProdi);
router.post("/prodi/detail", Controller.prodiDetail);

module.exports = router;
