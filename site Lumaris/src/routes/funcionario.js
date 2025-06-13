var express = require("express");
var router = express.Router();
var funcionarioController = require("../controllers/funcionarioController");

router.get("/:idEmpresa", function (req, res) {
    funcionarioController.buscarFuncionarios(req, res);
});

router.post("/", function (req, res) {
    funcionarioController.adicionarFuncionario(req, res);
});

router.put("/:id", function (req, res) {
    funcionarioController.editarFuncionario(req, res);
});

router.put("/:id/supervisor", function (req, res) {
    funcionarioController.atribuirSupervisor(req, res);
});

router.delete("/:id", function (req, res) {
    funcionarioController.deletarFuncionario(req, res);
});
router.post("/autenticar", function (req, res) {
    funcionarioController.autenticar(req, res);
});

module.exports = router;
