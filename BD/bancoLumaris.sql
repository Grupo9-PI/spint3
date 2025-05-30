CREATE DATABASE lumaris;
USE lumaris;

CREATE TABLE empresa(
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
	razaoSocial VARCHAR(50) NOT NULL,
	nomeFantasia VARCHAR(50) NOT NULL,
	cnpj CHAR(14) NOT NULL,
	email VARCHAR(100) NOT NULL,
	senha VARCHAR(100) NOT NULL
);

INSERT INTO empresa (razaoSocial, nomeFantasia, cnpj, email, senha) VALUES
('Ostra Dourada Ltda', 'Ostra Dourada', '12345678000190', 'contato.ostradourada@email.com','senha123'),
('Perolas do Pacifico SA','Perolas do Pacifico', '12345678000190', 'vendasperolaspacifico@email.com', 'perolapacifico2025'),
('Mare Branca Cultivo Ltda', 'Mare Branca Cultivo', '23456789000101', 'sacmarebranca@email.com', 'perolapacifico2025');

CREATE TABLE endereco (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    cep CHAR(8),
    rua VARCHAR(50),
    numero VARCHAR(10),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(2),
	fkEmpresa INT,
		CONSTRAINT fkEmpresaEndereco FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa));
        
INSERT INTO endereco (cep, rua, numero, bairro, cidade, estado, fkEmpresa) VALUES
	('15132457','Rua santo antonio', '265', 'Vila Ipiranga', 'São Paulo', 'SP', 1),
	('96825467','Rua patricio', '874', 'Jardim Vitória', 'Belo Horizonte', 'MG', 2),
	('22425165','Alameda Afonso Smthit', '1000', 'Santa cruz', 'São Paulo', 'SP', 3);        


CREATE TABLE usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    fkEmpresa INT, 
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(45),
	fkSupervisor INT,
		CONSTRAINT fkSupervisorUsuario FOREIGN KEY(fkSupervisor) REFERENCES usuario(idUsuario),
        CONSTRAINT fkUsuarioEmpresa FOREIGN KEY(fkEmpresa) REFERENCES empresa(idEmpresa)
    ); 
    
INSERT INTO usuario (idUsuario, fkEmpresa, nome, email, senha, fkSupervisor) VALUES
	(DEFAULT, '1','Gustavo Frieng', 'gustavo.frieng@email.com','PollosHermanos290!', NULL),
    (DEFAULT, '1','Cleber Junior', 'junior.cleb@email.com', 'MousseDeMaracuja1919#', 1),
    (DEFAULT, '1','Sandra Regina', 'sandra.san80@email.com', 'M3j3u31980!',  1),
    (DEFAULT, '2','Ana Souza', 'ana.souza@email.com','ana@123',  NULL),
	(DEFAULT, '2','Bruno Oliveira', 'bruno.oliveira@email.com', 'bruno456',  4),
    (DEFAULT, '3','Diego Martins', 'diego.martins@email.com', 'diego789', NULL),
	(DEFAULT, '3','Felipe Andrade', 'felipe.andrade@email.com', 'felipe2025','6'),
	(DEFAULT, '3','Gabriela Lima', 'gabriela.lima@email.com', 'gabi#654', '6');
    
CREATE TABLE galpao(
	idGalpao INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    fkEmpresa INT,
	CONSTRAINT fkEmpresaGalpao FOREIGN KEY (fkEmpresa)
		REFERENCES empresa(idEmpresa)
);

INSERT INTO galpao (nome, fkEmpresa) VALUES
	('Galpão SP',1),
    ('Galpão RJ',1),
    ('Fazenda Principal',2),
    ('Aquário Nordeste',3);


CREATE TABLE tanque(
	idTanque INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(100),
	qtOstras INT,
    fkGalpao INT,
    CONSTRAINT fkTanqueGalpao FOREIGN KEY (fkGalpao)
		REFERENCES galpao(idGalpao)
);
    
INSERT INTO tanque(nome, qtOstras, fkGalpao) VALUES
	('tanque 1', '250', 1),
	('tanque 2', '300', 1),
	('tanque 1', '280', 2),
	('tanque 3', '400', 1),
	('tanque 4', '590', 1),
	('tanque 1', '610', 3),
	('tanque 5', '402', 1),
	('tanque 2', '200', 2),
	('tanque 2', '500', 3),
	('tanque 3', '300', 3),
	('tanque 6', '280', 1),
	('tanque 7', '500', 1);


