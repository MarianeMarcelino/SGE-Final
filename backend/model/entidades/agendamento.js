class Agendamento {
    
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        const agendas = await this.db.ExecutaComando('SELECT * FROM agendas')
        return agendas;
    }

    async filtrar({ nome }) {
        try {
            const sql = `SELECT * FROM agendas WHERE professor LIKE '%${nome}%'`;

            // Assuming ExecutaComando accepts parameters and returns a promise
            let agendas = await this.db.ExecutaComando(sql);

            return agendas;
        } catch (error) {
            console.error(error);
            throw error; // Optionally rethrow the error for the calling code to handle
        }
    }

    async create(dadosAgenda) {
        await this.db.ExecutaComandoNonQuery('insert into agendas set ?', dadosAgenda)
    }

    async deleteAgenda(codigo) {
        await this.db.ExecutaComandoNonQuery('DELETE FROM agendas WHERE codigo = ?', [codigo])
    }
}

module.exports=Agendamento

