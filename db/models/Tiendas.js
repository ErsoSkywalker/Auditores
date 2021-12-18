const mongoose = require("mongoose");

const TiendasSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  nombreGerente: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Tienda", TiendasSchema);
