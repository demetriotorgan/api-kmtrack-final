const express = require('express');
const { adicionarDiario, listarDiario, deletarDiario } = require('../controllers/diarioController');
const router = express.Router();

router.post('/salvar-diario', adicionarDiario);
router.get('/listar-diario', listarDiario);
router.delete('/deletar-diario/:id', deletarDiario);

module.exports = router;

