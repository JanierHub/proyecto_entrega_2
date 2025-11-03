// /database/connection.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Cargar variables de entorno desde .env
dotenv.config();

// Leer la URI desde el archivo .env
const MONGODB_URI = process.env.MONGODB_URI;

// Verificar que exista la variable en .env
if (!MONGODB_URI) {
  console.log("⚠️  No se encontró MONGODB_URI en el archivo .env");
  console.log("Ejemplo de formato correcto en .env:");
  console.log("MONGODB_URI=mongodb+srv://usuario:password@cluster0.mongodb.net/foroKL");
  process.exit(1);
}

// Conexión con manejo de eventos
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // 10 segundos de timeout
  })
  .then(() => {
    console.log("✅ Conexión exitosa a MongoDB Atlas (foroKL)");
  })
  .catch((error) => {
    console.error("❌ Error al conectar a MongoDB Atlas:");
    console.error(error.message);
    process.exit(1);
  });

// Monitorear desconexión y reconexión
mongoose.connection.on("disconnected", () => {
  console.log("⚠️  Se perdió la conexión con MongoDB. Intentando reconectar...");
});

mongoose.connection.on("reconnected", () => {
  console.log("🔁 Reconectado a MongoDB correctamente.");
});

module.exports = mongoose;
