const Trecho = require('../models/Trecho')
const mongoose = require('mongoose')

module.exports.adicionarTrecho = async(req,res)=>{
    try {
        const {nomeTrecho, distancia, inicio, fim} = req.body;
        const trechoExistente = await Trecho.findOne({nomeTrecho});
        if(trechoExistente){
            return res.status(400).json({
                sucess:false,
                msg: "Trecho já cadastrado"
            });
        }
        const novoTrecho = new Trecho({
            nomeTrecho, distancia, inicio, fim
        });
        await novoTrecho.save();
        return res.status(201).json({
            sucess:true,
            msg:"Trecho cadastrado com sucesso",
            trecho: novoTrecho
        });
    } catch (error) {
        console.error("Erro ao cadastrar trecho: ", error);
        return res.status(500).json({
            sucess:false,
            msg:'Erro interno ao salvar trecho',
            error: error.message
        })
    }
};

module.exports.listarTrechos = async(req,res)=>{
    try {
        const trechos = await Trecho.find()
            .sort({_id:-1})
            .exec();
            res.status(200).json(trechos);
    } catch (error) {
        res.status(500).json({
            msg:'Erro ao listar trechos'
        })
    }
};

module.exports.deletarTrecho = async(req,res)=>{
    try {
        const {id} = req.params;

        if(!id) {
            return res.status(400).json({message: 'Id do trecho não fornecido'});
        }

        const trechoRemovido = await Trecho.findByIdAndDelete(id);

        if(!trechoRemovido){
            return res.status(400).json({message:'Trecho não encontrado'});
        }

        res.status(200).json({
            message:'Trecho Excluido com sucesso!',
            trecho: trechoRemovido,
        });
    } catch (error) {
        console.error('Erro ao excluir trecho', error);
        res.status(500).json({
            message:'Erro ao excluir trecho',
            error: error.message
        });
    }
};