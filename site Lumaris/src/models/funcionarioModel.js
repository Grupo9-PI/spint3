var database = require("../database/config");

function buscarFuncionarios(idEmpresa) {
    const instrucaoSql = `
        SELECT 
            u.idUsuario AS id,
            u.nome, 
            u.email,
            CASE 
                WHEN EXISTS (
                    SELECT 1 
                    FROM usuario u2 
                    WHERE u2.fkSupervisor = u.idUsuario
                ) THEN 'Supervisor'
                ELSE 'Funcionário'
            END AS tipo,
            s.nome AS supervisor
        FROM usuario u
        LEFT JOIN usuario s ON u.fkSupervisor = s.idUsuario
        JOIN empresa e ON u.fkEmpresa = e.idEmpresa
        WHERE e.idEmpresa = ${idEmpresa};
        `;
    return database.executar(instrucaoSql);
}

function inserirFuncionario(nome, email, senha, fkEmpresa, fkSupervisor) {
    const fkSup = fkSupervisor ? fkSupervisor : null;
    const instrucaoSql = `
            INSERT INTO usuario (nome, email, senha, fkEmpresa, fkSupervisor) 
            VALUES ('${nome}', '${email}', '${senha}', ${fkEmpresa}, ${fkSup});
        `;
    return database.executar(instrucaoSql);
}


function atualizarSupervisor(idFuncionario, fkSupervisor) {
    const fkSup = fkSupervisor ? fkSupervisor : null;
    const instrucaoSql = `
            UPDATE usuario SET fkSupervisor = ${fkSup}
            WHERE idUsuario = ${idFuncionario};
        `;
    return database.executar(instrucaoSql);
}

function deletarFuncionario(idFuncionario) {
  const sqlRemoverSupervisao = `
    UPDATE usuario
    SET fkSupervisor = NULL
    WHERE fkSupervisor = ${idFuncionario};
  `;

  const sqlDeletarFuncionario = `
    DELETE FROM usuario WHERE idUsuario = ${idFuncionario};
  `;

  return database.executar(sqlRemoverSupervisao)
    .then(() => {
      return database.executar(sqlDeletarFuncionario);
    });
}

function buscarFuncionarioPorId(idFuncionario) {
    const instrucaoSql = `
        SELECT * FROM usuario WHERE idUsuario = ${idFuncionario};
    `;
    return database.executar(instrucaoSql).then(result => result[0]);
}

function atualizarNomeESenha(idFuncionario, nome, senha) {
    let campos = [];

    if (nome && nome !== "") {
        campos.push(`nome = '${nome}'`);
    }

    if (senha && senha !== "") {
        campos.push(`senha = '${senha}'`);
    }

    let instrucaoSql = `UPDATE usuario SET ${campos.join(", ")} WHERE idUsuario = ${idFuncionario};`;

    return database.executar(instrucaoSql);
}

function autenticarFuncionario(email, senha) {
    const instrucao = `
        SELECT idUsuario, nome, email, fkEmpresa 
        FROM usuario 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucao);
}

module.exports = {
    buscarFuncionarios,
    inserirFuncionario,
    atualizarSupervisor,
    deletarFuncionario,
    buscarFuncionarioPorId,
    atualizarNomeESenha,
    autenticarFuncionario
};
