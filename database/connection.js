const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.log("  No se encontró MONGODB_URI en el archivo .env");
  console.log("Ejemplo: MONGODB_URI=mongodb+srv://usuario:password@cluster0.mongodb.net/foroKL");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => console.log("✅ Conexión exitosa a MongoDB Atlas (foroKL)"))
  .catch((error) => {
    console.error("❌ Error al conectar a MongoDB Atlas:", error.message);
    process.exit(1);
  });

module.exports = mongoose;
