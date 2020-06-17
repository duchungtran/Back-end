const mongoose = require("mongoose");
const roleSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    max: 255,
    min: 6,
  },
  permissions: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Permission",
    require: true,
  },
});
module.exports = mongoose.model("Role", roleSchema);
