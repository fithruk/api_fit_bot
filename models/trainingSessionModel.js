const moment = require("moment-timezone");
const { Schema, model } = require("mongoose");

const trainingSessionSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  dateOfStart: {
    type: Date,
    default: () => moment().tz("Europe/Kiev").toDate(),
    required: true,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  exercises: [
    {
      exercise: {
        type: String,
        required: true,
      },
      numberOfSet: {
        type: Number,
        required: true,
      },
      countOfReps: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      timeOfStartOfNewSet: {
        type: Date,
      },
    },
  ],
});

module.exports = model("TrainingSession", trainingSessionSchema);
