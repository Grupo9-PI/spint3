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
    rua VARCHAR(50) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
	fkEmpresa INT,
		CONSTRAINT fkEmpresaEndereco FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);
        
INSERT INTO endereco (rua, numero, bairro, cidade, estado, fkEmpresa) VALUES
	('Rua santo antonio', '265', 'Vila Ipiranga', 'São Paulo', 'SP', 1),
	('Rua patricio', '874', 'Jardim Vitória', 'Belo Horizonte', 'MG', 2),
	('Alameda Afonso Smthit', '1000', 'Santa cruz', 'São Paulo', 'SP', 3);        


CREATE TABLE usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    fkEmpresa INT, 
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(100),
	fkSupervisor INT,
		CONSTRAINT fkSupervisorUsuario FOREIGN KEY(fkSupervisor) REFERENCES usuario(idUsuario),
        CONSTRAINT fkUsuarioEmpresa FOREIGN KEY(fkEmpresa) REFERENCES empresa(idEmpresa)
); 
    
INSERT INTO usuario (fkEmpresa, nome, email, senha, fkSupervisor) VALUES
	(1,'Gustavo Frieng', 'gustavo.frieng@email.com','PollosHermanos290!', NULL),
    (1,'Cleber Junior', 'junior.cleb@email.com', 'MousseDeMaracuja1919#', 1),
    (1,'Sandra Regina', 'sandra.san80@email.com', 'M3j3u31980!',  1),
    (2,'Ana Souza', 'ana.souza@email.com','ana@123',  NULL),
	(2,'Bruno Oliveira', 'bruno.oliveira@email.com', 'bruno456',  4),
    (3,'Diego Martins', 'diego.martins@email.com', 'diego789', NULL),
	(3,'Felipe Andrade', 'felipe.andrade@email.com', 'felipe2025',6),
	(3,'Gabriela Lima', 'gabriela.lima@email.com', 'gabi#654', 6);
    
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
	('tanque 1', 250, 1),
	('tanque 2', 300, 1),
	('tanque 1', 280, 2),
	('tanque 3', 400, 1),
	('tanque 4', 590, 1),
	('tanque 1', 610, 3),
	('tanque 5', 402, 1),
	('tanque 2', 200, 2),
	('tanque 2', 500, 3),
	('tanque 3', 300, 3),
	('tanque 6', 280, 1),
	('tanque 7', 500, 1);


CREATE TABLE sensorLDR(
	idSensor INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	numSerie VARCHAR(100) UNIQUE NOT NULL,
	dtInstalacao DATETIME,
	statusManutencao VARCHAR(10) DEFAULT 'Ativo' NOT NULL,
	CONSTRAINT checkManutencao 
		CHECK(statusManutencao IN("Ativo", "Inativo", "Manutencao")),
	dtManutencao DATE,
    proximaManutencao DATE,
	fkTanque INT,
	CONSTRAINT fkTanqueSensor FOREIGN KEY (fkTanque)
		REFERENCES tanque (idTanque)
);

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
    FOREIGN KEY (fkSensor) REFERENCES sensorLDR (idSensor)
);
    
INSERT INTO captura (dtRegistro,iluminacao, fkSensor) VALUES
	(DEFAULT, 450, 1),
	(DEFAULT, 600, 2),
	(DEFAULT, 750, 3),
	(DEFAULT, 500, 4),
	(DEFAULT, 650, 5),
	(DEFAULT, 700, 6),
	(DEFAULT, 800, 7);
