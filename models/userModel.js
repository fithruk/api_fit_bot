const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userTall: {
    type: Number,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("User", userSchema);
