const Pedagio = require('../models/Pedagio');
const mongoose = require('mongoose');

module.exports.adicionarPedagio = async(req,res)=>{
    try {
        const {local, valor, data} = req.body;
        
        const pedagioExistente = await Pedagio.findOne({local});
        if(pedagioExistente){
            return res.status(400).json({
                sucess:false,
                msg:'Pedagio já existente'
            });
        }

        const novoPedagio = new Pedagio({
            local,
            valor,
            data
        });

        await novoPedagio.save();
        return res.status(201).json({
            sucess:true,
            msg:'Trecho cadastrado com sucesso',
            pedagio: novoPedagio
        });
    } catch (error) {
        console.error('Erro ao cadastrar pedagio: ', error);
        return res.status(500).json({
            sucess:false,
            msg:'Erro interno ao salvar pedágio',
            error: error.message
        })
    }
};

module.exports.listarPedagios = async(req,res)=>{
    try {
        const pedagios = await Pedagio.find()
        .sort({_id:-1})
        .exec();
        res.status(200).json(pedagios);
    } catch (error) {
        res.status(500).json({
            msg:'Erro ao listar trechos'
        })
    }
};

module.exports.deletarPedagio = async(req,res)=>{
    try {
        const {id} = req.params;

        if(!id){
            return res.status(400).json({message: 'Id do pedagio não fornecido'});
        }

        const pedagioRemovido = await Pedagio.findByIdAndDelete(id);
        if(!pedagioRemovido){
            return res.status(400).json({messageL:'Pedagio nao encontrado'});
        }
        res.status(200).json({
            message:'Trecho excluido com sucesso',
            pedagio: pedagioRemovido
        });
    } catch (error) {
        console.error('Erro ao excluir pedagio', error);
        res.status(500).json({
            message:'Erro ao excluir pedagio',
            error: error.message
        });
    }
};