CREATE TABLE responsavel (
    nome varchar(30) NOT NULL,
    sobrenome varchar(50) NOT NULL,
    cpf varchar(14) NOT NULL,
    rg varchar(25) NOT NULL,
    telefone varchar(15) NOT NULL,
    email varchar(100) NOT NULL,
    CONSTRAINT pk_responsavel PRIMARY KEY (cpf)
);


