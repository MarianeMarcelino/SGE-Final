const Database = require("../model/database");
const Turma = require("../model/entidades/turma");

class TurmaControl {
    
    constructor() {
        this.database = new Database();
        this.turma = new Turma(this.database);
    }

    async getAll(req, res) {
        res.type('application/json');
        try {
            const listaTurmas = await this.turma.getAll();
            res.json({
                status: true,
                listaTurmas: listaTurmas
            });
        } catch (error) {
            res.json({
                status: false,
                mensagem: "Não foi possível obter as matrículas: " + error.message
            });
        }
    }
   
    async filtrar(req, res) {
        const filtro = req.body;
        try {
            const result = await this.turma.filtrar(filtro);
            return res.status(200).json(result);
        } catch (error) {
            console.error('Erro durante a filtragem:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async getByCodigo(req, res) {
        const codigo = req.params.codigo;
        try {
            const result = await this.turma.getByCodigo(codigo);
            if (result) {
                return res.status(200).json(result);
            } else {
                res.status(404).json({ error: 'Turma não encontrada' });
            }
        } catch (error) {
            console.log("Erro ao buscar turma", error);
            res.status(500).json({ error: "Erro ao buscar turma" });
        }
    }

    async create(req,res){
        const turmaData = req.body;
        try{
            await this.turma.create(turmaData)
            res.status(200).json({
                "status": true,
                "mensagem": "Turma incluída com sucesso!"
            })
        }catch(error){
            console.log("Erro ao cadastrar turma "+error+"a")
            res.status(500).json({error: "Erro ao cadastrar turma"})
        }
    }

    async update(req, res) {
        const codigo = req.params.codigo;
        const dadosTurma = req.body;
        try {
            await this.turma.update(codigo, dadosTurma);
            res.status(200).json({ message: "Turma atualizada com sucesso" });
        } catch (error) {
            console.log("Erro ao atualizar turma", error);
            res.status(500).json({ error: "Erro ao atualizar turma: " + error.message });
        }
    }

    async deleteTurma(req, res) {
        const codigo = req.params.codigo;
        try {
            await this.turma.deleteTurma(codigo);
            res.status(200).json({ message: 'Turma deletada com sucesso!' });
        } catch (error) {
            console.log('Erro ao deletar turma', error);
            res.status(500).json({ error: 'Erro ao deletar turma' });
        }
    }
}

module.exports = TurmaControl;


