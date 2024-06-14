const express=require('express');
const AgendamentoControl = require('../control/agendamentoControl');
const router = express.Router();
const agendamentoController = new AgendamentoControl

router.get('/', (req, res) => agendamentoController.getAll(req, res));
router.delete('/:codigo', (req, res) => agendamentoController.deleteAgenda(req, res));
router.post('/', (req, res) => agendamentoController.create(req, res));
router.post('/filtrar', (req, res) => agendamentoController.filtrar(req, res));
module.exports=router

