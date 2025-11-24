// config/heartbeat.js
const mongoose = require("mongoose");

function iniciarHeartbeat(intervalo = 10000) {
  setInterval(async () => {
    try {
      await mongoose.connection.db.admin().ping();
      console.log("💓 Heartbeat → MongoDB OK");
    } catch (err) {
      console.error("💥 Heartbeat falhou:", err.message);
    }
  }, intervalo);
}

module.exports = iniciarHeartbeat;
