var database = require("../database/config");

function qtdSensores(idEmpresa) {
    const instrucaoSql = `
    SELECT COUNT(*) AS total FROM sensorldr
		JOIN tanque ON fkTanque = idTanque
	    JOIN galpao ON fkGalpao = idGalpao 
        JOIN empresa e ON fkEmpresa = e.idEmpresa
        WHERE e.idEmpresa = ${idEmpresa};
    `;
    return database.executar(instrucaoSql);
}
function mediaIluminacao(idEmpresa) {
    const instrucaoSql = `
    SELECT ROUND(AVG(iluminacao), 2) AS media FROM captura 
        JOIN sensorldr ON idSensor = fkSensor
        JOIN tanque ON idTanque = fkTanque
        JOIN galpao ON fkGalpao = idGalpao
        JOIN empresa ON fkEmpresa = idEmpresa
        WHERE idEmpresa = ${idEmpresa};
    `;
    return database.executar(instrucaoSql);
}
function qtdOstras(idEmpresa) {
    const instrucaoSql = `
    SELECT SUM(t.qtOstras) AS totalOstras
        FROM empresa e
        JOIN galpao g ON e.idEmpresa = g.fkEmpresa
        JOIN tanque t ON g.idGalpao = t.fkGalpao
        WHERE e.idEmpresa = ${idEmpresa};
    `;
    return database.executar(instrucaoSql);
}
function ultimaCaptura(idEmpresa) {
    const instrucaoSql = `
    SELECT c.dtRegistro, c.iluminacao FROM captura c
        JOIN sensorldr s ON c.fkSensor = s.idSensor
        JOIN tanque t ON s.fkTanque = t.idTanque
        JOIN galpao g ON t.fkGalpao = g.idGalpao
        JOIN empresa e ON g.fkEmpresa = e.idEmpresa
        WHERE e.idEmpresa = ${idEmpresa}
        ORDER BY c.dtRegistro DESC
        LIMIT 1;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    qtdSensores,
    qtdOstras,
    mediaIluminacao,
    ultimaCaptura
};
