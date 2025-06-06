var database = require("../database/config");

function cadastrarEndereco(rua, numero, bairro, cidade, estado, fkEmpresa) {
    const instrucaoSql = `
        INSERT INTO endereco (rua, numero, bairro, cidade, estado, fkEmpresa)
        VALUES ('${rua}', '${numero}', '${bairro}', '${cidade}', '${estado}', ${fkEmpresa});
    `;
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrarEndereco
};
