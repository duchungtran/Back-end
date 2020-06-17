const Customer = require("../models/Customer");
exports.login = function (req, res) {
  Customer.findOne({ email: req.body.email }).exec(function (err, user) {
    if (err) {
      return res.json({ err });
    } else if (!user) {
      return res.json({ err: "Username and Password are incorrect" });
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result === true) {
        req.session.user = user;
        res.json({
          user: user,
          login: "success",
        });
      } else {
        return res.json({ err: "Username and Password are incorrect" });
      }
    });
  });
};
