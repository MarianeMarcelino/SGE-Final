// class Nota {
    
//     constructor(db) {
//         this.db = db;
//     }

//     async getAll() {
//         return await this.db.ExecutaComando('SELECT * FROM nota');
//     }

//     async create(dadosNota) {
//         const sql = 'INSERT INTO nota (codigo_turma, cpf_aluno, codigo_disciplina, bimestre, nota, falta) VALUES (?, ?, ?, ?, ?, ?)';
//         try {
//             await this.db.ExecutaComandoNonQuery(sql, [
//                 dadosNota.codigo_turma,
//                 dadosNota.cpf_aluno,
//                 dadosNota.codigo_disciplina,
//                 dadosNota.bimestre,
//                 dadosNota.nota,
//                 dadosNota.falta
//             ]);
//             return { message: 'Registro inserido com sucesso' };
//         } catch (error) {
//             console.log('Erro SQL:', error); // Log detalhado do erro
//             console.log('Detalhe do Erro:', error.message); // Mensagem específica do erro
//             console.log('Pilha de Erro:', error.stack); // Pilha de chamada para localizar a origem do erro
//             return { error: 'Erro ao inserir Nota', sqlError: error.message };
//         }
//     }
    
    

//     async getById(id_nota) {
//         const sql = 'SELECT * FROM nota WHERE id_nota = ?';
//         const notas = await this.db.ExecutaComando(sql, [id_nota]);
//         return notas[0]; // Retorna o primeiro resultado, pois ID é único
//     }

//     async update(id_nota, dadosNota) {
//         const sql = 'UPDATE nota SET codigo_turma = ?, cpf_aluno = ?, codigo_disciplina = ?, bimestre = ?, nota = ?, falta = ? WHERE id_nota = ?';
//         await this.db.ExecutaComandoNonQuery(sql, [...Object.values(dadosNota), id_nota]);
//     }

//     async delete(id_nota) {
//         const sql = 'DELETE FROM nota WHERE id_nota = ?';
//         await this.db.ExecutaComandoNonQuery(sql, [id_nota]);
//     }
// }

// module.exports = Nota;

class Nota {
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        return await this.db.ExecutaComando('SELECT * FROM nota');
    }

    async create(dadosNota) {
        const sql = 'INSERT INTO nota (codigo_turma, cpf_aluno, codigo_disciplina, bimestre, nota, falta) VALUES (?, ?, ?, ?, ?, ?)';
        try {
            await this.db.ExecutaComandoNonQuery(sql, [
                dadosNota.codigo_turma,
                dadosNota.cpf_aluno,
                dadosNota.codigo_disciplina,
                dadosNota.bimestre,
                dadosNota.nota,
                dadosNota.falta
            ]);
            return { message: 'Registro inserido com sucesso' };
        } catch (error) {
            console.log('Erro SQL:', error); // Log detalhado do erro
            console.log('Detalhe do Erro:', error.message); // Mensagem específica do erro
            console.log('Pilha de Erro:', error.stack); // Pilha de chamada para localizar a origem do erro
            return { error: 'Erro ao inserir Nota', sqlError: error.message };
        }
    }

    async getById(id_nota) {
        const sql = 'SELECT * FROM nota WHERE id_nota = ?';
        const notas = await this.db.ExecutaComando(sql, [id_nota]);
        return notas[0]; // Retorna o primeiro resultado, pois ID é único
    }

    async update(id_nota, dadosNota) {
        const sql = 'UPDATE nota SET codigo_turma = ?, cpf_aluno = ?, codigo_disciplina = ?, bimestre = ?, nota = ?, falta = ? WHERE id_nota = ?';
        await this.db.ExecutaComandoNonQuery(sql, [...Object.values(dadosNota), id_nota]);
    }

    async delete(id_nota) {
        const sql = 'DELETE FROM nota WHERE id_nota = ?';
        await this.db.ExecutaComandoNonQuery(sql, [id_nota]);
    }
}

module.exports = Nota;
