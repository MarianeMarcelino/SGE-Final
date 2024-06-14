-- Cria a base dados
CREATE DATABASE sge;
-- Cria a tabela de alunos
CREATE TABLE aluno (
    cpf varchar(14) not null primary key,
    rg varchar(14) null,
    nome varchar(100) null,
    sobrenome varchar(100) null,
    dataNascimento varchar(100) null,
    sexo varchar(100) null,
    endereco varchar(100) null,
    bairro varchar(100) null,
    cidade varchar(100) null,
    cep varchar(100) null,
    estado varchar(100) null,
    telefone varchar(20) null,
    email varchar(100) null
);
-- Insere os alunos na tabela
INSERT INTO aluno (cpf, rg, nome, sobrenome, dataNascimento, sexo, endereco, bairro, cidade, cep, estado, telefone, email)
VALUES 
    ('605.300.050-77', '12.345.678-9', 'Fulano', 'Silva', '1990-01-01', 'Masculino', 'Rua A - 123', 'Centro', 'Cidade A', '12345-678', 'PR', '(11) 98765-4321', 'fulano@email.com'),
    ('426.069.220-85', '98.765.432-1', 'Ciclana', 'Oliveira', '1985-05-05', 'Feminino', 'Rua B - 456', 'Bairro B', 'Cidade B', '54321-876', 'CE', '(22) 98765-4321', 'ciclana@email.com');

CREATE TABLE agenda (
    codigo INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    turma VARCHAR(100) NOT NULL,
    dia VARCHAR(100) NOT NULL,
    hora VARCHAR(100) NOT NULL,
    CONSTRAINT pk_agenda PRIMARY KEY(codigo)
);

CREATE TABLE matricula (
    cpf_aluno VARCHAR(100) NOT NULL,
    codigo_turma VARCHAR(100) NOT NULL,
    CONSTRAINT pk_cpf_aluno PRIMARY KEY(cpf_aluno)
)