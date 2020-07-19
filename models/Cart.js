const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
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
});

module.exports = mongoose.model("Cart", cartSchema);
