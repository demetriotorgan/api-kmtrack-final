const mongoose = require('mongoose')

const CustoSchema = new mongoose.Schema({
    descricao: {type: String, default:'Gasto'},
    valor: {type:Number, default:0},
    tipo: {type:String, enum:['debito','credito', 'pix']},
    data: {type:Date, default:Date.now}
});

module.exports = mongoose.model('Custos', CustoSchema);
