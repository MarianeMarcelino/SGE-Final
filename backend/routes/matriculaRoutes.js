const express = require('express');
const MatriculaControl = require('../control/matriculaControl');
const router = express.Router();
const matriculaController = new MatriculaControl();

router.get('/', (req, res) => matriculaController.getAll(req, res));
router.post('/filtrar', (req, res) => matriculaController.filtrar(req, res));
router.get('/:cpf', (req, res) => matriculaController.filtrarMatriculaAluno(req, res));
router.post('/', (req, res) => matriculaController.create(req, res));
router.put('/:codigo', (req, res) => matriculaController.update(req, res));
router.delete('/:cpf', (req, res) => matriculaController.deleteMatricula(req, res));

module.exports = router;

