CREATE TABLE matricula (
    cpf_aluno VARCHAR(14) PRIMARY KEY NOT NULL,
    codigo_turma VARCHAR(14) NOT NULL,
    CONSTRAINT fk_aluno FOREIGN KEY (cpf_aluno) REFERENCES aluno(cpf),
    CONSTRAINT fk_turma FOREIGN KEY (codigo_turma) REFERENCES turma(codigo)
);
