const express = require('express')
const mainRouter = express.Router()
const veiculoController = require('../controllers/veiculo')
const perfilController = require('../controllers/perfil')
const agendaController = require('../controllers/agenda')
const authController = require('../controllers/auth')

//Auth
mainRouter.post('/auth/registro', authController.registro);
mainRouter.post('/auth/login', authController.login);

// Perfil
mainRouter.get('/user/:id', perfilController.getUsuario)
mainRouter.put('/editar/:id', perfilController.editPerfil)

// Veículos
mainRouter.post('/veiculos', veiculoController.createVeiculo)
mainRouter.put('/veiculos/:id', veiculoController.updateVeiculo)
mainRouter.get('/veiculos/cliente/:cliente_id', veiculoController.getVeiculosByCliente);

// Agenda
mainRouter.post('/agenda/agendar', agendaController.agendar)

module.exports = mainRouter;