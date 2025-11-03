const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
