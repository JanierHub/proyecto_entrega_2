const express = require("express");
const router = express.Router();
const Category = require("../models/category.model");

// Crear categoría
router.post("/", async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre) return res.status(400).json({ error: "nombre es obligatorio" });
    const exists = await Category.findOne({ nombre });
    if (exists) return res.status(409).json({ error: "Categoría ya existe" });

    const cat = new Category({ nombre, descripcion });
    await cat.save();
    res.status(201).json({ message: "Categoría creada correctamente", category: cat });
  } catch (error) {
    res.status(500).json({ error: "Error al crear categoría" });
  }
});
// Listar categorías
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener categorías" });
  }
});
