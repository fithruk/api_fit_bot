const { Schema, model } = require("mongoose");

const programIdsStorage = new Schema({
  userName: {
    type: String,
    required: true,
  },
  workoutId: {
    type: Schema.Types.ObjectId,
    ref: "TrainingSession",
    requaired: true,
  },
});

module.exports = model("workoutsWithProgramId", programIdsStorage);
