const express = require('express')
const { adicionarTrecho, listarTrechos, deletarTrecho, editarTrecho, trechosRecentes } = require('../controllers/trechoControllers')
const router = express.Router()

router.post('/salvar-trecho', adicionarTrecho);
router.get('/listar-trechos', listarTrechos);
router.delete('/deletar-trecho/:id', deletarTrecho);
router.put('/editar-trecho/:id', editarTrecho);
router.get('/trechos-recentes', trechosRecentes);

module.exports = router;