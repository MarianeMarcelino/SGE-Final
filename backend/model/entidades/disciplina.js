// class Disciplina {
    
//     constructor(db) {
//         this.db = db;
//     }

//     async getAll() {
//         const disciplinas = await this.db.ExecutaComando('SELECT * FROM disciplina')
//         return disciplinas;
//     }

//     async filtrar({ codigo }) {
//         try {
//           const sql = 'SELECT * FROM disciplina WHERE codigo = ?';
      
//           // Assuming ExecutaComando accepts parameters and returns a promise
//           let disciplinas = await this.db.ExecutaComando(sql, [codigo]);
      
//           return disciplinas;
//         } catch (error) {
//           console.error(error);
//           throw error; // Optionally rethrow the error for the calling code to handle
//         }
//       }

//     async create(dadosDisciplina) {
//         await this.db.ExecutaComandoNonQuery('insert into disciplina set ?', dadosDisciplina)
//     }

//     async update(codigo, dadosDisciplina) {
//         await this.db.ExecutaComandoNonQuery('update disciplina set ? where codigo = ?', [dadosDisciplina, codigo])
//     }

//     async getByCodigo(codigo) {
//         const result = await this.db.ExecutaComando('SELECT * FROM disciplina WHERE codigo = ?', [codigo]);
//         const disciplina = result[0];
//         return disciplina;
//     }

//     async deleteDisciplina(codigo) {
//         await this.db.ExecutaComandoNonQuery('DELETE FROM disciplina WHERE codigo = ?', [codigo])
//     }
// }

// module.exports = Disciplina

class Disciplina {
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        const disciplinas = await this.db.ExecutaComando('SELECT * FROM disciplina');
        return disciplinas;
    }

    async filtrar({ codigo }) {
        try {
            const sql = 'SELECT * FROM disciplina WHERE codigo = ?';
            const disciplinas = await this.db.ExecutaComando(sql, [codigo]);
            return disciplinas;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(dadosDisciplina) {
        await this.db.ExecutaComandoNonQuery('INSERT INTO disciplina SET ?', dadosDisciplina);
    }

    async update(codigo, dadosDisciplina) {
        await this.db.ExecutaComandoNonQuery('UPDATE disciplina SET ? WHERE codigo = ?', [dadosDisciplina, codigo]);
    }

    async getByCodigo(codigo) {
        const result = await this.db.ExecutaComando('SELECT * FROM disciplina WHERE codigo = ?', [codigo]);
        const disciplina = result[0];
        return disciplina;
    }

    async deleteDisciplina(codigo) {
        await this.db.ExecutaComandoNonQuery('DELETE FROM disciplina WHERE codigo = ?', [codigo]);
    }
}

module.exports = Disciplina;

