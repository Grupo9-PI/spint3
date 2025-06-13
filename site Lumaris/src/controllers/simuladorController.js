const database = require("../database/config");

function simularCapturas(req, res) {
    const idEmpresa = req.params.id;

    const instrucaoSensores = `
        SELECT idSensor FROM sensorldr
        JOIN tanque ON fkTanque = idTanque
        JOIN galpao ON fkGalpao = idGalpao
        WHERE fkEmpresa = ${idEmpresa};
    `;

    database.executar(instrucaoSensores).then(sensores => {
        if (sensores.length === 0) {
            return res.status(404).json({ mensagem: "Nenhum sensor encontrado para esta empresa." });
        }

        const valores = [];

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < sensores.length; j++) {
                const sensor = sensores[j];
                const valor = Math.floor(Math.random() * (1200 - 500 + 1)) + 500;
                valores.push(`(${valor}, ${sensor.idSensor})`);
            }
        }


        const instrucaoInsert = `
            INSERT INTO captura (iluminacao, fkSensor)
            VALUES ${valores.join(", ")};
        `;

        database.executar(instrucaoInsert)
            .then(() => res.status(200).json({ mensagem: "Capturas simuladas inseridas com sucesso." }))
            .catch(erro => res.status(500).json({ erro: erro.message }));
    }).catch(erro => res.status(500).json({ erro: erro.message }));
}

module.exports = {
    simularCapturas
};
