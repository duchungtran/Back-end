const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    max: 255,
    min: 5,
    required: true,
  },
  size: {
    type: Number,
  },
  price: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  soluong: {
    type: Number,
    required: true,
  },
  mota: {
    type: String,
  },
  productImage: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
