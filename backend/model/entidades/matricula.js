class Matricula {
    
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        try {
            const matriculas = await this.db.ExecutaComando('SELECT * FROM matricula');
            return matriculas;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async filtrar({ cpf }) {
        try {
            const sql = `SELECT * FROM matricula m 
                         INNER JOIN aluno a ON a.cpf = m.cpf_aluno 
                         WHERE m.cpf_aluno LIKE ? OR a.nome LIKE ?`;
            const likeCpf = `%${cpf}%`;
            const matricula = await this.db.ExecutaComando(sql, [likeCpf, likeCpf]);
            return matricula;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async filtrarMatriculaAluno(cpf) {
        try {
            const sql = `SELECT * FROM matricula WHERE cpf_aluno = ?`;
            const matricula = await this.db.ExecutaComando(sql, [cpf]);
            return matricula[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(dadosMatricula) {
        try {
            await this.db.ExecutaComandoNonQuery('INSERT INTO matricula SET ?', dadosMatricula);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(cpf, codigo_turma) {
        try {
            await this.db.ExecutaComandoNonQuery('UPDATE matricula SET codigo_turma = ? WHERE cpf_aluno = ?', [codigo_turma, cpf]);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteMatricula(cpf) {
        try {
            await this.db.ExecutaComandoNonQuery('DELETE FROM matricula WHERE cpf_aluno = ?', [cpf]);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteAll() {
        try {
            await this.db.ExecutaComandoNonQuery('DELETE FROM matricula WHERE 1');
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = Matricula;
