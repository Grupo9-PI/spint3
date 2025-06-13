var database = require("../database/config");

function listarSensoresPorTanque(idTanque) {
    const sql = `
        SELECT * FROM sensorLDR
        WHERE fkTanque = ${idTanque};
    `;
    return database.executar(sql);
}

function cadastrarSensor(numSerie, dtInstalacao, statusManutencao, dtManutencao, proximaManutencao, fkTanque) {
    const sql = `
        INSERT INTO sensorLDR (numSerie, dtInstalacao, statusManutencao, dtManutencao, proximaManutencao, fkTanque)
        VALUES ('${numSerie}', '${dtInstalacao}', '${statusManutencao}', '${dtManutencao}', '${proximaManutencao}', ${fkTanque});
    `;
    return database.executar(sql);
}

module.exports = {
    listarSensoresPorTanque,
    cadastrarSensor
};
