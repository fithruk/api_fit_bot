const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema({
  muscleGroup: {
    type: String,
    required: true,
  },
  exerciseName: {
    type: String,
    required: true,
  },
  exerciseDescription: {
    type: String,
    required: true,
  },
  targetMuscles: {
    type: String,
    required: true,
  },
});

module.exports = model("Exercise", exerciseSchema);
