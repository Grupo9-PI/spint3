const dashboardModel = require("../models/dashboardModel");

function qtdSensores(req, res) {
    const idEmpresa = req.params.id;

    dashboardModel.qtdSensores(idEmpresa)
        .then(resultado => res.status(200).json(resultado[0]))
        .catch(erro => res.status(500).json({ erro: erro.message }));
}
function mediaIluminacao(req, res) {
    const idEmpresa = req.params.id;

    dashboardModel.mediaIluminacao(idEmpresa)
        .then(resultado => res.status(200).json(resultado[0]))
        .catch(erro => res.status(500).json({ erro: erro.message }));
}
function qtdOstras(req, res) {
    const idEmpresa = req.params.id;

    dashboardModel.qtdOstras(idEmpresa)
        .then(resultado => res.status(200).json(resultado[0]))
        .catch(erro => res.status(500).json({ erro: erro.message }));
}
function ultimaCaptura(req, res) {
    const idEmpresa = req.params.id;

    dashboardModel.ultimaCaptura(idEmpresa)
        .then(resultado => {
            if (resultado.length === 0) {
                res.status(404).json({ mensagem: 'Nenhuma captura encontrada.' });
            } else {
                res.status(200).json(resultado[0]);
            }
        })
        .catch(erro => res.status(500).json({ erro: erro.message }));
}



module.exports = {
    qtdSensores,
    qtdOstras,
    mediaIluminacao,
    ultimaCaptura
};
