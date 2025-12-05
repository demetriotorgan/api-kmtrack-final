const express = require('express');
const { adicionarParada, listarParadas, deletarParada, paradasRecentes, editarParada } = require('../controllers/paradasController');
const router = express.Router();

router.post('/salvar-parada', adicionarParada);
router.get('/listar-parada', listarParadas);
router.delete('/deletar-parada/:id', deletarParada);
router.get('/paradas-recentes', paradasRecentes);
router.put('/editar-parada/:id', editarParada);

module.exports = router;

