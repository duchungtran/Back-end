const expess = require("express");
const router = expess.Router();
const OrderDetail = require("../models/OrderDetail");

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
      var result = await OrderDetail.find(query)
        .skip((page - 1) * size)
        .limit(size)
        .populate({ path: "order", populate: { path: "customer" } })
        .populate("product.product");
      res.json(result);
    } else {
      var result = await OrderDetail.find()
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
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 7; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  productId = req.body.orderDetail.map((v) => v.id);
  sizes = req.body.orderDetail.map((v) => v.size);
  soluongs = req.body.orderDetail.map((v) => v.soluong);
  const orderDetail = new OrderDetail({
    id: "Order" + result,
    order: req.body.order,
    product: productId,
    size: sizes,
    soluong: soluongs,
    mota: req.body.mota,
  });
  //console.log(orderDetail);
  try {
    var saveOrderDetail = await orderDetail.save();
    res.json(saveOrderDetail);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
