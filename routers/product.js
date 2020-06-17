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
  limits: { fieldSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});
router.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const size = parseInt(req.query.size);
  let total = -1;
  let filter = {};
  if (req.query.updates) {
    filter = JSON.parse(req.query.updates);
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
  console.log(result);
});
router.post("/", upload.array("productImage", 3), async (req, res) => {
  path_arr = req.files.map((v) => v.path);
  console.log(path_arr);
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

module.exports = router;
