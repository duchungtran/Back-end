const router = require("express").Router();
const User = require("../models/User");
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
router.get("/", async (res, req) => {
  try {
    var result = await User.find.exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    role: "admin",
    hoten: req.body.hoten,
    email: req.body.email,
  });
  try {
    const saveUser = await user.save();
    res.json(saveUser);
  } catch (err) {
    res.json({ message: err });
  }
});
router.post("/login", requiresLogout, async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Người dùng không tồn tại");
  //console.log(user);
  //const validPass = await bcrypt.compare(req.body.password, user.password);
  if (req.body.password != user.password)
    return res.status(400).send("Mật khẩu không đúng");
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.send({ token });
});
router.get("/:_id", async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
