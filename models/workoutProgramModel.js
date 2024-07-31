const { Schema, model } = require("mongoose");

const workoutProgramSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  numberOfCurrentWorkout: {
    type: Number,
    required: true,
  },
  workoutProgram: [
    [
      {
        sets: {
          type: Number,
          required: true,
        },
        reps: {
          type: Number,
          required: true,
        },
        weight: {
          type: Number,
          required: true,
        },
        exersice: {
          type: String,
          required: true,
        },
        tonnage: {
          type: Number,
          required: true,
        },
      },
    ],
  ],
});

module.exports = model("WorkoutProgram", workoutProgramSchema);
