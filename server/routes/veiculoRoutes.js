const express = require('express');
const router = express.Router();
const veiculoController = require('../controllers/veiculoController');

// Rota para registrar um novo veículo (usamos POST para criar novos recursos)
router.post('/veiculos', veiculoController.createVeiculo);

module.exports = router;