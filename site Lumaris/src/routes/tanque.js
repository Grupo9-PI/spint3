var express = require("express");
var router = express.Router();

var tanqueController = require("../controllers/tanqueController");

router.get("/listar/:idGalpao", tanqueController.listarPorGalpao);
router.post("/cadastrar", tanqueController.cadastrar);

module.exports = router;
