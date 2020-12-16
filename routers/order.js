const expess = require("express");
const router = expess.Router();
const Order = require("../models/Order");

router.get("/", async (req, res) => {
  try {
    var result = await Order.find();
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.post("/", async (req, res) => {
  //console.log(req.body)
  let order
  if (req.body.customer) {
    order = new Order({
      customer: req.body.customer,
      diachi: req.body.diachi,
      sodienthoai: req.body.sodienthoai,
    });
  } else {
    order = new Order({
        hoten: req.body.hoten,
        diachi: req.body.diachi,
        sodienthoai: req.body.sodienthoai,
    });
  }
  try {
    //console.log(order);
    const saveOrder = await order.save();
    res.json(saveOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
