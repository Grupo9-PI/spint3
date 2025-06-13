var sensorModel = require("../models/sensorModel");

function listarPorTanque(req, res) {
    const idTanque = req.params.idTanque;

    sensorModel.listarSensoresPorTanque(idTanque)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Erro ao listar sensores:", erro);
            res.status(500).json({ erro: erro.message });
        });
}

function cadastrar(req, res) {
    const { numSerie, dtInstalacao, statusManutencao, dtManutencao, proximaManutencao, fkTanque } = req.body;

    if (!numSerie || !dtInstalacao || !statusManutencao || !dtManutencao || !proximaManutencao || !fkTanque) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    }

    sensorModel.cadastrarSensor(numSerie, dtInstalacao, statusManutencao, dtManutencao, proximaManutencao, fkTanque)
        .then(() => res.status(201).json({ mensagem: "Sensor cadastrado com sucesso" }))
        .catch(erro => {
            console.error("Erro ao cadastrar sensor:", erro);
            res.status(500).json({ erro: erro.message });
        });
}

module.exports = {
    listarPorTanque,
    cadastrar
};
