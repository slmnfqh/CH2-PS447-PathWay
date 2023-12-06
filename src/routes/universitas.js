/** @format */

const express = require("express");
const router = express.Router();

const Controller = require("../controllers/universitas");

router.get("/cari", Controller.searchUniversity);
router.get("/detail", Controller.universityDetail);
router.get("/prodi", Controller.prodiAtUniversity);
router.get("/cari/prodi", Controller.searchProdi);
router.get("/prodi/detail", Controller.prodiDetail);

module.exports = router;
