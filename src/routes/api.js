/** @format */

const express = require("express");
const app = express();

app.use("/users", require("./users"));
app.use("/university", require("../routes/university"));

module.exports = app;
