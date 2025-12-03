const express = require('express');
const { adicionarAbastecimento, listarAbastecimentos, deletarAbastecimento } = require('../controllers/abastecimentoController');
const router = express.Router();

router.post('/salvar-abastecimento', adicionarAbastecimento);
router.get('/listar-abastecimentos', listarAbastecimentos);
router.delete('/deletar-abastecimento/:id', deletarAbastecimento);

module.exports = router;