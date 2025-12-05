const Abastecimento = require('../models/Abastecimento');
const mongoose = require('mongoose');

module.exports.adicionarAbastecimento = async(req,res)=>{
try {
    const {local, valor, litros, odometro, valorLitro, data} = req.body;
    const abastecimentoExistente = await Abastecimento.findOne({local});
    if(abastecimentoExistente){
        return res.status(400).json({
            sucess:false,
            msg:'Abastecimento já cadastrados'
        })
    };

    const novoAbastecimento = new Abastecimento({
        local, 
        valor, 
        litros, 
        odomotro: odometro ?? null,
        valorLitro,
        data
    });

    await novoAbastecimento.save();
    return res.status(201).json({
        sucess:true,
        msg:'Abastecimento cadastrado com sucesso',
        abastecimento: novoAbastecimento
    });
} catch (error) {
    console.log('Erro ao cadastrar abastecimento: ', error);
    return res.status(500).json({
        sucess:false,
        msg:'Erro interno ao salvar abastecimento',
        error: error.message
    })
    }
};

module.exports.listarAbastecimentos = async(req,res)=>{
 try {
    const abastecimentos = await Abastecimento.find()
    .sort({_id:-1})
    .exec();
    res.status(200).json(abastecimentos);    
 } catch (error) {
    res.status(500).json({
        msg:'Erro ao listar paradas'
    })
 }   
};

module.exports.deletarAbastecimento = async(req,res)=>{
try {
    const {id} = req.params;
    if(!id){
        return res.status(400).json({message:'Id do abastecimento não fornecido'});        
    }
    const abastecimentoRemovido = await Abastecimento.findByIdAndDelete(id);
    
    if(!abastecimentoRemovido){
        return res.status(400).json({message:'Abastecimento não encontrado'})
    }
    
    res.status(200).json({
        message:'Abastecimento excluido com sucesso',
        abastecimento: abastecimentoRemovido
    });
} catch (error) {
    console.error('Erro ao excluir parada', error);
    res.status(500).json({
        message:'Erro ao excluir abastecimento',
        error:error.message
    })
}
};

module.exports.abastecimentosRecentes = async (req, res) => {
  try {
    // Buscar os 3 últimos registros pela ordem de criação (_id)
    const ultimosAbastecimentos = await Abastecimento.find()
      .sort({ _id: -1 })
      .limit(3);

    // Somar o valor total de todos os abastecimentos cadastrados
    const resultadoTotal = await Abastecimento.aggregate([
      { $group: { _id: null, totalValor: { $sum: "$valor" } } }
    ]);

    const totalValor = resultadoTotal.length > 0
      ? resultadoTotal[0].totalValor
      : 0;

    return res.json({
      sucesso: true,
      ultimosAbastecimentos,
      totalValor
    });

  } catch (erro) {
    console.error("Erro ao buscar dados dos abastecimentos:", erro);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro no servidor ao buscar abastecimentos recentes"
    });
  }
};
