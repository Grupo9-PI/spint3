var funcionarioModel = require("../models/funcionarioModel");

function buscarFuncionarios(req, res) {
    const idEmpresa = req.params.idEmpresa;

    funcionarioModel.buscarFuncionarios(idEmpresa)
        .then(resultado => {
            if (resultado.length === 0) {
                res.json({ mensagem: "Ainda nenhum funcionário adicionado" });
            } else {
                res.json(resultado);
            }
        })
        .catch(erro => {
            res.status(500).json({ erro: erro.message });
        });
}

function adicionarFuncionario(req, res) {
    const { nome, email, senha,fkEmpresa, fkSupervisor } = req.body;

    if (!nome || !email || !senha || !fkEmpresa) {
        return res.status(400).json({ mensagem: "Nome, email, senha e id da empresa são obrigatórios." });
    }

    funcionarioModel.inserirFuncionario(nome, email, senha, fkEmpresa, fkSupervisor)
        .then(() => {
            res.status(201).json({ mensagem: "Funcionário inserido com sucesso!" });
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ mensagem: "Erro ao inserir funcionário." });
        });
}

function editarFuncionario(req, res) {
  const idFuncionario = Number(req.params.id);
  const { nome, email, senha } = req.body;

  const cabecalhoUsuario = req.headers['usuario-logado'];

  if (!cabecalhoUsuario) {
    return res.status(400).json({ mensagem: "Cabeçalho 'usuario-logado' ausente." });
  }

  let usuarioLogado = {};
  if (cabecalhoUsuario.startsWith('{') && cabecalhoUsuario.endsWith('}')) {
    usuarioLogado = JSON.parse(cabecalhoUsuario);
  } else {
    return res.status(400).json({ mensagem: "Cabeçalho 'usuario-logado' inválido." });
  }

  if (usuarioLogado.TIPO_USUARIO === 'funcionario') {
  if (usuarioLogado.id !== idFuncionario) {
    return res.status(403).json({ mensagem: "Sem permissão para editar outro usuário." });
  }
  if (email) {
    return res.status(400).json({ mensagem: "Funcionário não pode alterar o email." });
  }

  if (!nome && !senha) {
    return res.status(400).json({ mensagem: "Nada para atualizar." });
  }

  return funcionarioModel.atualizarNomeESenha(idFuncionario, nome, senha)
    .then(() => res.json({ mensagem: "Perfil atualizado com sucesso." }))
    .catch(erro => {
      console.error(erro);
      res.status(500).json({ mensagem: "Erro ao atualizar perfil." });
    });
}
 else if (usuarioLogado.TIPO_USUARIO === 'empresa') {
    return funcionarioModel.buscarFuncionarioPorId(idFuncionario)
      .then(funcionario => {
        if (!funcionario) {
          return res.status(404).json({ mensagem: "Funcionário não encontrado." });
        }
        if (funcionario.fkEmpresa !== usuarioLogado.fkEmpresa) {
          return res.status(403).json({ mensagem: "Funcionário não pertence à sua empresa." });
        }
        if (senha) {
          return res.status(400).json({ mensagem: "Empresa não pode alterar senha do funcionário." });
        }
        return funcionarioModel.atualizarFuncionario(idFuncionario, nome, email)
          .then(() => res.json({ mensagem: "Funcionário atualizado com sucesso." }))
          .catch(erro => {
            console.error(erro);
            res.status(500).json({ mensagem: "Erro ao atualizar funcionário." });
          });
      })
      .catch(erro => {
        console.error(erro);
        res.status(500).json({ mensagem: "Erro ao buscar funcionário." });
      });
  }

  return res.status(403).json({ mensagem: "Tipo de usuário inválido." });
}


function atribuirSupervisor(req, res) {
    const idFuncionario = Number(req.params.id);
    const { fkSupervisor } = req.body;

    const usuarioHeader = req.headers['usuario-logado'];

    if (!usuarioHeader) {
        return res.status(401).json({ mensagem: "Usuário não autenticado." });
    }

    const usuarioLogado = JSON.parse(usuarioHeader);

    if (usuarioLogado.TIPO_USUARIO !== 'empresa') {
        return res.status(403).json({ mensagem: "Apenas empresa pode atribuir supervisor." });
    }

    funcionarioModel.buscarFuncionarioPorId(idFuncionario)
        .then(funcionario => {
            if (!funcionario) {
                return res.status(404).json({ mensagem: "Funcionário não encontrado." });
            }

            if (funcionario.fkEmpresa !== Number(usuarioLogado.ID_EMPRESA)) {
                return res.status(403).json({ mensagem: "Funcionário não pertence à sua empresa." });
            }

            return funcionarioModel.atualizarSupervisor(idFuncionario, fkSupervisor);
        })
        .then(() => {
            res.json({ mensagem: "Supervisor atribuído com sucesso!" });
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ mensagem: "Erro ao atribuir supervisor." });
        });
}


function deletarFuncionario(req, res) {
  const idFuncionario = Number(req.params.id);
  const tipoUsuario = req.query.tipoUsuario; // Exemplo: 'empresa'
  const idEmpresaLogada = Number(req.query.idEmpresa);

  if (!tipoUsuario || !idEmpresaLogada) {
    return res.status(401).json({ mensagem: "Usuário não autenticado." });
  }

  if (tipoUsuario !== 'empresa') {
    return res.status(403).json({ mensagem: "Apenas empresa pode deletar funcionário." });
  }

  funcionarioModel.buscarFuncionarioPorId(idFuncionario)
    .then(funcionario => {
      if (!funcionario) return res.status(404).json({ mensagem: "Funcionário não encontrado." });
      if (funcionario.fkEmpresa !== idEmpresaLogada) {
        return res.status(403).json({ mensagem: "Funcionário não pertence à sua empresa." });
      }
      return funcionarioModel.deletarFuncionario(idFuncionario);
    })
    .then(() => res.json({ mensagem: "Funcionário deletado com sucesso!" }))
    .catch(erro => {
      console.error(erro);
      if (!res.headersSent) {
        res.status(500).json({ mensagem: "Erro ao deletar funcionário." });
      }
    });
}



function autenticar(req, res) {
    const { emailServer, senhaServer } = req.body;

    funcionarioModel.autenticarFuncionario(emailServer, senhaServer)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado[0]);
            } else {
                res.status(401).send("Email ou senha inválidos");
            }
        })
        .catch(erro => {
            console.log("Erro ao autenticar funcionário:", erro);
            res.status(500).json({ erro: erro.message });
        });
}


module.exports = {
    buscarFuncionarios,
    adicionarFuncionario,
    editarFuncionario,
    atribuirSupervisor,
    deletarFuncionario,
    autenticar
};
