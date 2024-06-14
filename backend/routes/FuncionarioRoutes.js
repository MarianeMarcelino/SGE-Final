const express = require("express");
const FuncionarioControl = require("../control/FuncionarioControl");
const router = express.Router();
const funcionarioController = new FuncionarioControl();

router.get("/", (req, res) => funcionarioController.getFuncionarios(req, res));
router.get("/:matricula", (req, res) => funcionarioController.getByMatricula(req, res));
router.delete("/:matricula", (req, res) => funcionarioController.delete(req, res));
router.post("/", (req, res) => funcionarioController.create(req, res));
router.put("/:matricula", (req, res) => funcionarioController.update(req, res));
router.post("/filtrar", (req, res) => funcionarioController.filtrar(req, res));
module.exports = router;
