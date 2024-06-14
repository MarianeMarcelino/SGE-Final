const API_BASE_URL = 'http://localhost:3001';

class DisciplinaService {

    async getAllDisciplina() {
        try {
            const response = await fetch(`${API_BASE_URL}/disciplina`)
            if (!response.ok) {
                throw new Error(' Erro ao buscar disciplinas!')
            }
            const dados = await response.json();
            return dados;
        } catch (error) {
            console.log('Erro ao buscar disciplinas:', error);
            throw error;
        }
    }

    async filtrar(filtroData){
        try{
            const response = await fetch(`${API_BASE_URL}/disciplina/filtrar`,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(filtroData)
            })
            if(!response.ok){
                throw new Error('Erro ao filtrar Disciplina')
            }
            return await response.json()
        }catch(error){
            throw error;
        }
    }

    async createDisciplina(disciplinaData) {
        try {
            const response = await fetch(`${API_BASE_URL}/disciplina`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(disciplinaData)
            })
            if (!response.ok) {
                throw new Error('Erro ao cadastrar Disciplina')
            }
        } catch (error) {
            throw error;
        }
    }

    async updateDisciplina(codigo, disciplinaData) {
        try {
            const response = await fetch(`${API_BASE_URL}/disciplina/${codigo}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(disciplinaData)
            })
            if (!response.ok) {
                throw new Error('Erro ao atualizar a Disciplina')
            }
        } catch (error) {
            throw error;
        }
    }

    async getDisciplina() {
        try {
            const response = await fetch(`${API_BASE_URL}/disciplina`)
            if (!response.ok) {
                throw new Error('Erro ao buscar disciplina!')
            }
            const dados = await response.json();
            return dados;
        } catch (error) {
            console.log('Erro ao buscar disciplinas:', error);
            throw error;
        }
    }

    async deleteDisciplina(codigo) {
        try {
            const response = await fetch(`${API_BASE_URL}/disciplina/${codigo}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar disciplina!')
            }
            const dados = await response.json();
            return dados;
        } catch (error) {
            console.log('Erro ao buscar disciplina:', error);
            throw error;
        }
    }

}

export default DisciplinaService