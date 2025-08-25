const express = require('express');
const mainRouter = express.Router();
const veiculoController = require('../controllers/veiculoController');
const perfilController = require('../controllers/perfil')

// Perfil
mainRouter.put('/editar/:id', perfilController.editPerfil);

// Veículos
mainRouter.post('/veiculos', veiculoController.createVeiculo);
mainRouter.put('/veiculos/:id', veiculoController.updateVeiculo);

module.exports = mainRouter;