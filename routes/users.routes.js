const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

// Crear usuario
router.post("/", async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;
    if (!nombre || !correo || !contraseña) {
      return res.status(400).json({ error: "nombre, correo y contraseña son obligatorios" });
    }
    // Evitar duplicados
    const exists = await User.findOne({ correo });
    if (exists) return res.status(409).json({ error: "El correo ya está registrado" });

    const user = new User({ nombre, correo, contraseña, rol });
    await user.save();
    const retorno = user.toObject();
    delete retorno.contraseña;
    res.status(201).json({ message: "Usuario creado correctamente", user: retorno });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

// Obtener todos (sin contraseña)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-contraseña");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// Actualizar usuario
router.put("/:id", async (req, res) => {
  try {
    const data = { ...req.body };
    // No permitir actualizar contraseña directamente aquí (o si se permite, insertar lógica de hash)
    if (data.contraseña) delete data.contraseña;
    await User.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
});
