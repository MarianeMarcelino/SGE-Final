const express = require('express');
const NotaControl = require('../control/notaControl');
const router = express.Router();
const notaController = new NotaControl();

router.get('/', (req, res) => notaController.getAll(req, res));
router.get('/disciplinas', (req, res) => notaController.getDisciplinas(req, res));
router.post('/', (req, res) => notaController.create(req, res));
router.put('/:id_nota', (req, res) => notaController.update(req, res));
router.delete('/:id_nota', (req, res) => notaController.delete(req, res));
router.get('/turmas', (req, res) => notaController.getTurmas(req, res));
router.get('/:alunos', (req, res) => notaController.getAlunos(req, res));

module.exports = router;