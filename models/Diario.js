const mongoose = require('mongoose')

const DiarioSchema = new mongoose.Schema({
    titulo:{type:String, default:''},
    texto: {type:String, default:null},
    data:{type:Date, default:Date.now}
});

module.exports = mongoose.model('Diario', DiarioSchema);