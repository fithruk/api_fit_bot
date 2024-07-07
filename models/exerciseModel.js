const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  steps: [
    {
      step_number: {
        type: Number,
        required: true,
      },
      step_name: {
        type: String,
        required: true,
      },
      description: [
        {
          phase: {
            type: String,
          },
          instruction: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
  target_muscles: {
    primary: {
      type: [String],
      required: true,
    },
    secondary: {
      type: [String],
    },
    additional: {
      type: [String],
    },
  },
});

module.exports = model("Exercise", exerciseSchema);
