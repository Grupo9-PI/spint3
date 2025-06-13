var express = require("express");
var router = express.Router();

var sensorController = require("../controllers/sensorController");

router.get("/listar/:idTanque", sensorController.listarPorTanque);
router.post("/cadastrar", sensorController.cadastrar);

module.exports = router;
