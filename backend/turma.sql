CREATE TABLE turma (
    codigo VARCHAR(14) PRIMARY KEY,
    serie VARCHAR(10),
    turma VARCHAR(10),
    periodo VARCHAR(10),
    id_professor INT,
    FOREIGN KEY (id_professor) REFERENCES professor(id_professor)
);
