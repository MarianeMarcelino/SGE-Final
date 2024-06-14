const API_BASE_URL ='http://localhost:3001';

class ResponsavelService{
   
    async getAllResponsavel(){
        try{

            const response = await fetch (`${API_BASE_URL}/responsavel`)

            if(!response.ok){
                throw new Error('Erro ao buscar Responsável')
            } 

            const dados = await response.json();
            return dados

        }

        catch(error){

            console.error('Erro ao buscar Responsável:',error);
            throw error;
        }
    }

    async cpfExiste(cpf) {
        try {
            const response = await fetch(`${API_BASE_URL}/responsavel/${cpf}`);

            if (!response.ok) {
                if (response.status === 404) {
                    return false;
                }
                throw new Error('Erro na verificação do CPF');
            }

            return true;
        } catch (error) {
            console.error('Erro na verificação do CPF:', error);
            throw error;
        }
    }

    async createResponsavel(responsavelData) {

        const cpfJaExiste = await this.cpfExiste(responsavelData.cpf);

        if (cpfJaExiste) {
            throw new Error('CPF já cadastrado.');
        }

        try{

            const response = await fetch (`${API_BASE_URL}/responsavel`,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },

                body:JSON.stringify(responsavelData)
            })

            if(!response.ok){
                throw new Error('Erro ao Cadastrar Responsável')
            }


        }

        catch(error){
            throw error;
        }
    }

    async filtrar (filtroData){
        try{

            const response = await fetch (`${API_BASE_URL}/responsavel/filtrar`,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },

                body:JSON.stringify(filtroData)
            })

            if(!response.ok){
                throw new Error('Erro ao Filtrar Responsável')
            }

            return await response.json()


        }

        catch(error){
            throw error;
        }
    }

    async updateResponsavel(cpf,responsavelData){
        try{
            const response = await fetch (`${API_BASE_URL}/responsavel/${cpf}`,{
                method:"PUT",
                headers:{
                    'Content-Type': 'application/json',
                },

                body:JSON.stringify(responsavelData)
            })

            if(!response.ok){
                throw new Error('Erro ao Atualizar Responsável')
            }
        }
        catch(error){
            throw error;
        }

    }
    
    async deleteResponsavel(cpf){
        try{

            const response = await fetch (`${API_BASE_URL}/responsavel/${cpf}`,{
                method:"DELETE",
            })

            if(!response.ok){
                throw new Error('Erro ao Deletar Responsável')
            }

        }

        catch (error) {
            console.error('Erro ao buscar Responsável:',error);
            throw error;
        }
    }

}

export default ResponsavelService