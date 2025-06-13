var database = require("../database/config");

function cadastrarEmpresa(razaoSocial, nome, cnpj, email, senha) {
    const instrucaoSql = `
        INSERT INTO empresa (razaoSocial, nomeFantasia, cnpj, email, senha)
        VALUES ('${razaoSocial}', '${nome}', '${cnpj}', '${email}', '${senha}');
    `;
    return database.executar(instrucaoSql);
}

function buscarEmpresaPorCnpjEmail(cnpj, email) {
    const instrucaoSql = `
        SELECT idEmpresa FROM empresa WHERE cnpj = '${cnpj}' AND email = '${email}' LIMIT 1;
    `;
    return database.executar(instrucaoSql);
}

function autenticarEmpresa(email, senha) {
    const instrucaoSql = `
        SELECT idEmpresa, razaoSocial, nomeFantasia, email, senha, cnpj FROM empresa 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}
function alterarNomeFantasia(idEmpresa, nomeFantasia) {
    const instrucaoSql = `UPDATE empresa SET nomeFantasia = '${nomeFantasia}' WHERE idEmpresa = ${idEmpresa};`;
    return database.executar(instrucaoSql);
}

function alterarRazaoSocial(idEmpresa, razaoSocial) {
    const instrucaoSql = `UPDATE empresa SET razaoSocial = '${razaoSocial}' WHERE idEmpresa = ${idEmpresa};`;
    return database.executar(instrucaoSql);
}

function alterarEmail(idEmpresa, email) {
    const instrucaoSql = `UPDATE empresa SET email = '${email}' WHERE idEmpresa = ${idEmpresa};`;
    return database.executar(instrucaoSql);
}

function alterarSenha(idEmpresa, senha) {
    const instrucaoSql = `UPDATE empresa SET senha = '${senha}' WHERE idEmpresa = ${idEmpresa};`;
    return database.executar(instrucaoSql);
}

function buscarEmpresaPorId(idEmpresa) {
    const instrucaoSql = `SELECT idEmpresa, razaoSocial, nomeFantasia, cnpj, email FROM empresa WHERE idEmpresa = ${idEmpresa};`;
    return database.executar(instrucaoSql);
}
module.exports = {
    cadastrarEmpresa,
    buscarEmpresaPorCnpjEmail,
    autenticarEmpresa,
    alterarNomeFantasia,
    alterarRazaoSocial,
    alterarEmail,
    alterarSenha,
    buscarEmpresaPorId
};
