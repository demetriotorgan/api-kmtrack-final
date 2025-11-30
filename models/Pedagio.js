const mongoose = require('mongoose')

const TrechoPedagio = new mongoose.Schema({
    local: {type: String, default:'Pedagio'},
    valor: {type: Number, default:0},
    data:{type:Date, default:Date.now}
});

module.exports = mongoose.model('Pedagio', TrechoPedagio);