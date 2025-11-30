const express = require('express')
const { adicionarPedagio, listarPedagios, deletarPedagio } = require('../controllers/pedagioController')
const router = express.Router()

router.post('/salvar-pedagio', adicionarPedagio);
router.get('/listar-pedagio', listarPedagios);
router.delete('/deletar-pedagio/:id', deletarPedagio);

module.exports = router;