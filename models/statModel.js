const { Schema, model } = require("mongoose");
// Релизовать функционал сохранения прогресса пользователя
const StatisticsShema = new Schema({
  absoluteRecords: {},
});

module.exports = model("StatisticsShema", StatisticsShema);
