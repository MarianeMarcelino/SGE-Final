const express=require('express');
const DisciplinaControl = require('../control/disciplinaControl');
const router = express.Router();
const disciplinaController = new DisciplinaControl

router.get('/', (req, res) => disciplinaController.getAll(req, res))
router.get('/:codigo', (req, res) => disciplinaController.getByCodigo(req, res))
router.delete('/:codigo', (req, res) => disciplinaController.deleteDisciplina(req, res))
router.post('/', (req, res) => disciplinaController.create(req, res))
router.put('/:codigo', (req, res) => disciplinaController.update(req, res))
router.post('/filtrar', (req, res) => disciplinaController.filtrar(req, res))
module.exports=router


