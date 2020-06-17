const mongoose = require("mongoose");
const Order = require("./Order");
const Product = require("./Product");

const orderdetailSchema = mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  soluong: {
    type: Number,
    required: true,
  },
  mota: {
    type: String,
  },
});

module.exports = mongoose("OrderDetail", orderdetailSchema);
