const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  rol: { type: String, enum: ["estudiante", "profesor", "moderador", "admin"], default: "estudiante" },
  contraseña: { type: String, required: true }
}, { timestamps: true });

userSchema.pre("save", async function(next) {
  if (!this.isModified("contraseña")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
