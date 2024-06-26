require("dotenv").config();
const path = require("path");
const exerciseRoute = require("./routes/exerciseRoute");
const trainingsRoute = require("./routes/trainingRoute");
const analiticsRoute = require("./routes/analiticsRoute");
const registrationRoute = require("./routes/registrationRoute");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,

    methods: ["GET", "POST", "DELETE"],
  })
);

app.use("/exercise", exerciseRoute);
app.use("/trainings", trainingsRoute);
app.use("/analitics", analiticsRoute);
app.use("/registration", registrationRoute);

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
