const express = require('express');
const TurmaControl = require('../control/turmaControl');
const router = express.Router();
const turmaController = new TurmaControl();

router.get('/', (req, res) => turmaController.getAll(req, res));
router.get('/:codigo', (req, res) => turmaController.getByCodigo(req, res));
router.delete('/:codigo', (req, res) => turmaController.deleteTurma(req, res));
router.post('/', (req, res) => turmaController.create(req, res));
router.put('/:codigo', (req, res) => turmaController.update(req, res));
router.post('/filtrar', (req, res) => turmaController.filtrar(req, res));

module.exports = router;
