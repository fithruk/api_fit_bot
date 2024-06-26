const { Schema, model } = require("mongoose");

const StatisticsShema = new Schema({
  userName: {
    type: String,
    requaired: true,
  },
  averageTimeOfRest: {
    averageRestInMinutes: {
      type: Number,
      requaired: true,
    },
    averageRestInSeconds: {
      type: Number,
      requaired: true,
    },
  },
  workoutDuration: {
    durationInHours: {
      type: Number,
      requaired: true,
    },
    durationInMinutes: {
      type: Number,
      requaired: true,
    },
  },
  dateOfWorkout: {
    type: Date,
    requaired: true,
  },
  workoutId: {
    type: Schema.Types.ObjectId,
    ref: "TrainingSession",
    requaired: true,
  },
});

module.exports = model("workoutStatistics", StatisticsShema);
