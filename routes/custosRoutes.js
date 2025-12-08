const express = require('express');
const { adicioanrCusto, listarCustos, deletarCustos, custosRecentes } = require('../controllers/custosController');
const router = express.Router();

router.post('/salvar-custo', adicioanrCusto);
router.get('/listar-custos', listarCustos);
router.delete('/deletar-custo/:id', deletarCustos);
router.get('/custos-recentes', custosRecentes);

module.exports = router;
