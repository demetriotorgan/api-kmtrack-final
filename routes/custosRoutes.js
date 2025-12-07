const express = require('express');
const { adicioanrCusto, listarCustos, deletarCustos } = require('../controllers/custosController');
const router = express.Router();

router.post('/salvar-custo', adicioanrCusto);
router.get('/listar-custos', listarCustos);
router.delete('/deletar-custo/:id', deletarCustos);

module.exports = router;
