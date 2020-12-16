const router = require("express").Router();
const Cart = require("../models/Cart");
//Router get Cart
router.get("/", async (req, res) => {
  const query = JSON.parse(req.query.updates);
  const userId = JSON.parse(query.value);
  try {
    var result = await Cart.findOne({ customer: userId }).populate(
      "product.productId"
    );
    //console.log(result);
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
//Router tạo + thêm sản phẩm
router.post("/", async (req, res) => {
  const userId = req.body.userId;
  const productId = req.body.product.productId;
  const quantity = req.body.product.quantity;
  const size = req.body.product.size;
  try {
    let cart = await Cart.findOne({ customer: userId });
    if (cart) {
      let itemIndex = cart.product.findIndex((p) => p.productId == productId);
      //console.log(itemIndex);
      if (itemIndex > -1) {
        let productItem = cart.product[itemIndex];
        productItem.quantity = quantity;
        cart.product[itemIndex] = productItem;
      } else {
        cart.product.push({ productId, quantity, size });
      }
      try {
        saveCart = await cart.save();
        res.json(saveCart);
      } catch (err) {
        res.json({ message: err });
      }
    } else {
      try {
        const cart = new Cart({
          customer: userId,
          product: [{ productId, quantity, size }],
        });
        saveCart = await cart.save();
        res.json(saveCart);
      } catch (err) {
        res.json({ message: err });
      }
    }
  } catch (err) {
    res.json({ message: err });
  }
});
//Router xóa sản phẩm trong Cart
router.delete("/", async (req, res) => {
  const userId = JSON.parse(req.query.updates[0]);
  const productId = JSON.parse(req.query.updates[1]);
  let cart = await Cart.findOne({ customer: userId.value });
  try {
    const deleteCart = await Cart.updateOne(
      { _id: cart._id },
      { $pull: { product: { productId: productId.value } } }
    );
    res.json(deleteCart);
  } catch (err) {
    res.json({ message: err });
  }
});
//Router xóa Cart
router.delete("/:id", async (req, res) => {
  const customerId = req.params.id;
  console.log(req.params);
  try {
    const deleteCart = await Cart.deleteOne({ customer: customerId });
    res.json(deleteCart);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
