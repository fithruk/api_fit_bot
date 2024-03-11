const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  //   first_name: {
  //     type: String,
  //     required: true,
  //   },
  registrationDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("User", userSchema);
