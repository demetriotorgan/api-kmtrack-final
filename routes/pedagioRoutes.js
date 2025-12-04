const express = require('express')
const { adicionarPedagio, listarPedagios, deletarPedagio, pedagiosRecentes } = require('../controllers/pedagioController')
const router = express.Router()

router.post('/salvar-pedagio', adicionarPedagio);
router.get('/listar-pedagio', listarPedagios);
router.delete('/deletar-pedagio/:id', deletarPedagio);
router.get('/pedagios-recentes', pedagiosRecentes);

module.exports = router;