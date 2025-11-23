const mongoose = require('mongoose')

const TrechoSchema = new mongoose.Schema({
    nomeTrecho : {type: String, default:'Trecho'},
    distancia : {type:Number, default:0},
    inicio: {type:Date, default: Date.now},
    fim: {type:Date, default:null},
    data: {type:Date, default:Date.now}
});

module.exports = mongoose.model('Trecho', TrechoSchema);