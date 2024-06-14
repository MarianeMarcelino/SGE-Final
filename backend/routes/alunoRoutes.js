const express = require('express');
const AlunoControl = require('../control/alunoControl');
const router = express.Router();
const alunoController = new AlunoControl();

router.get('/', (req, res) => alunoController.getAll(req, res));
router.get('/:cpf', (req, res) => alunoController.getByCPF(req, res));
router.delete('/:cpf', (req, res) => alunoController.deleteAluno(req, res));
router.post('/', (req, res) => alunoController.create(req, res));
router.put('/:cpf', (req, res) => alunoController.update(req, res));
router.post('/filtrar', (req, res) => alunoController.filtrar(req, res));

module.exports = router;
