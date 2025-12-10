const mongoose = require('mongoose')

const DiarioSchema = new mongoose.Schema({
    titulo:{type:String, default:''},
    texto: {type:String, default:null}
});

module.exports = mongoose.model('Diario', DiarioSchema);