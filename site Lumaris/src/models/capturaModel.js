var database = require("../database/config");

function listarCapturasPorSensor(idSensor) {
    const sql = `
        SELECT * FROM captura
        WHERE fkSensor = ${idSensor}
        ORDER BY dtRegistro DESC;
    `;
    return database.executar(sql);
}

function registrarCaptura(iluminacao, fkSensor) {
    const sql = `
        INSERT INTO captura (iluminacao, fkSensor)
        VALUES (${iluminacao}, ${fkSensor});
    `;
    return database.executar(sql);
}

module.exports = {
    listarCapturasPorSensor,
    registrarCaptura
};
