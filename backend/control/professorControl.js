const Professor = require("../model/entidades/professor");
const Database = require("../model/database");

class ProfessorControl {

    constructor() {
        const db = new Database();
        this.professor = new Professor(db);
    }

    async getAll(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo){
            termo = "";
        }
        if (requisicao.method === "GET"){
            this.professor.getAll(termo).then((listaProfessores)=>{
                resposta.json(
                    {
                        status:true,
                        listaProfessores: listaProfessores
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter os professores: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar professores!"
            });
        }
    }

    async filtrar(req, res) {
        const filtro = req.body;
        try {
          const result = await this.professor.filtrar(filtro);
          return res.status(200).json(result);
        } catch (error) {
          console.error('Error during filtering:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      }


    async getByCodigo(req, res) {
        const codigo = req.params.codigo;
        try {
            const result = await this.professor.getByCodigo(codigo)
            if (result) {
                return res.status(200).json(result)
            } else {
                res.status(404).json({ error: 'Professor não encontrado' })
            }
        } catch (error) {
            console.log("Erro ao buscar professores" + error)
            res.status(500).json({ error: "Erro ao buscar professores" })
        }

    }

    async create(req, res) {
        const professorData = req.body;
        try {
            await this.professor.create(professorData)
            res.status(200).json({ message: "Professor cadastrado com sucesso" })
        } catch (error) {
            console.log("Erro ao cadastrar professor" + error)
            res.status(500).json({ error: "Erro ao cadastrar professor" })
        }
    }

    async update(req, res) {
        const codigo = req.params.codigo;
        const professorData = req.body;
        try {
            await this.professor.update(codigo, professorData)
            res.status(200).json({ message: "Professor atualizado com sucesso" })
        } catch (error) {
            console.log("Erro ao atualizar professor" + error)
            res.status(500).json({ error: "Erro ao atualizar professor" })
        }
    }

    async deleteProfessor(req, res) {
        const codigo = req.params.codigo;
        try {
            await this.professor.deleteProfessor(codigo);
            res.status(200).json({ message: 'Professor Deletado com sucesso!' })
        } catch (error) {
            console.log('Erro ao deletar professor', error)
            res.status(500).json({ error: 'Erro ao deletar professor' })
        }
    }

}

module.exports = ProfessorControl;