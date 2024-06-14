const express=require('express');
const ProfessorControl = require('../control/professorControl');
const router = express.Router();
const professorController = new ProfessorControl

router.get('/', (req, res) => professorController.getAll(req, res))
router.get('/:codigo', (req, res) => professorController.getByCodigo(req, res))
router.delete('/:codigo', (req, res) => professorController.deleteProfessor(req, res))
router.post('/', (req, res) => professorController.create(req, res))
router.put('/:codigo', (req, res) => professorController.update(req, res))
router.post('/filtrar', (req, res) => professorController.filtrar(req, res))
module.exports=router;
