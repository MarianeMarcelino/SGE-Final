const Aluno = require("../model/entidades/aluno");
const Database = require("../model/database");

class AlunoControl {

    constructor() {
        this.db = new Database();
        this.aluno = new Aluno(this.db);
    }

    async getAll(req, res) {
        res.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = req.params.termo;
        if (!termo){
            termo = "";
        }
        if (req.method === "GET"){
            this.aluno.getAll(termo).then((listaAlunos)=>{
                res.json(
                    {
                        status:true,
                        listaAlunos: listaAlunos
                    });
            })
            .catch((erro)=>{
                res.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter os autores: " + erro.message
                    }
                );
            });
        }
        else 
        {
            res.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar autores!"
            });
        }
    }

    async filtrar(req, res) {
        const filtro = req.body;
        try {
            const result = await this.aluno.filtrar(filtro);
            res.status(200).json(result);
        } catch (error) {
            console.error("Erro durante a filtragem", error);
            res.status(500).json({ error: "Erro durante a filtragem" });
        }
    }

    async getByCPF(req, res) {
        const cpf = req.params.cpf;
        try {
            const result = await this.aluno.getByCPF(cpf);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ error: 'Aluno não encontrado' });
            }
        } catch (error) {
            console.error("Erro ao buscar aluno", error);
            res.status(500).json({ error: "Erro ao buscar aluno" });
        }
    }

    async create(req, res) {
        const alunoData = req.body;
        try {
            await this.aluno.create(alunoData);
            res.status(200).json({ message: "Aluno cadastrado com sucesso" });
        } catch (error) {
            console.error("Erro ao cadastrar aluno", error);
            res.status(500).json({ error: "Erro ao cadastrar aluno" });
        }
    }

    async update(req, res) {
        const cpf = req.params.cpf;
        const alunoData = req.body;
        try {
            await this.aluno.update(cpf, alunoData);
            res.status(200).json({ message: "Aluno atualizado com sucesso" });
        } catch (error) {
            console.error("Erro ao atualizar aluno", error);
            res.status(500).json({ error: "Erro ao atualizar aluno" });
        }
    }

    async deleteAluno(req, res) {
        const cpf = req.params.cpf;
        try {
            await this.aluno.deleteAluno(cpf);
            res.status(200).json({ message: 'Aluno deletado com sucesso' });
        } catch (error) {
            console.error("Erro ao deletar aluno", error);
            res.status(500).json({ error: "Erro ao deletar aluno" });
        }
    }
}

module.exports = AlunoControl;
