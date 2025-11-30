const express = require('express')
const { adicionarTrecho, listarTrechos, deletarTrecho, editarTrecho } = require('../controllers/trechoControllers')
const router = express.Router()

router.post('/salvar-trecho', adicionarTrecho);
router.get('/listar-trechos', listarTrechos);
router.delete('/deletar-trecho/:id', deletarTrecho);
router.put('/editar-trecho/:id', editarTrecho);

module.exports = router;