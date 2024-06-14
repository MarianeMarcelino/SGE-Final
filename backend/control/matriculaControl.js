const Database = require("../model/database");
const Aluno = require("../model/entidades/aluno");
const Matricula = require("../model/entidades/matricula");

class MatriculaControl {
    
    constructor() {
        const db = new Database();
        this.aluno = new Aluno(db);
        this.matricula = new Matricula(db, this.aluno);
    }

    async getAll(req, res) {
        res.type('application/json');
        try {
            const listaMatriculas = await this.matricula.getAll();
            res.json({
                status: true,
                listaMatriculas: listaMatriculas
            });
        } catch (error) {
            res.json({
                status: false,
                mensagem: "Não foi possível obter as matrículas: " + error.message
            });
        }
    }

    async filtrar(req, res) {
        const { cpf } = req.body;
        try {
            const result = await this.matricula.filtrar({ cpf });
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error during filtering:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async filtrarMatriculaAluno(req, res) {
        const { cpf } = req.params;
        try {
            const result = await this.matricula.filtrarMatriculaAluno(cpf);
            console.log(result);
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error during filtering:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async create(req, res) {
        const matriculaData = req.body;
        try {
            await this.matricula.create(matriculaData);
            res.status(200).json({
                status: true,
                mensagem: "Aluno matriculado com sucesso!"
            });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(400).json({
                    status: false,
                    mensagem: "Não foi possível realizar a matrícula pois o aluno já está matriculado em outra turma."
                });
            } else {
                console.log("Erro ao matricular aluno", error);
                res.status(500).json({
                    status: false,
                    mensagem: "Erro ao matricular aluno"
                });
            }
        }
    }

    async update(req, res) {
        const cpf_aluno = req.body.cpf_aluno;
        const { codigo_turma } = req.body;
        try {
            await this.matricula.update(cpf_aluno, codigo_turma);
            res.status(200).json({ message: "Matrícula atualizada com sucesso" });
        } catch (error) {
            console.log("Erro ao atualizar matrícula", error);
            res.status(500).json({ error: "Erro ao atualizar matrícula" });
        }
    }

    async deleteMatricula(req, res) {
        const { cpf } = req.params;
        try {
            await this.matricula.deleteMatricula(cpf);
            res.status(200).json({ message: 'Matrícula deletada com sucesso!' });
        } catch (error) {
            console.log('Erro ao deletar matrícula', error);
            res.status(500).json({ error: 'Erro ao deletar matrícula' });
        }
    }
}

module.exports = MatriculaControl;
