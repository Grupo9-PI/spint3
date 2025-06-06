var empresaModel = require("../models/empresaModel");
var enderecoModel = require("../models/enderecoModel");







function cadastrarComEndereco(req, res) {
    var { nomeServer, emailServer, senhaServer, razaoSocialServer, cnpjServer, 
          estadoServer, cidadeServer, bairroServer, ruaServer, numeroServer } = req.body;

    if (!nomeServer || !emailServer || !senhaServer || !razaoSocialServer || !cnpjServer ||
        !estadoServer || !cidadeServer || !bairroServer || !ruaServer || !numeroServer) {
        res.status(400).send("Campos obrigatórios estão faltando.");
        return;
    }

    empresaModel.cadastrarEmpresa(razaoSocialServer, nomeServer, cnpjServer, emailServer, senhaServer)
        .then(() => {
            return empresaModel.buscarEmpresaPorCnpjEmail(cnpjServer, emailServer);
        })
        .then((resultadoBusca) => {
            if (resultadoBusca.length === 0) {
                res.status(404).json({ erro: "Empresa não encontrada após cadastro." });
                return;
            }

            const idEmpresa = resultadoBusca[0].idEmpresa;

            return enderecoModel.cadastrarEndereco(
                ruaServer, numeroServer, bairroServer, cidadeServer, estadoServer, idEmpresa
            );
        })
        .then(() => {
            res.status(201).json({ mensagem: "Empresa e endereço cadastrados com sucesso!" });
        })
        .catch((erro) => {
            console.log("Erro ao cadastrar empresa e endereço:", erro);
            res.status(500).json({ erro: erro.message });
        });
}

function autenticar(req, res) {
    const { emailServer, senhaServer } = req.body;

    empresaModel.autenticarEmpresa(emailServer, senhaServer)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.json(resultado[0]);
            } else {
                res.status(401).send('Email ou senha inválidos');
            }
        })
        .catch((erro) => {
            console.log("Erro ao autenticar:", erro);
            res.status(500).json({ erro: erro.message });
        });
}


module.exports = {
    cadastrarComEndereco,
    autenticar
};
