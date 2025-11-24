const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    console.log("🔁 Conexão MongoDB já existe. Reutilizando...");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DATABASE_URL, {
      bufferCommands: false,      // não acumula queries quando cai
      autoIndex: false,           // evita travar o Mongo no free-tier
      maxPoolSize: 10,            // evita excesso de conexões simultâneas
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB conectado");
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
  }
}

module.exports = connectDB;
