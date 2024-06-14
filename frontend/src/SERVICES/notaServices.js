const API_BASE_URL = 'http://localhost:3001';

class NotaService {

    async getDisciplinas() {
        const response = await fetch(`${API_BASE_URL}/disciplina`);
        if (!response.ok) {
            throw new Error('Falha ao buscar disciplinas');
        }
        return await response.json();
    }

    async getAlunos() {
        const response = await fetch(`${API_BASE_URL}/aluno`);
        if (!response.ok) {
            throw new Error('Falha ao buscar alunos');
        }
        const data = await response.json();
        if (data.status && Array.isArray(data.listaAlunos)) {
            return data.listaAlunos;
        } else {
            throw new Error('Não foi possível recuperar as turmas ou a resposta não é um array');
        }
    }

    async getTurmas() {
        const response = await fetch(`${API_BASE_URL}/turma`);
        if (!response.ok) {
            throw new Error('Falha ao buscar turmas');
        }
        const data = await response.json();
        if (data.status && Array.isArray(data.listaTurmas)) {
            return data.listaTurmas;
        } else {
            throw new Error('Não foi possível recuperar as turmas ou a resposta não é um array');
        }
    }

    async getAllNota() {
        try {
            const response = await fetch(`${API_BASE_URL}/nota`);
            if (!response.ok) {
                throw new Error('Erro ao buscar Notas e Faltas');
            }
            const dados = await response.json();
            return dados;
        } catch (error) {
            console.error('Erro ao buscar Notas e Faltas:', error);
            throw error;
        }
    }

    async createNota(notaData) {
        const response = await fetch(`${API_BASE_URL}/nota`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notaData)
        });
        if (!response.ok) {
            const message = await response.text();
            throw new Error(message || 'Erro ao Cadastrar Notas e Faltas');
        }
        return await response.json();
    }
    

    async filtrar(filtroData) {
        try {
            const response = await fetch(`${API_BASE_URL}/nota/filtrar`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filtroData)
            });
            if (!response.ok) {
                throw new Error('Erro ao Filtrar Alunos');
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    async updateNota(aluno, NotaData) {
        try {
            const response = await fetch(`${API_BASE_URL}/nota/${aluno}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(NotaData)
            });
            if (!response.ok) {
                throw new Error('Erro ao Atualizar Notas e Faltas');
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteNota(id_nota) {
        try {
            const response = await fetch(`${API_BASE_URL}/nota/${id_nota}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error('Erro ao Deletar Notas e Faltas');
            }
            return response.json(); // Garantindo que a resposta seja processada
        } catch (error) {
            console.error('Erro ao deletar Notas e Faltas:', error);
            throw error;
        }
    }
    
}


export default NotaService;
