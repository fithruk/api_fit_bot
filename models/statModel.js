const { Schema, model } = require("mongoose");
// Релизовать функционал сохранения прогресса полдьзователя
const StatisticsShema = new Schema({});

module.exports = model("StatisticsShema", StatisticsShema);
