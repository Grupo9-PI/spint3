var capturaModel = require("../models/capturaModel");

function listarPorSensor(req, res) {
    const idSensor = req.params.idSensor;

    capturaModel.listarCapturasPorSensor(idSensor)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Erro ao listar capturas:", erro);
            res.status(500).json({ erro: erro.message });
        });
}

function registrar(req, res) {
    const { iluminacao, fkSensor } = req.body;

    if (iluminacao == null || fkSensor == null) {
        return res.status(400).json({ mensagem: "Campos obrigatórios ausentes." });
    }

    capturaModel.registrarCaptura(iluminacao, fkSensor)
        .then(() => res.status(201).json({ mensagem: "Captura registrada com sucesso" }))
        .catch(erro => {
            console.error("Erro ao registrar captura:", erro);
            res.status(500).json({ erro: erro.message });
        });
}

module.exports = {
    listarPorSensor,
    registrar
};
