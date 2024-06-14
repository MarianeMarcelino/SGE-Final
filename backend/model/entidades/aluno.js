// class Aluno {
//     constructor(db) {
//         this.db = db;
//     }

//     async getAll() {
//         try {
//             const alunos = await this.db.ExecutaComando('SELECT * FROM aluno');
//             return alunos;
//         } catch (error) {
//             console.error("Erro ao buscar alunos", error);
//             throw error;
//         }
//     }

//         async filtrar({ nome }) {
//         try {
//             let sql = "SELECT * FROM aluno WHERE nome LIKE ?";
//             const params = [`%${nome}%`];
//             const alunos = await this.db.ExecutaComando(sql, params);
//             return alunos;
//         } catch (error) {
//             console.error("Erro durante a filtragem", error);
//             throw error;
//         }
//     }

//         async getByCPF(cpf) {
//         try {
//             const aluno = await this.db.ExecutaComando('SELECT * FROM aluno WHERE cpf = ?', [cpf]);
//             return aluno[0];
//         } catch (error) {
//             console.error("Erro ao buscar aluno", error);
//             throw error;
//         }
//     }

//     async create(dadosAluno) {
//         try {
//             await this.db.ExecutaComandoNonQuery('INSERT INTO aluno SET ?', dadosAluno);
//         } catch (error) {
//             console.error("Erro ao cadastrar aluno", error);
//             throw error;
//         }
//     }

//     async update(cpf, dadosAluno) {
//         try {
//             await this.db.ExecutaComandoNonQuery('UPDATE aluno SET ? WHERE cpf = ?', [dadosAluno, cpf]);
//         } catch (error) {
//             console.error("Erro ao atualizar aluno", error);
//             throw error;
//         }
//     }

//     async deleteAluno(cpf) {
//         try {
//             await this.db.ExecutaComandoNonQuery('DELETE FROM aluno WHERE cpf = ?', [cpf]);
//         } catch (error) {
//             console.error("Erro ao deletar aluno", error);
//             throw error;
//         }
//     }
// }

// module.exports = Aluno;

class Aluno {
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        try {
            const alunos = await this.db.ExecutaComando('SELECT * FROM aluno');
            return alunos;
        } catch (error) {
            console.error("Erro ao buscar alunos", error);
            throw error;
        }
    }

    async filtrar({ nome }) {
        try {
            let sql = "SELECT * FROM aluno WHERE nome LIKE ?";
            const params = [`%${nome}%`];
            const alunos = await this.db.ExecutaComando(sql, params);
            return alunos;
        } catch (error) {
            console.error("Erro durante a filtragem", error);
            throw error;
        }
    }

    async getByCPF(cpf) {
        try {
            const aluno = await this.db.ExecutaComando('SELECT * FROM aluno WHERE cpf = ?', [cpf]);
            return aluno[0];
        } catch (error) {
            console.error("Erro ao buscar aluno", error);
            throw error;
        }
    }

    async create(dadosAluno) {
        try {
            await this.db.ExecutaComandoNonQuery('INSERT INTO aluno SET ?', dadosAluno);
        } catch (error) {
            console.error("Erro ao cadastrar aluno", error);
            throw error;
        }
    }

    async update(cpf, dadosAluno) {
        try {
            await this.db.ExecutaComandoNonQuery('UPDATE aluno SET ? WHERE cpf = ?', [dadosAluno, cpf]);
        } catch (error) {
            console.error("Erro ao atualizar aluno", error);
            throw error;
        }
    }

    async deleteAluno(cpf) {
        try {
            await this.db.ExecutaComandoNonQuery('DELETE FROM aluno WHERE cpf = ?', [cpf]);
        } catch (error) {
            console.error("Erro ao deletar aluno", error);
            throw error;
        }
    }
}

module.exports = Aluno;

