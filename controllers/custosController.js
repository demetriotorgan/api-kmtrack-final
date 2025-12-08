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

module.exports.custosRecentes = async (req, res) => {
  try {

    // Buscar os 3 últimos custos registrados
    const ultimosCustos = await Custos.find()
      .sort({ _id: -1 })
      .limit(3);

    // Calcular o total de todos os valores somados
    const resultadoTotal = await Custos.aggregate([
      {
        $group: {
          _id: null,
          totalValor: { $sum: "$valor" }
        }
      }
    ]);

    const totalValor = resultadoTotal.length > 0
      ? resultadoTotal[0].totalValor
      : 0;

    return res.json({
      sucesso: true,
      ultimosCustos,
      totalValor
    });

  } catch (erro) {
    console.error("Erro ao buscar dados dos custos:", erro);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro no servidor ao buscar custos recentes"
    });
  }
};