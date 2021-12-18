const mongoose = require("mongoose");

const ResultadosSchema = mongoose.Schema({
  Usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  Tienda: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tienda",
    required: true,
  },
  Respuestas: [
    {
      type: String,
      trim: true,
      default: "",
    },
  ],
  HoraInicio: {
    type: Date,
    default: Date.now(),
  },
  HoraFinal: {
    type: Date,
    default: null,
  },
  tipo: {
    type: Number,
    min: 1,
    max: 3,
    required: true,
  },
});

module.exports = mongoose.model("Resultados", ResultadosSchema);
