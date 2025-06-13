var galpaoModel = require("../models/galpaoModel");

function listarPorEmpresa(req, res) {
    const idEmpresa = req.params.idEmpresa;

    galpaoModel.listarGalpoesPorEmpresa(idEmpresa)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Erro ao listar galpões:", erro);
            res.status(500).json({ erro: erro.message });
        });
}

function cadastrar(req, res) {
    const { nome, fkEmpresa } = req.body;

    if (!nome || !fkEmpresa) {
        return res.status(400).json({ mensagem: "Nome e fkEmpresa são obrigatórios" });
    }

    galpaoModel.cadastrarGalpao(nome, fkEmpresa)
        .then(() => res.status(201).json({ mensagem: "Galpão cadastrado com sucesso" }))
        .catch(erro => {
            console.error("Erro ao cadastrar galpão:", erro);
            res.status(500).json({ erro: erro.message });
        });
}

function buscarPorId(req, res) {
    const id = req.params.id;
    console.log("ID recebido no backend:", id);

    galpaoModel.buscarGalpaoPorId(id)
        .then(resultado => {
            console.log("Resultado do banco:", resultado);
            if (resultado.length === 0) {
                return res.status(404).json({ mensagem: "Galpão não encontrado" });
            }
            res.json(resultado[0]);
        })
        .catch(erro => {
            console.error("Erro ao buscar galpão:", erro);
            res.status(500).json({ erro: erro.message });
        });
}



module.exports = {
    listarPorEmpresa,
    cadastrar,
    buscarPorId
};
