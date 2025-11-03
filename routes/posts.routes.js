// /routes/posts.routes.js
const express = require("express");
const router = express.Router();
const Post = require("../models/post.model");
const User = require("../models/user.model");
const Category = require("../models/category.model");

// Crear publicación
router.post("/", async (req, res) => {
  try {
    const { titulo, contenido, autor, categoria } = req.body;
    if (!titulo || !contenido || !autor) {
      return res.status(400).json({ error: "titulo, contenido y autor son obligatorios" });
    }

 // Validar autor existe
    const userExists = await User.findById(autor);
    if (!userExists) return res.status(404).json({ error: "Autor no encontrado" });

    // Validar categoría si viene
    if (categoria) {
      const catExists = await Category.findById(categoria);
      if (!catExists) return res.status(404).json({ error: "Categoría no encontrada" });
    }

    const post = new Post({ titulo, contenido, autor, categoria });
    await post.save();
    res.status(201).json({ message: "Publicación creada correctamente", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear publicación" });
  }
});

// Listar publicaciones (populate autor y categoria)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("autor", "nombre correo rol").populate("categoria", "nombre descripcion").sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener publicaciones" });
  }
});

// Obtener una publicación
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("autor", "nombre correo rol").populate("categoria", "nombre descripcion");
    if (!post) return res.status(404).json({ error: "Publicación no encontrada" });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener publicación" });
  }
});

// Actualizar publicación
router.put("/:id", async (req, res) => {
  try {
    const data = req.body;
    if (data.autor) delete data.autor; // no permitir cambiar autor aquí
    await Post.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json({ message: "Publicación actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar publicación" });
  }
});
