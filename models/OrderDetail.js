const mongoose = require("mongoose");
const Order = require("./Order");
const Product = require("./Product");
const orderdetailSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  product: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Product",
    required: true,
  },
  size: {
    type: [Number],
    required: true,
  },
  soluong: {
    type: [Number],
    required: true,
  },
  mota: {
    type: String,
  },
});

module.exports = mongoose.model("OrderDetail", orderdetailSchema);
