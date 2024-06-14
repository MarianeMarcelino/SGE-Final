// class Turma {
    
//     constructor(db) {
//         this.db = db;
//     }

//     async getAll() {
//         const turmas = await this.db.ExecutaComando('SELECT * FROM turma');
//         return turmas;
//     }

//     async filtrar({ nome }) {
//         try {
//             const sql = `SELECT nome_professor 
//                          FROM professor p
//                          INNER JOIN turma t ON t.id_professor = p.id_professor
//                          WHERE nome_professor LIKE ?`;
//             const likeNome = `%${nome}%`;
//             const turmas = await this.db.ExecutaComando(sql, [likeNome]);
//             return turmas;
//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     }

//     async create(dadosTurma) {
//         await this.db.ExecutaComandoNonQuery('INSERT INTO turma SET ?', dadosTurma);
//     }

//     async update(codigo, dadosTurma) {
//         const sql = 'UPDATE turma SET serie = ?, id_professor = ?, turma = ?, periodo = ? WHERE codigo = ?';
//         const params = [dadosTurma.serie, dadosTurma.id_professor, dadosTurma.turma, dadosTurma.periodo, codigo];
//         await this.db.ExecutaComandoNonQuery(sql, params);
//     }

//     async getByCodigo(codigo) {
//         const result = await this.db.ExecutaComando('SELECT * FROM turma WHERE codigo = ?', [codigo]);
//         const turma = result[0];
//         return turma;
//     }

//     async deleteTurma(codigo) {
//         await this.db.ExecutaComandoNonQuery('DELETE FROM turma WHERE codigo = ?', [codigo]);
//     }
// }

// module.exports = Turma;

class Turma {
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        const turmas = await this.db.ExecutaComando('SELECT * FROM turma');
        return turmas;
    }

    async filtrar({ nome }) {
        try {
            const sql = `SELECT nome_professor 
                         FROM professor p
                         INNER JOIN turma t ON t.id_professor = p.id_professor
                         WHERE nome_professor LIKE ?`;
            const likeNome = `%${nome}%`;
            const turmas = await this.db.ExecutaComando(sql, [likeNome]);
            return turmas;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(dadosTurma) {
        await this.db.ExecutaComandoNonQuery('INSERT INTO turma SET ?', dadosTurma);
    }

    async update(codigo, dadosTurma) {
        const sql = 'UPDATE turma SET serie = ?, id_professor = ?, turma = ?, periodo = ? WHERE codigo = ?';
        const params = [dadosTurma.serie, dadosTurma.id_professor, dadosTurma.turma, dadosTurma.periodo, codigo];
        await this.db.ExecutaComandoNonQuery(sql, params);
    }

    async getByCodigo(codigo) {
        const result = await this.db.ExecutaComando('SELECT * FROM turma WHERE codigo = ?', [codigo]);
        const turma = result[0];
        return turma;
    }

    async deleteTurma(codigo) {
        await this.db.ExecutaComandoNonQuery('DELETE FROM turma WHERE codigo = ?', [codigo]);
    }
}

module.exports = Turma;
