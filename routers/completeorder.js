const expess = require("express");
const router = expess.Router();
const CompleteOrder = require("../models/CompleteOrder");

router.get("/", async (req, res) => {
  console.log(req.query);
  const page = req.query.page || 1;
  const size = parseInt(req.query.size);
  let total = -1;
  let filter = {};
  if (req.query.updates) {
    filter = JSON.parse(req.query.updates);
    //console.log(filter);
  }
  let query = {};
  if (filter) {
    if (filter.value) {
      query = JSON.parse(filter.value);
    }
  }
  try {
    if (req.query) {
      var result = await CompleteOrder.find(query)
        .skip((page - 1) * size)
        .limit(size)
        .populate({ path: "order", populate: { path: "customer" } })
        .populate("product.product");
      res.json(result);
    } else {
      var result = await CompleteOrder.find()
        .populate({ path: "order", populate: { path: "customer" } })
        .populate("product.product");
      res.json(result);
      console.log(result);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  //console.log(req.body);
  productId = req.body.product.map((v) => v.id);
  sizes = req.body.size.map((v) => v.size);
  soluongs = req.body.soluong.map((v) => v.soluong);
  const completeOrder = new CompleteOrder({
    id: req.body.id,
    order: req.body.order,
    product: req.body.product,
    size: req.body.size,
    soluong: req.body.soluong,
    mota: req.body.mota,
  });
  console.log(completeOrder);
  try {
    var saveCompleteOrder = await completeOrder.save();
    res.json(saveCompleteOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removeCompleteOrder = await CompleteOrder.deleteOne({
      _id: req.params.id,
    });
    res.json(removeCompleteOrder);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
