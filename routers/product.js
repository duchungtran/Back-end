const router = require("express").Router();
const Product = require("../models/Product");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    cb(null, true);
  else cb(null, false);
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
router.get("/", async (req, res) => {
  //console.log(req.query);
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
      var result = await Product.find(query)
        .skip((page - 1) * size)
        .limit(size);
      res.json(result);
      //console.log(result);
    } else {
      var result = await Product.find();

      res.json(result);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    var result = await Product.findOne({ _id: req.params.id });
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
  //console.log(result);
});
router.post("/", upload.array("productImage", 3), async (req, res) => {
  path_arr = req.files.map((v) => v.path);
  var product = new Product({
    name: req.body.name,
    size: req.body.size,
    price: req.body.price,
    brand: req.body.brand,
    soluong: req.body.soluong,
    productImage: path_arr,
    mota: req.body.mota,
  });
  try {
    const saveProduct = await product.save();
    res.json(saveProduct);
  } catch (err) {
    res.json({ message: err });
  }
});
router.put("/:id", async (req, res) => {
  console.log(req.body);
  try {
    const updateProduct = await Product.update(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(updateProduct);
  } catch (err) {
    res.json({ message: err });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const removeProduct = await Product.deleteOne({ _id: req.params.id });
    res.json(removeProduct);
  } catch (err) {
    res.json({ message: err });
  }
});
router.patch("/:id", async (req, res) => {
  console.log(req.body);
  try {
    const updateProduct = await Product.updateOne(
      { _id: req.params.id },
      { $set: { soluong: req.body.soluong } }
    );
    res.json(updateProduct);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
