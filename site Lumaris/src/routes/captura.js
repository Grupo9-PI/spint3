var express = require("express");
var router = express.Router();

var capturaController = require("../controllers/capturaController");

router.get("/listar/:idSensor", capturaController.listarPorSensor);
router.post("/registrar", capturaController.registrar);

module.exports = router;
