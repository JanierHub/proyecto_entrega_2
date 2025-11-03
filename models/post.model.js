const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  fecha: { type: Date, default: Date.now },
  publicado: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
