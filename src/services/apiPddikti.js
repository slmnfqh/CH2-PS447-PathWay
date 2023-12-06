/** @format */

const axios = require("axios");

const URL_BACKEND = "https://api-frontend.kemdikbud.go.id/";

const get = (path, data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL_BACKEND}${path}`, data)
      .then((result) => resolve(result.data))
      .catch((err) => reject(err));
  });
};
// Search - University
const getSearchUniversity = (body) => get(`hit/${body}`);
const getDetailUniversity = (body) => get(`v2/detail_pt/${body}`);
const getDataUniversity = (body) => get(`v2/detail_pt_jumlah/${body}`);
const getProdiAtUniversity = (body) => get(`v2/detail_pt_prodi/${body}`);
const getDetailProdi = (body) => get(`detail_prodi/${body}`);
const getSearchProdi = (body) => get(`hit/${body}`);

module.exports = {
  getSearchUniversity,
  getDataUniversity,
  getDetailUniversity,
  getProdiAtUniversity,
  getDetailProdi,
  getSearchProdi,
};
