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
