const Nota = require("../model/entidades/nota.js");
const nota = new Nota();
const Disciplina = require("../model/entidades/disciplina.js");
const disciplina = new Disciplina();
const Turma = require("../model/entidades/turma");
const turma = new Turma();
const Aluno = require("../model/entidades/aluno");
const aluno = new Aluno();
const Database = require("../model/database");
class NotaControl {

    constructor() {
        const db = new Database();
        this.nota = new Nota(db, this.aluno);
    }

    async getDisciplinas(req, res) {
        try {
            const disciplinas = await disciplina.getDisciplinas();
            res.status(200).json(disciplinas);
        } catch (error) {
            console.log('Erro ao buscar disciplinas:', error);
            res.status(500).json({ error: 'Erro interno ao buscar disciplinas' });
        }
    }

    async getTurmas(req, res) {
        try {
            const turma = new Turma();
            const turmas = await turma.getAll();
            res.status(200).json(turmas);
        } catch (error) {
            console.log('Erro ao buscar turmas:', error);
            res.status(500).json({ error: 'Erro interno ao buscar turmas' });
        }
    }

    async getAlunos(req, res) {
        try {
            const aluno = new Aluno();
            const alunos = await aluno.getAll();
            res.status(200).json(alunos);
        } catch (error) {
            console.log('Erro ao buscar Alunos:', error);
            res.status(500).json({ error: 'Erro interno ao buscar Alunos' });
        }
    }

    async create(req, res) {
        try {
            const result = await this.nota.create(req.body);
            if (result.error) {
                console.log(result.sqlError); // Log o erro SQL se disponível
                res.status(500).json(result);
            } else {
                res.status(201).json({ message: 'Registro inserido com sucesso' });
            }
        } catch (error) {
            console.log('Erro no controle ao inserir nota:', error);
            res.status(500).json({ error: 'Erro ao inserir Nota no controle', details: error.message });
        }
    }
    
    async getAll(req, res) {
        try {
            const result = await this.nota.getAll();
            res.status(200).json(result);
        } catch (error) {
            console.log('Erro ao buscar Notas e Faltas:', error);
            res.status(500).json({ error: 'Erro ao buscar Notas e Faltas' });
        }
    }

    async update(req, res) {
        const { id_nota } = req.params;
        try {
            await this.nota.update(id_nota, req.body);
            res.status(201).json({ message: 'Registro atualizado com sucesso' });
        } catch (error) {
            console.log('Erro ao atualizar nota:', error);
            res.status(500).json({ error: 'Erro ao atualizar Nota' });
        }
    }

    async delete(req, res) {
        const { id_nota } = req.params;
        try {
            await this.nota.delete(id_nota);
            res.status(200).json({ message: 'Registro deletado com sucesso' });
        } catch (error) {
            console.log('Erro ao deletar nota:', error);
            res.status(500).json({ error: 'Erro ao deletar Nota' });
        }
    }
}

module.exports = NotaControl;
