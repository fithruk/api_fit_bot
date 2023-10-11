const { Schema, model } = require("mongoose");

const trainingSessionSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  dateOfStart: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  exercises: [
    {
      exercise: {
        type: Schema.Types.ObjectId,
        ref: "Exercise",
        // required: true,
      },
      numberOfSet: {
        type: Number,
        // required: true,
      },
      countOfReps: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = model("TrainingSession", trainingSessionSchema);
