const API_BASE_URL = "http://localhost:3001";

class FuncionarioService {

  async filterFuncionarios(filterData) {
    try {
      const response = await fetch(`${API_BASE_URL}/funcionarios/filtrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterData),
      });

      if (!response.ok) {
        throw new Error("Erro ao filtrar funcionários");
      }

      const dados = await response.json();
      return dados;
    } catch (error) {
      throw error;
    }
  }

  async getAllFuncionarios() {
    try {
      const response = await fetch(`${API_BASE_URL}/funcionarios`);
      if (!response.ok) {
        throw new Error("Erro ao buscar funcionarios");
      }
      const dados = await response.json();
      return dados;
    } catch (error) {
      console.error("Erro ao buscar funcionarios:", error);
      throw error;
    }
  }

  async createFuncionario(funcionarioData) {
    try {
      const response = await fetch(`${API_BASE_URL}/funcionarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(funcionarioData),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar funcionário");
      }
    } catch (error) {
      throw error;
    }
  }

  async updateFuncionario(matricula, funcionarioData) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/funcionarios/${matricula}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(funcionarioData),
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao atualizar funcionário");
      }
    } catch (error) {
      throw error;
    }
  }

  async getFuncionariosByMatricula(matricula) {
    try {
      const response = await fetch(`${API_BASE_URL}/funcionarios/${matricula}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar funcionarios");
      }
      const dados = await response.json();
      return dados;
    } catch (error) {
      console.error("Erro ao buscar funcionarios:", error);
      throw error;
    }
  }

  async deleteFuncionario(matricula) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/funcionarios/${matricula}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(`Erro ao deletar funcionário: ${errorMessage.error}`);
      }
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error);
      throw error;
    }
  }
}
export default FuncionarioService;
