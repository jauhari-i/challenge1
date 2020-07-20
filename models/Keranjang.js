const mongoose = require("mongoose");

const keranjangSchema = new mongoose.Schema({
  uuid: {
    type: String,
    unique: true,
    required: true,
  },
  barang: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  editedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Keranjang = mongoose.model("keranjang", keranjangSchema);
