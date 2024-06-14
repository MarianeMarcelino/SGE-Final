const Agendamento = require("../model/entidades/agendamento");
const Database = require("../model/database");

class AgendamentoControl {
    
    constructor() {
        const db = new Database();
        this.agendamento = new Agendamento(db);
    }

    async getAll(req, res) {
        res.type('application/json');
        let termo = req.params.termo || "";
        
        if (req.method === "GET") {
            try {
                const listaAgendas = await this.agendamento.getAll();
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
          const result = await this.agendamento.filtrar(filtro);
          return res.status(200).json(result);
        } catch (error) {
          console.error('Error during filtering:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      }

    async create(req, res) {
        const agendaData = req.body;
        try {
            await this.agendamento.create(agendaData)
            res.status(200).json({
                "status": true,
                "mensagem": "Agendamento realizado com sucesso!"
            })
        } catch (error) {
            console.log("Erro ao cadastrar agenda" + error)
            res.status(500).json({ error: "Erro ao cadastrar agenda" })
        }
    }

    async deleteAgenda(req,res){
        const codigo = req.params.codigo;
        try{
            await this.agendamento.deleteAgenda(codigo);
            res.status(200).json({message:'Agenda Deletado com sucesso!'})
        }catch(error){
            console.log('Erro ao deletar agenda',error)
            res.status(500).json({error:'Erro ao deletar agenda'})
        }
    }

}

module.exports = AgendamentoControl;