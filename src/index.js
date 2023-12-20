/** @format */

const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/database.js");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const dbConnect = async () => {
  try {
    await db.authenticate();
    console.log("Database connected..");
    await db.sync();
  } catch (error) {
    console.log(error);
  }
};
dbConnect();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());

// route api awal/utama
app.use("/api", require("./routes/api"));

app.listen(port, () => {
  console.log(`API server berjalan di port : ${port}`);
});
