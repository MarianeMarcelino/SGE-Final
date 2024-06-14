const API_BASE_URL = 'http://localhost:3001';

class TurmaService {

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
    

    async filtrar(filtroData){
        try{
            const response = await fetch(`${API_BASE_URL}/turma/filtrar`,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(filtroData)
            })
            if(!response.ok){
                throw new Error('Erro ao filtrar turma')
            }
            return await response.json()
        }catch(error){
            throw error;
        }
    }

    async createTurma(turmaData) {
        try {
            const response = await fetch(`${API_BASE_URL}/turma`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(turmaData)
            })
            if (!response.ok) {
                throw new Error('Erro ao cadastrar Turma')
            }
        } catch (error) {
            throw error;
        }
    }

    async updateTurma(codigo, turmaData) {
        try {
            const response = await fetch(`${API_BASE_URL}/turma/${codigo}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(turmaData)
            })
            if (!response.ok) {
                throw new Error('Erro ao atualizar a Turma')
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

    async deleteTurma(codigo) {
        try {
            const response = await fetch(`${API_BASE_URL}/turma/${codigo}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir turma!')
            }
            const dados = await response.json();
            return dados;
        } catch (error) {
            console.log('Erro ao excluir turma:', error);
            throw error;
        }
    }

    async buscarProfessores(idProfessor){
        try {
            const response = await fetch(`http://localhost:3001/professor/${idProfessor}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar professor!');
            }
            const professor = await response.json();
            return professor.nome_professor;
        } catch (error) {
            console.error('Erro ao buscar professor:', error);
            throw error;
        }
    };
    
}

export default TurmaService