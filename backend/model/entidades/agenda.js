class Agenda {
    
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        try {
            const agendas = await this.db.ExecutaComando('SELECT * FROM agenda');
            return agendas;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async filtrar({ nome }) {
        try {
            const sql = `SELECT * FROM agenda WHERE nome LIKE ?`;
            const likeNome = `%${nome}%`;
            const agendas = await this.db.ExecutaComando(sql, [likeNome]);
            return agendas;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(dadosAgenda) {
        try {
            await this.db.ExecutaComandoNonQuery('INSERT INTO agenda SET ?', dadosAgenda);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(codigo, dadosAgenda) {
        try {
            const sql = 'UPDATE agenda SET nome = ?, turma = ?, dia = ?, hora = ? WHERE codigo = ?';
            const params = [dadosAgenda.nome, dadosAgenda.turma, dadosAgenda.dia, dadosAgenda.hora, codigo];
            await this.db.ExecutaComandoNonQuery(sql, params);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getByCodigo(codigo) {
        try {
            const result = await this.db.ExecutaComando('SELECT * FROM agenda WHERE codigo = ?', [codigo]);
            return result[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteAgenda(codigo) {
        try {
            await this.db.ExecutaComandoNonQuery('DELETE FROM agenda WHERE codigo = ?', [codigo]);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = Agenda;


