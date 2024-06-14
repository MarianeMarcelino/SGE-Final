import { useState, useEffect } from "react";
import FuncionarioService from "../../SERVICES/funcionarioService";
import "./ListaFuncionario.css";
const funcionarioService = new FuncionarioService();

function ListaFuncionarios({
  setFuncionarioData,
  setFuncionarioEditando,
  setAlertMessage,
  setAlertType,
  clearAlertAfterDelay,
}) {
  const [funcionarios, setFuncionarios] = useState([]);
  const [searchValue, setSearchValue] = useState("");


  const carregarFuncionarios = async (cpf = "") => {
    try {
      const dados = await funcionarioService.getAllFuncionarios(cpf);
      setFuncionarios(dados);
    } catch (error) {
      console.error("Erro ao carregar funcionarios:", error);
    }
  };

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const handleReset = () => {
    carregarFuncionarios();
  };

  const handleDelete = async (matricula) => {
    const confirmarExclusao = window.confirm("Deseja realmente excluir?");
    if (confirmarExclusao) {
      try {
        if (confirmarExclusao) {
          await funcionarioService.deleteFuncionario(matricula);
          await carregarFuncionarios();
          setAlertMessage("Funcionário excluído com sucesso.");
          setAlertType("success");
          clearAlertAfterDelay();
        }
      } catch (error) {
        setAlertMessage("Erro ao excluir funcionário: " + error.message);
        setAlertType("danger");
        clearAlertAfterDelay();
      }
    }
  };

  const handleEdit = (funcionario) => {
    const confirmarAlteracao = window.confirm(
      "Deseja alterar os dados de cadastro?"
    );
    if (confirmarAlteracao) {
      setFuncionarioEditando(funcionario);
      setFuncionarioData(funcionario);
    }
  };

  const handleSearch = async () => {
    try {
      const dados = await funcionarioService.filterFuncionarios({
        termo: searchValue,
      });
      setFuncionarios(dados);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
  };

  return (
    <div className="tabela">
      <div className="row">
        <div className="col-6">
          <div className="form-group borda-form">
            <label htmlFor="pesquisar">
              <i className="bi bi-search"></i> Pesquisar:
            </label>
            <div className="input-group flex-nowrap">
              <input
                type="text"
                className="form-control"
                placeholder="Informe o Nome ou CPF do Funcionário"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div id="pesquisar" className="bpesq">
          <button
            className="btn btn-primary btn-gradient"
            id="pesquisarButton"
            type="button"
            onClick={handleSearch}
          >
            Pesquisar
          </button>
          <button
            className="btn btn-secondary btn-gradient"
            id="resetButton"
            type="button"
            onClick={handleReset}
          >
            Restaurar Tabela
          </button>
        </div>
      </div>
      <table className="table table-hover">
        <thead className="azul">
          <tr>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>Sexo</th>
            <th>Data de Nascimento</th>
            <th>CPF</th>
            <th>RG</th>
            <th>Função</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead >
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr key={funcionario.matricula}>
              <td>{funcionario.matricula}</td>
              <td>{funcionario.nome} <br/> {funcionario.sobrenome}</td>
              <td>{funcionario.sexo}</td>
              <td>{funcionario.dataNascimento}</td>
              <td>{funcionario.cpf}</td>
              <td>{funcionario.rg}</td>
              <td>{funcionario.funcao}</td>
              <td>{funcionario.email}</td>
              <td>{funcionario.telefone}</td>
              <td>{funcionario.rua} <br/> {funcionario.numero} <br/> {funcionario.bairro} <br/> {funcionario.cidade}/{funcionario.estado} <br/> {funcionario.cep}</td>
              <td>
              <button
                  className="btn btn-primary m-2"
                  onClick={() => handleEdit(funcionario)}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>

              </td>
              <td>
                <button
                  className="btn btn-danger m-2"
                  onClick={() => handleDelete(funcionario.matricula)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaFuncionarios;
