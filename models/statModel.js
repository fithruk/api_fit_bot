const { Schema, model } = require("mongoose");
// Релизовать функционал сохранения прогресса пользователя
const StatisticsShema = new Schema({
  userName: {
    type: String,
    requaired: true,
  },
  absoluteRecords: [
    {
      exersice: {
        type: String,
      },
      weight: {
        type: Number,
      },
      countOfReps: {
        type: Number,
      },
      date: {
        type: Date,
      },
    },
  ],
});

module.exports = model("StatisticsShema", StatisticsShema);
