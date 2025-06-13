var database = require("../database/config");

function listarGalpoesPorEmpresa(idEmpresa) {
    const instrucaoSql = `
        SELECT * FROM galpao
        WHERE fkEmpresa = ${idEmpresa};
    `;
    return database.executar(instrucaoSql);
}

function cadastrarGalpao(nome, idEmpresa) {
    const instrucaoSql = `
        INSERT INTO galpao (nome, fkEmpresa)
        VALUES ('${nome}', ${idEmpresa});
    `;
    return database.executar(instrucaoSql);
}

function buscarGalpaoPorId(idGalpao) {
    const instrucaoSql = `
        SELECT * FROM galpao
        WHERE idGalpao = ${idGalpao};
    `;
    console.log("Executando SQL:", instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    listarGalpoesPorEmpresa,
    cadastrarGalpao,
    buscarGalpaoPorId
};
