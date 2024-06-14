const express = require('express');
const AgendaControl = require('../control/agendaControl');
const router = express.Router();
const agendaController = new AgendaControl();

router.get('/', (req, res) => agendaController.getAll(req, res));
router.get('/:codigo', (req, res) => agendaController.getByCodigo(req, res));
router.delete('/:codigo', (req, res) => agendaController.deleteAgenda(req, res));
router.post('/', (req, res) => agendaController.create(req, res));
router.put('/:codigo', (req, res) => agendaController.update(req, res));
router.post('/filtrar', (req, res) => agendaController.filtrar(req, res));

module.exports = router;


