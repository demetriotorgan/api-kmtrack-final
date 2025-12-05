const express = require('express');
const { adicionarAbastecimento, listarAbastecimentos, deletarAbastecimento, abastecimentosRecentes } = require('../controllers/abastecimentoController');
const router = express.Router();

router.post('/salvar-abastecimento', adicionarAbastecimento);
router.get('/listar-abastecimentos', listarAbastecimentos);
router.delete('/deletar-abastecimento/:id', deletarAbastecimento);
router.get('/abastecimentos-recentes', abastecimentosRecentes);

module.exports = router;