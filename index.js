require("dotenv").config();
const homeRoute = require("./routes/homeRoute");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,

    methods: ["GET", "POST", "DELETE"],
  })
);

app.use("/", homeRoute);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CLIENT);
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();

module.exports = app;
