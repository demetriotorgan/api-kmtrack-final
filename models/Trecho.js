const mongoose = require('mongoose')

const TrechoSchema = new mongoose.Schema({
    nomeTrecho : {type: String, default:'Trecho'},
    distancia : {type:Number, default:0},
    inicio: {type:Date, default: Date.now},
    fim: {type:Date, default:null}
});

module.exports = mongoose.model('Trecho', TrechoSchema);