// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Conectar DB (el archivo hace el connect y exporta mongoose)
require("./database/connection");

const usersRoutes = require("./routes/users.routes");
const postsRoutes = require("./routes/posts.routes");
const categoriesRoutes = require("./routes/categories.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Rutas base
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/categories", categoriesRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.json({ message: "Foro de Opinión General KL - API activa" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(🚀 Servidor corriendo en puerto ${PORT}));
