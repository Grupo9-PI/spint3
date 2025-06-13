var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");
const simuladorController = require("../controllers/simuladorController");


router.get("/qtdSensores/:id", function (req, res) {
    dashboardController.qtdSensores(req, res);
});
router.get("/mediaIluminacao/:id", function (req, res) {
    dashboardController.mediaIluminacao(req, res);
});
router.get("/qtdOstras/:id", function (req, res) {
    dashboardController.qtdOstras(req, res);
});
router.get("/ultimaCaptura/:id", function (req, res) {
    dashboardController.ultimaCaptura(req, res);
});

router.post("/simular/:id", function (req, res) {
    simuladorController.simularCapturas(req, res);
});

module.exports = router;