CREATE TABLE sensorLDR(
	idSensor INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	numSerie VARCHAR(100) UNIQUE NOT NULL,
	dtInstalacao DATETIME,
	statusManutencao VARCHAR(10) DEFAULT 'Ativo' NOT NULL,
	CONSTRAINT checkManutencao 
		CHECK(statusManutencao IN("Ativo", "Inativo", "Manutencao")),
	dtManutencao DATE NOT NULL,
    proximaManutencao DATE,
	fkTanque INT,
	CONSTRAINT fkTanqueSensor FOREIGN KEY (fkTanque)
		REFERENCES tanque (idTanque)
);

select * from sensorLDR;

INSERT INTO sensorLDR (numSerie, dtInstalacao, statusManutencao, dtManutencao, fkTanque) VALUES
	('9AKREG935G9', '2024-07-15', 'Ativo', '2023-12-10', 1),
	('SEF4290KF29', '2024-01-10', 'Inativo', '2025-02-25', 2),
	('ASDKF94K9F2', '2024-03-10', 'Inativo', '2025-02-28', 3),
	('SAF4290KF29', '2024-01-10', 'Inativo', '2025-05-20', 4),
	('XPT2048QW98', '2024-02-01', 'Manutenção', '2023-12-12', 5),
	('LKJ9321PLO3', '2023-11-05', 'Ativo', '2023-03-20', 6),
	('MNZ8543QAZX', '2024-04-15',  'Inativo','2024-07-01', 7),
	('TRD0192XZJK', '2024-05-10', 'Ativo', '2023-11-17', 8),
	('QWE7584BNMA', '2023-10-25', 'Manutenção', '2023-06-10', 9),
	('GHY3847IKLP', '2024-06-01', 'Inativo', '2024-01-08', 10),
	('YUI5623ZXCV', '2024-08-15', 'Ativo', '2024-04-25', 11),
	('BNM2398VFRD', '2024-06-30', 'Inativo', '2024-08-02', 12);


CREATE TABLE captura(
    idCaptura INT PRIMARY KEY AUTO_INCREMENT NOT NULL ,
	dtRegistro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    iluminacao INT NOT NULL,
    fkSensor INT,
    CONSTRAINT fkSensorCaptura
    FOREIGN KEY (fkSensor) REFERENCES sensorLDR (idSensor));
    
INSERT INTO captura (dtRegistro,iluminacao, fkSensor) VALUES
	(DEFAULT, 450, 1),
	(DEFAULT, 600, 2),
	(DEFAULT, 750, 3),
	(DEFAULT, 500, 4),
	(DEFAULT, 650, 5),
	(DEFAULT, 700, 6),
	(DEFAULT, 800, 7);

-- Exibir Nome Empresa, Supervisor, Funcionário Responsável, Identificação do Cultivo, Quantidade de ostras, Identificação do Sensor, Data do Registro e valor LX.

SELECT u.idUsuario, u.nome AS 'Funcionário Responsável',
	e.nomeFantasia AS 'Nome da Empresa',
	sup.nome AS 'Supervisor',
	g.nome AS 'Nome do Galpão',
	t.qtOstras AS 'Quantidade de Ostras',
	s.idSensor AS 'Identificação do Sensor',
	c.dtRegistro AS 'Data de Registro',
	c.iluminacao AS 'Valor LX' FROM captura c
		JOIN sensorLDR s ON c.fkSensor = s.idSensor
		JOIN tanque t ON s.fkTanque = t.idTanque
        JOIN galpao g ON t.fkGalpao = g.idGalpao
		JOIN empresa e ON g.fkEmpresa = e.idEmpresa
		JOIN usuario u ON e.idEmpresa = u.fkEmpresa
		LEFT JOIN usuario sup ON sup.idUsuario = u.fkSupervisor;
        
-- SELECTS
-- funcionarios e supervisores de uma empresa
SELECT u.nome AS 'Funcionario', u.email, s.nome AS 'Supervisor', s.email FROM usuario u
	JOIN usuario s ON  s.idUsuario = u.fkSupervisor
	JOIN empresa e ON u.fkEmpresa = e.idEmpresa
		WHERE e.idEmpresa = 3;
        
-- quantidade de sensores da empresa x no galpão y
SELECT COUNT(idTanque) AS 'Quantidade de galpões' FROM tanque t
	JOIN galpao g ON t.fkGalpao = g.idGalpao
    JOIN empresa e ON g.fkEmpresa = e.idEmpresa
    WHERE g.idGalpao = 1 AND e.idEmpresa = 1;
    

/*
	luminosidade ao longo do dia
    anormalidades de luminosidade
*/