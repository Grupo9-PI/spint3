var database = require("../database/config");

function listarTanquesPorGalpao(idGalpao) {
    const sql = `
        SELECT * FROM tanque
        WHERE fkGalpao = ${idGalpao};
    `;
    return database.executar(sql);
}

function cadastrarTanque(nome, qtOstras, fkGalpao) {
    const sql = `
        INSERT INTO tanque (nome, qtOstras, fkGalpao)
        VALUES ('${nome}', ${qtOstras}, ${fkGalpao});
    `;
    return database.executar(sql);
}

module.exports = {
    listarTanquesPorGalpao,
    cadastrarTanque
};
