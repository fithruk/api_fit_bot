const { Schema, model } = require("mongoose");
// Релизовать функционал сохранения прогресса пользователя
const StatisticsShema = new Schema({});

module.exports = model("StatisticsShema", StatisticsShema);
