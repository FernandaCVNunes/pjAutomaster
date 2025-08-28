const express = require('express');
const ctrl = require('../controllers/agendaController'); // Caminho e nome do arquivo corrigidos
const router = express.Router();

router.get('/events', ctrl.getEvents);
router.post('/events', ctrl.createEvent);
router.put('/events/:id', ctrl.updateEvent);
router.delete('/events/:id', ctrl.deleteEvent);

module.exports = router;