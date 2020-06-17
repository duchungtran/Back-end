const mongoose = require("mongoose");
const Customer = require("../models/Customer");
const Product = require("../models/Product");
const orderSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
});
module.exports = mongoose("Order", orderSchema);
