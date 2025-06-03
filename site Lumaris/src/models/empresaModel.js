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
    const instrucao = `
        SELECT idEmpresa, razaoSocial, nomeFantasia, email, senha, cnpj FROM empresa 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucao);
}

module.exports = {
    cadastrarEmpresa,
    buscarEmpresaPorCnpjEmail,
    autenticarEmpresa
};
