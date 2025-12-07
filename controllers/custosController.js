const Custos = require('../models/Custos');
const mongoose = require('mongoose');

module.exports.adicioanrCusto = async(req,res)=>{
    try {
        const {descricao, valor, tipo, data} = req.body;
        const custoExistente = await Custos.findOne({descricao});

        if(custoExistente){
            return res.status(400).json({
                sucess:false,
                msg:'Custos já cadastrado'
            });
        };

        const novoCusto = new Custos({
            descricao, 
            valor, 
            tipo, 
            data
        });

        await novoCusto.save();
        return res.status(201).json({
            sucess:true,
            msg:'Custo cadastrado com sucesso',
            custo: novoCusto
        });
    } catch (error) {
    console.log('Erro ao cadastrar abastecimento: ', error);
    
    return res.status(500).json({
        sucess:false,
        msg:'Erro interno ao salvar abastecimento',
        error: error.message
        });
    }
};

module.exports.listarCustos = async(req,res)=>{
try {
    const custos = await Custos.find()
        .sort({_id:-1})
        .exec();
        res.status(200).json(custos);
} catch (error) {
    res.status(500).json({
        msg:'Erro ao listar custos'
    });
    }
};

module.exports.deletarCustos = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({message:'Id de custo não fornecido'});
        }
        const custoRemovido = await Custos.findByIdAndDelete(id);
        if(!custoRemovido){
            return res.status(400).json({message:'Custo não encontrado'})
        }
        res.status(200).json({
            message:'Custo excluido com sucesso',
            custo: custoRemovido
        });
    } catch (error) {
         console.error('Erro ao excluir parada', error);
    res.status(500).json({
        message:'Erro ao excluir abastecimento',
        error:error.message
       });
    }
};

