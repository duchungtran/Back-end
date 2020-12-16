const mongoose = require("mongoose");
const Customer = require("../models/Customer");
const Product = require("../models/Product");
const orderSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  hoten: {
    type: String,
  },
  diachi: {
    type: String,
    required: true,
  },
  sodienthoai: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Order", orderSchema);
