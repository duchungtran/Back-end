const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 255,
    min: 5,
  },
  password: {
    type: String,
    required: true,
    max: 255,
    min: 5,
  },
  role: {
    type: String,
    enum: ["admin"],
  },
  hoten: {
    type: String,
    required: true,
    max: 255,
    min: 5,
  },
  email: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
