var enderecoModel = require("../models/enderecoModel");

function cadastrar(req, res) {
    var estado = req.body.estadoServer;
    var cidade = req.body.cidadeServer;
    var bairro = req.body.bairroServer;
    var rua = req.body.ruaServer;
    var numero = req.body.numeroServer;

    if (estado == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        enderecoModel.cadastrarEndereco(estado, cidade, bairro, rua, numero, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrar,
}