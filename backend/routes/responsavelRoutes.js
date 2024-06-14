const express = require('express');
const ResponsavelControl = require('../control/responsavelControl');
const router = express.Router();
const responsavelController = new ResponsavelControl();

router.get('/', (req, res) => responsavelController.getAll(req, res));
router.get('/:cpf', (req, res) => responsavelController.getById(req, res));
router.delete('/:cpf', (req, res) => responsavelController.delete(req, res));
router.post('/', (req, res) => responsavelController.create(req, res));
router.put('/:cpf', (req, res) => responsavelController.update(req, res));
router.post('/filtrar', (req, res) => responsavelController.filtrar(req, res))

module.exports=router;