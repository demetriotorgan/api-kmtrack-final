const Trecho = require('../models/Trecho')
const mongoose = require('mongoose')

module.exports.adicionarTrecho = async(req,res)=>{
    try {
        const {nomeTrecho, distancia, inicio, fim, data} = req.body;
        
        const trechoExistente = await Trecho.findOne({nomeTrecho});
        if(trechoExistente){
            return res.status(400).json({
                sucess:false,
                msg: "Trecho já cadastrado"
            });
        }
        const novoTrecho = new Trecho({
            nomeTrecho, 
            distancia, 
            inicio, 
            fim: fim ?? null,
            data});

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

module.exports.editarTrecho = async (req, res) => {
    try {
        const { id } = req.params;
        const { nomeTrecho, distancia, inicio, fim, data } = req.body;

        // Verifica se o registro existe
        const trecho = await Trecho.findById(id);
        if (!trecho) {
            return res.status(404).json({
                success: false,
                msg: "Trecho não encontrado"
            });
        }

        // Verifica duplicidade de nome (caso nomeTrecho seja alterado)
        if (nomeTrecho && nomeTrecho !== trecho.nomeTrecho) {
            const nomeExistente = await Trecho.findOne({ nomeTrecho });
            if (nomeExistente) {
                return res.status(400).json({
                    success: false,
                    msg: "Já existe um trecho cadastrado com esse nome"
                });
            }
        }

        // Atualiza campos (mantém o que não for enviado)
        trecho.nomeTrecho = nomeTrecho ?? trecho.nomeTrecho;
        trecho.distancia = distancia ?? trecho.distancia;
        trecho.inicio = inicio ?? trecho.inicio;
        trecho.fim = fim ?? null; // Se não vier, assume null
        trecho.data = data ?? trecho.data;

        const trechoAtualizado = await trecho.save();

        return res.status(200).json({
            success: true,
            msg: "Trecho atualizado com sucesso",
            trecho: trechoAtualizado
        });

    } catch (error) {
        console.error("Erro ao atualizar trecho:", error);
        return res.status(500).json({
            success: false,
            msg: "Erro interno ao atualizar trecho",
            error: error.message
        });
    }
};
