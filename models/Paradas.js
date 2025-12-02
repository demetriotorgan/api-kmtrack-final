const mongoose = require('mongoose');

const ParadasSchema = new mongoose.Schema({
    local: {type: String, default:'Parada'},
    tipo:{type:String, enum:['abastecimento', 'descanço', 'alimentação', 'atrativo', 'pernoite']},
    horaInicio: {type:Date, default:Date.now}, 
    horaFinal: {type:Date, default:null}, 
});

module.exports = mongoose.model('Paradas', ParadasSchema);