var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.post("/cadastrar-com-endereco", function (req, res) {
    empresaController.cadastrarComEndereco(req, res);
});

router.post('/autenticar', function(req, res){
    empresaController.autenticar(req, res);
});

router.put('/nomeFantasia/:id', function(req, res) {
    empresaController.atualizarNomeFantasia(req, res);
});

router.put('/razaoSocial/:id', function(req, res) {
    empresaController.atualizarRazaoSocial(req, res);
});

router.put('/email/:id', function(req, res) {
    empresaController.atualizarEmail(req, res);
});

router.put('/senha/:id', function(req, res) {
    empresaController.atualizarSenha(req, res);
});

router.get("/:id", function (req, res) {
    empresaController.obterDadosEmpresa(req, res);
});

module.exports = router;
