const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // Store image path
});
module.exports = mongoose.model("Items", itemSchema);
