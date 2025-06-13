var tanqueModel = require("../models/tanqueModel");

function listarPorGalpao(req, res) {
    const idGalpao = req.params.idGalpao;

    tanqueModel.listarTanquesPorGalpao(idGalpao)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Erro ao listar tanques:", erro);
            res.status(500).json({ erro: erro.message });
        });
}

function cadastrar(req, res) {
    const { nome, qtOstras, fkGalpao } = req.body;

    if (!nome || !qtOstras || !fkGalpao) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    }

    tanqueModel.cadastrarTanque(nome, qtOstras, fkGalpao)
        .then(() => res.status(201).json({ mensagem: "Tanque cadastrado com sucesso" }))
        .catch(erro => {
            console.error("Erro ao cadastrar tanque:", erro);
            res.status(500).json({ erro: erro.message });
        });
}

module.exports = {
    listarPorGalpao,
    cadastrar
};
