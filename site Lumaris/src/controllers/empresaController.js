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

function atualizarNomeFantasia(req, res) {
    const id = req.params.id;
    const { nomeFantasia } = req.body;

    if (!nomeFantasia || nomeFantasia.trim() === '') {
        return res.status(400).json({ mensagem: "Nome fantasia é obrigatório" });
    }

    empresaModel.alterarNomeFantasia(id, nomeFantasia.trim())
        .then(() => res.json({ mensagem: "Nome fantasia atualizado com sucesso" }))
        .catch(() => res.status(500).json({ mensagem: "Erro ao atualizar nome fantasia" }));
}

function atualizarRazaoSocial(req, res) {
    const id = req.params.id;
    const { razaoSocial } = req.body;

    if (!razaoSocial || razaoSocial.trim() === '') {
        return res.status(400).json({ mensagem: "Razão social é obrigatória" });
    }

    empresaModel.alterarRazaoSocial(id, razaoSocial.trim())
        .then(() => res.json({ mensagem: "Razão social atualizada com sucesso" }))
        .catch(() => res.status(500).json({ mensagem: "Erro ao atualizar razão social" }));
}

function atualizarEmail(req, res) {
    const id = req.params.id;
    const { email } = req.body;

    if (!email || email.trim() === '') {
        return res.status(400).json({ mensagem: "Email é obrigatório" });
    }

    empresaModel.alterarEmail(id, email.trim())
        .then(() => res.json({ mensagem: "Email atualizado com sucesso" }))
        .catch(() => res.status(500).json({ mensagem: "Erro ao atualizar email" }));
}

function atualizarSenha(req, res) {
    const id = req.params.id;
    const { senha } = req.body;

    if (!senha || senha.trim() === '') {
        return res.status(400).json({ mensagem: "Senha é obrigatória" });
    }

    empresaModel.alterarSenha(id, senha.trim())
        .then(() => res.json({ mensagem: "Senha atualizada com sucesso" }))
        .catch(() => res.status(500).json({ mensagem: "Erro ao atualizar senha" }));
}
function obterDadosEmpresa(req, res) {
    const id = req.params.id;

    empresaModel.buscarEmpresaPorId(id)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.json(resultado[0]);
            } else {
                res.status(404).json({ mensagem: "Empresa não encontrada" });
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar dados da empresa:", erro);
            res.status(500).json({ erro: erro.message });
        });
}

module.exports = {
    cadastrarComEndereco,
    autenticar,
    atualizarNomeFantasia,
    atualizarRazaoSocial,
    atualizarEmail,
    atualizarSenha,
    obterDadosEmpresa
};
