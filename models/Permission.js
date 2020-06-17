const mongoose = require("mongoose");
const permissionSchema = mongoose.Schema({
  name: {
    type: String,
    min: 6,
    max: 255,
    required: true,
  },
});
module.exports = mongoose.model("Permission", permissionSchema);
