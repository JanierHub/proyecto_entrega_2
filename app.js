const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const articlesRoutes = require("./routes/categories.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas principales
app.use("/articles", articlesRoutes);

// 🔗 Conexión a MongoDB Atlas
mongoose.connect("mongodb+srv://javierdb_user:1234Javier@cluster0.1apiaxm.mongodb.net/foroKL?retryWrites=true&w=majority&appName=Cluster0
")
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// Puerto del servidor
const PORT = 3000;
app.listen(PORT, () => console.log(🚀 Servidor corriendo en puerto ${PORT}));
