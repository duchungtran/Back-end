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
  const order = new Order({
    customer: req.body.customer,
  });
  console.log(req.body);
  try {
    const saveOrder = await order.save();
    res.json(saveOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
