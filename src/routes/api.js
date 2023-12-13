/** @format */

const express = require("express");
const app = express();

app.use("/users", require("./users"));
app.use("/universitas", require("../routes/universitas"));

// home
app.use("/home", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
