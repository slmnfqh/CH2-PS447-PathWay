/** @format */

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

// route api awal/utama
app.use("/api", require("./routes/api"));

app.listen(port, () => {
  console.log(`API server berjalan di port : ${port}`);
});
