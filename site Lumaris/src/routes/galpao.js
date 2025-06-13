var express = require("express");
var router = express.Router();

var galpaoController = require("../controllers/galpaoController");

router.get("/listar/:idEmpresa", galpaoController.listarPorEmpresa);
router.post("/cadastrar", galpaoController.cadastrar);
router.get('/galpao/:idGalpao', galpaoController.buscarPorId);

module.exports = router;
