const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const iniciarHeartbeat = require('./config/heartbeat'); 
const {connectDB, getMongoStatus} = require('./config/database')


const trechoRoutes = require('./routes/trechoRoutes');


const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({
    origin:'*',
}));
app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    next();    
  });

 // ----------------------------------------------------------
// 🟢 INICIAR SERVIDOR APENAS DEPOIS DO BANCO CONECTAR
// ----------------------------------------------------------
async function startServer() {
  console.log("⏳ Conectando ao MongoDB...");
  await connectDB();        // <-- AGORA está aguardando

  iniciarHeartbeat();        // <-- iniciar após conexão OK

  app.use("/", trechoRoutes);

  app.get("/", (req, res) => {
    res.status(200).send("🚀 API de Viagens está online e funcional!");
  });

 app.listen(PORT, () =>
    console.log(`Rodando na porta ${PORT}`)
  );
}

// ----------------------------------------------------------
// 🧪 ENDPOINT: Status da conexão com o MongoDB
// ----------------------------------------------------------
app.get("/db-status", (req, res) => {
  return res.json({
    mongo: getMongoStatus(),
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

startServer();