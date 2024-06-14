const API_BASE_URL = 'http://localhost:3001';

class MatriculaService {

    async getAllTurma() {
        try {
            const response = await fetch(`${API_BASE_URL}/turma`);
            if (!response.ok) {
                throw new Error('Erro ao buscar turma!');
            }
            const turmas = await response.json();
    
            // Fetching professor details for each turma
            const turmasComProfessores = await Promise.all(turmas.map(async (turma) => {
                const response = await fetch(`${API_BASE_URL}/professor/${turma.id_professor}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar professor!');
                }
                const professor = await response.json();
                return {
                    ...turma,
                    nome_professor: professor.nome // Adicionando o nome do professor aos dados da turma
                };
            }));
    
            return turmasComProfessores;
        } catch (error) {
            console.log('Erro ao buscar turma:', error);
            throw error;
        }
    }
    

    async filtrar({ cpf }) {
        try {
            const response = await fetch(`${API_BASE_URL}/matricula/filtrar`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cpf: cpf })
            });
            if (!response.ok) {
                throw new Error('Erro ao filtrar matrícula');
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }


    async createMatricula(matriculaData) {
        try {
            const response = await fetch(`${API_BASE_URL}/matricula`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(matriculaData)
            })
            if (!response.ok) {
                throw new Error('Erro ao matricular aluno')
            }
        } catch (error) {
            throw error;
        }
    }

    async updateMatricula(cpf, matriculaData) {
        try {
            const response = await fetch(`${API_BASE_URL}/matricula/${cpf}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(matriculaData)
            })
            if (!response.ok) {
                throw new Error('Erro ao atualizar a matricula')
            }
        } catch (error) {
            throw error;
        }
    }

    async getTurma() {
        try {
            const response = await fetch(`${API_BASE_URL}/turma`)
            if (!response.ok) {
                throw new Error('Erro ao buscar turma!')
            }
            const dados = await response.json();
            return dados;
        } catch (error) {
            console.log('Erro ao buscar turma:', error);
            throw error;
        }
    }

    async deleteMatricula(cpf) {
        try {
            const response = await fetch(`${API_BASE_URL}/matricula/${cpf}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir matricula!')
            }
            const dados = await response.json();
            return dados;
        } catch (error) {
            console.log('Erro ao excluir matricula:', error);
            throw error;
        }
    }
    
}

export default MatriculaService