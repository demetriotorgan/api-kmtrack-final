const Paradas = require('../models/Paradas');
const mongoose = require('mongoose');

module.exports.adicionarParada = async(req,res)=>{
    try {
        const {local, tipo, horaInicio, horaFinal} = req.body;

        const paradaExistente = await Paradas.findOne({local});
        if(paradaExistente){
            return res.status(400).json({
                sucess:false,
                msg:'Parada já cadastrada'
            })
        };

        const novaParada = new Paradas({
            local, 
            tipo, 
            horaInicio, 
            horaFinal: horaFinal ?? null
        });

        await novaParada.save();
        return res.status(201).json({
            sucess:true,
            msg:'Parada cadastrada com sucesso',
            parada: novaParada
        });
    } catch (error) {
        console.error('Erro ao cadastrar parada: '. error);
        return res.status(500).json({
            sucess:false,
            msg:'Erro interno ao salvar parada',
            error:error.message
        })
    }
};

module.exports.listarParadas = async(req,res)=>{
    try {
        const paradas = await Paradas.find()
        .sort({_id:-1})
        .exec();
        res.status(200).json(paradas);
    } catch (error) {
        res.status(500).json({
            msg:'Erro ao listar paradas'
        })
    }
};

module.exports.deletarParada = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({message: 'Id da parada não fornecido'});
        }

        const paradaRemovida = await Paradas.findByIdAndDelete(id);
        if(!paradaRemovida){
            return res.status(400).json({message:'Parada não encontrada'});
        }
        res.status(200).json({
            message: 'Trecho excluido com sucesso',
            parada: paradaRemovida
        });
    } catch (error) {
        console.error('Erro ao excluir parada', error);
        res.status(500).json({
            message:'Erro ao excluir parada',
            error: error.message
        });
        
    }
};

module.exports.paradasRecentes = async (req, res) => {
  try {
    // Buscar os 3 registros mais recentes
    const ultimasParadas = await Paradas.find()
      .sort({ _id: -1 })
      .limit(3);

    return res.json({
      sucesso: true,
      ultimasParadas
    });

  } catch (erro) {
    console.error("Erro ao buscar dados das paradas:", erro);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro no servidor ao buscar paradas recentes"
    });
  }
};

module.exports.editarParada = async(req,res)=>{
    try {
        const {id} = req.params;
        const {local, tipo, horaInicio, horaFinal} = req.body;

        const parada = await Paradas.findById(id);
        if(!parada){
            return res.status(404).json({
                sucess:false,
                msg:"Parada não encontrada"
            });
        }

        if(local && local !== parada.local){
            const localExistente = await Paradas.findOne({local});
            if(localExistente){
                return res.status(400).json({
                    sucess:false,
                    msg:'Já existe um local cadastrado com esse nome'
                });
            }
        }

        parada.local = local ?? parada.local;
        parada.tipo = tipo ?? parada.tipo;
        parada.horaInicio = horaInicio ?? parada.horaInicio;
        parada.horaFinal = horaFinal ?? parada.horaFinal;

        const paradaAtualizada = await parada.save();

        return res.status(200).json({
            sucess:true,
            msg:'Parada atualizada com sucesso',
            parada: paradaAtualizada
        });
    } catch (error) {
         console.error("Erro ao atualizar trecho:", error);
        return res.status(500).json({
            success: false,
            msg: "Erro interno ao atualizar trecho",
            error: error.message
        });
    }
}