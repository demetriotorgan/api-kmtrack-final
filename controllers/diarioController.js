const Diario = require('../models/Diario');

module.exports.adicionarDiario = async(req,res)=>{
try {
    const {titulo,texto, data} = req.body;
    const diarioExistente = await Diario.findOne({titulo});
    if(diarioExistente){
        return res.status(400).json({
            sucess:false,
            msg:'Tiulo de diário já cadastrado'
        });
    };

    const novoDiario = new Diario({
        titulo,
        texto,
        data
    });

    await novoDiario.save();
    return res.status(201).json({
        sucess:true,
        msg:'Diário salvo com sucesso',
        diario: novoDiario
    });

} catch (error) {
    console.log('Erro ao cadastrar diario: ', error);
        return res.status(500).json({
            sucess:false,
            msg:'Erro interno ao salvar diario',
            error: error.message
        });    
    }
};

module.exports.listarDiario = async(req,res)=>{
    try {
        const diarios = await Diario.find()
        .sort({_id: -1})
        .exec();
        res.status(200).json(diarios);
    } catch (error) {
        res.status(500).json({
            msg:'Erro ao listar diarios'
        });
    }
};

module.exports.deletarDiario = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({message:'Id do diário não fornecido'});
        }
        const diarioRemovido = await Diario.findByIdAndDelete(id);
        if(!diarioRemovido){
            return res.status(400).json({message:'Diario não encontrado'});
        }
        res.status(200).json({
            message:'Diario excluido com sucesso',
            diario: diarioRemovido
        });
    } catch (error) {
        console.error('Erro ao excluir diario', error);
        res.status(500).json({
            message:'Erro ao excluir abastecimento',
            error:error.message
        });
    }
};
