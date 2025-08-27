const express = require('express')
const mainRouter = express.Router()
const veiculoController = require('../controllers/veiculoController')
const perfilController = require('../controllers/perfil')
const agendaController = require('../controllers/agenda')

// Perfil
mainRouter.put('/editar/:id', perfilController.editPerfil)

// Veículos
mainRouter.post('/veiculos', veiculoController.createVeiculo)
mainRouter.put('/veiculos/:id', veiculoController.updateVeiculo)

// Agenda
mainRouter.post('/agenda/agendar', agendaController.agendar)

module.exports = mainRouter;