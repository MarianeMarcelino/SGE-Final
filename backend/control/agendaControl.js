const Database = require("../model/database");
const Agenda = require("../model/entidades/agenda");

class AgendaControl {
    
    constructor() {
        this.db = new Database();
        this.agenda = new Agenda(this.db);
    }

    async getAll(req, res) {
        res.type('application/json');
        let termo = req.params.termo || "";
        
        if (req.method === "GET") {
            try {
                const listaAgendas = await this.agenda.getAll();
                res.json({
                    status: true,
                    listaAgendas: listaAgendas
                });
            } catch (error) {
                res.json({
                    status: false,
                    mensagem: "Não foi possível obter agendas: " + error.message
                });
            }
        } else {
            res.status(400).json({
                status: false,
                mensagem: "Por favor, utilize o método GET para consultar agendas!"
            });
        }
    }

    async filtrar(req, res) {
        const filtro = req.body;
        try {
            const result = await this.agenda.filtrar(filtro);
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error during filtering:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getByCodigo(req, res) {
        const codigo = req.params.codigo;
        try {
            const result = await this.agenda.getByCodigo(codigo);
            if (result) {
                return res.status(200).json(result);
            } else {
                res.status(404).json({ error: 'Agenda não encontrada' });
            }
        } catch (error) {
            console.log("Erro ao buscar agendas" + error);
            res.status(500).json({ error: "Erro ao buscar agendas" });
        }
    }

    async create(req, res) {
        const agendaData = req.body;
        try {
            await this.agenda.create(agendaData);
            res.status(200).json({ message: "Agenda cadastrada com sucesso" });
        } catch (error) {
            console.log("Erro ao cadastrar agenda" + error);
            res.status(500).json({ error: "Erro ao cadastrar agenda" });
        }
    }

    async update(req, res) {
        const codigo = req.params.codigo;
        const agendaData = req.body;
        try {
            await this.agenda.update(codigo, agendaData);
            res.status(200).json({ message: "Agenda atualizada com sucesso" });
        } catch (error) {
            console.log("Erro ao atualizar agenda" + error);
            res.status(500).json({ error: "Erro ao atualizar agenda" });
        }
    }

    async deleteAgenda(req, res) {
        const codigo = req.params.codigo;
        try {
            await this.agenda.deleteAgenda(codigo);
            res.status(200).json({ message: 'Agenda deletada com sucesso!' });
        } catch (error) {
            console.log('Erro ao deletar agenda', error);
            res.status(500).json({ error: 'Erro ao deletar agenda' });
        }
    }
}

module.exports = AgendaControl;
