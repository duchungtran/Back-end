const mongoose = require("mongoose");
const customerSchema = mongoose.Schema({
  username: {
    type: String,
    min: 5,
    max: 255,
    required: true,
  },
  password: {
    type: String,
    min: 5,
    max: 225,
    required: true,
  },
  role: {
    type: String,
    enum: ["customer"],
  },
  hoten: {
    type: String,
    min: 5,
    max: 255,
    required: true,
  },
  diachi: {
    type: String,
    min: 5,
    max: 255,
    required: true,
  },
  sodienthoai: {
    type: String,
    min: 10,
    max: 10,
    required: true,
  },
  email: {
    type: String,
  },
});
module.exports = mongoose.model("Customer", customerSchema);
