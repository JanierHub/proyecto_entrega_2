// /routes/categories.routes.js
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
    console.error(error);
    res.status(500).json({ error: "Error al crear categoría" });
  }
});

// Listar categorías
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
});

// Obtener por id
router.get("/:id", async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id);
    if (!cat) return res.status(404).json({ error: "Categoría no encontrada" });
    res.json(cat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener categoría" });
  }
});

// Actualizar categoría
router.put("/:id", async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Categoría actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar categoría" });
  }
});

// Eliminar
router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar categoría" });
  }
});

module.exports = router;