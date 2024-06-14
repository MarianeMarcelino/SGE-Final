const API_BASE_URL = 'http://localhost:3001';

class AgendaService {

    async getAllAgenda() {
        try {
            const response = await fetch(`${API_BASE_URL}/agenda`)
            if (!response.ok) {
                throw new Error(' Erro ao buscar agenda!')
            }
            const dados = await response.json();
            return dados;
        } catch (error) {
            console.log('Erro ao buscar agenda:', error);
            throw error;
        }
    }

    async filtrar(filtroData){
        try{
            const response = await fetch(`${API_BASE_URL}/agenda/filtrar`,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(filtroData)
            })
            if(!response.ok){
                throw new Error('Erro ao filtrar agenda')
            }
            return await response.json()
        }catch(error){
            throw error;
        }
    }

    async createAgenda(agendaData) {
        try {
            const response = await fetch(`${API_BASE_URL}/agenda`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(agendaData)
            })
            if (!response.ok) {
                throw new Error('Erro ao cadastrar Agenda')
            }
        } catch (error) {
            throw error;
        }
    }

    async updateAgenda(codigo, agendaData) {
        try {
            const response = await fetch(`${API_BASE_URL}/agenda/${codigo}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(agendaData)
            })
            if (!response.ok) {
                throw new Error('Erro ao atualizar a Agenda')
            }
        } catch (error) {
            throw error;
        }
    }

    async getAgenda() {
        try {
            const response = await fetch(`${API_BASE_URL}/agenda`)
            if (!response.ok) {
                throw new Error('Erro ao buscar agenda!')
            }
            const dados = await response.json();
            return dados;
        } catch (error) {
            console.log('Erro ao buscar agenda:', error);
            throw error;
        }
    }

    async deleteAgenda(codigo) {
        try {
            const response = await fetch(`${API_BASE_URL}/agenda/${codigo}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar agenda!')
            }
            const dados = await response.json();
            return dados;
        } catch (error) {
            console.log('Erro ao buscar agenda:', error);
            throw error;
        }
    }

}

export default AgendaService