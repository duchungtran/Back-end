const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { registerValidation } = require("../validation");
function requiresLogout(req, res, next) {
  if (req.session && req.session.user) {
    return res.json({ err: "You must be Logout in to Login continue" });
  } else {
    return next();
  }
}

router.post("/login", requiresLogout, async (req, res) => {
  const user = await Customer.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Người dùng không tồn tại");
  //console.log(user);
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Mật khẩu không đúng");
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.send({ token });
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
      var result = await Customer.find(query)
        .skip((page - 1) * size)
        .limit(size);
      res.json(result);
      //console.log(result);
    } else {
      var result = await Customer.find();

      res.json(result);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/register", async (req, res) => {
  //if (req.body) {
  //const { error } = registerValidation(req.body);
  //if (error) return res.status(400).send(error.details[0].message);
  //}
  let customerExit = await Customer.findOne({ username: req.body.username });
  if (customerExit) return res.status(400).send("Tên tài khoản đã tồn tại");
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  const customer = new Customer({
    username: req.body.username,
    password: hash,
    role: "customer",
    hoten: req.body.hoten,
    diachi: req.body.diachi,
    sodienthoai: req.body.sodienthoai,
    email: req.body.email,
  });
  console.log(customer);
  try {
    const saveCustomer = await customer.save();
    res.json(saveCustomer);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:_id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params._id);
    res.json(customer);
  } catch (err) {
    res.json({ message: err });
  }
});
router.put("/:id", async (req, res) => {
  console.log(req.body);
  try {
    const updateCustomer = await Customer.update(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(updateCustomer);
  } catch (err) {
    res.json({ message: err });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const removeCustomer = await Customer.deleteOne({ _id: req.params.id });
    res.json(removeCustomer);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
