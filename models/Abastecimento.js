const mongoose = require('mongoose');

const  AbastecimentoSchema = new mongoose.Schema({
    local: {type:String, default:'Local'},
    valor: {type:Number, default:0},
    litros: {type: Number, default:0},
    odometro: {type:Number, default:0},
    valorLitro: {type:Number, default:0},
    data:{type:Date, default:Date.now}
});

module.exports = mongoose.model('Abastecimentos', AbastecimentoSchema);