class Professor {
    
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        const professores = await this.db.ExecutaComando('SELECT * FROM professor')
        return professores;
    }

    async filtrar({ codigo }) {
        try {
          const sql = 'SELECT * FROM professor WHERE id_professor = ?';
      
          // Assumindo que ExecutaComando aceite os parametros e retorne a promise
          let professores = await this.db.ExecutaComando(sql, [codigo]);
      
          return professores;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }

    async create(dadosProfessor) {
        await banco.ExecutaComandoNonQuery('insert into professor set ?', dadosProfessor)
    }

    async update(codigo, dadosProfessor) {
        await this.db.ExecutaComandoNonQuery('update professor set ? where id_professor = ?', [dadosProfessor, codigo])
    }

    async getByCodigo(codigo) {
        const result = await this.db.ExecutaComando('SELECT nome_professor FROM professor WHERE id_professor = ?', [codigo]);
        const professor = result[0];
        return professor.nome_professor;
    }
    
    async deleteProfessor(codigo) {
        await this.db.ExecutaComandoNonQuery('DELETE FROM professor WHERE id_professor = ?', [codigo])
    }
}

module.exports = Professor


