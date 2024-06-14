const API_BASE_URL = 'http://localhost:3001';

class AlunoService {

    async getAllAlunos() {
        try {
            const response = await fetch(`${API_BASE_URL}/aluno`)
            if (!response.ok) {
                throw new Error('Erro ao buscar alunos!')
            }
            const dados = await response.json();
            return dados;
        } catch (error) {
            console.log('Erro ao buscar alunos:', error);
            throw error;
        }
    }

    async createAluno(alunoData) {
        try {
            const response = await fetch(`${API_BASE_URL}/aluno`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(alunoData)
            })
            if (!response.ok) {
                throw new Error(' Aluno já está cadastrado no sistema!')
            }
        } catch (error) {
            throw error;
        }
    }

    async filtrar(filtroData) {
        try {
            const response = await fetch(`${API_BASE_URL}/aluno/filtrar`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filtroData)
            })
            if (!response.ok) {
                throw new Error('Erro ao cadastrar Aluno')
            }
            return await response.json()
        } catch (error) {
            throw error;
        }
    }
    
    async filtrarPorNome(nome) {
        try {
            const response = await fetch(`${API_BASE_URL}/aluno/filtrar`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome: nome })
            })
            if (!response.ok) {
                throw new Error('Erro ao filtrar aluno por nome');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao filtrar aluno por nome:', error);
            throw error;
        }
    }
    

    async updateAluno(cpf, alunoData) {
        try {
            const response = await fetch(`${API_BASE_URL}/aluno/${cpf}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(alunoData)
            })
            if (!response.ok) {
                throw new Error('Erro ao atualizar o Aluno')
            }
        } catch (error) {
            throw error;
        }
    }

    async getAluno() {
        try {
            const response = await fetch(`${API_BASE_URL}/aluno`)
            if (!response.ok) {
                throw new Error('Erro ao buscar aluno!')
            }
            const dados = await response.json();
            return dados;
        } catch (error) {
            console.log('Erro ao buscar alunos:', error);
            throw error;
        }
    }

    async deleteAluno(cpf) {
        try {
            const response = await fetch(`${API_BASE_URL}/aluno/${cpf}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar aluno!')
            }
            const dados = await response.json();
            return dados;
        } catch (error) {
            console.log('Erro ao buscar alunos:', error);
            throw error;
        }
    }

}

export default AlunoService