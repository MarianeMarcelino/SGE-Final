import React, { useState, useEffect } from "react";
import "./Dados.css";
import ResponsavelService from "../../SERVICES/responsavelService";

const responsavelService = new ResponsavelService();

function Dados({ handleEdit, limparFormulario}) {
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);
  const [responsaveis, setResponsaveis] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  
  const handleDelete = async (cpf) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este responsável?");
    if (confirmDelete) {
      try {
        await responsavelService.deleteResponsavel(cpf);
        buscarResponsaveis();
        limparFormulario();
      } catch (error) {
        console.error("Erro ao deletar responsável:", error);
      }
    }
  };

  function buscarResponsaveis() {
    fetch('http://localhost:3001/responsavel', { method: "GET" })
      .then(resposta => resposta.json())
      .then(retorno => {
        if (retorno.status) {
          setResponsaveis(retorno.listaResponsaveis);
        }
      })
      .catch(erro => {
        setResponsaveis([{
          cpf: 0,
          nome: "Erro ao recuperar responveiss " + erro.message
        }]);
      })
  }

  useEffect(() => {
    buscarResponsaveis();
  }, []);

  const handleFiltrar = async () => {
    try {
      console.log('Input Pesquisar:', searchInput);

      if (!searchInput) {
        console.log('Sem input pesquisar. Carregar todos responsaveiss.');
        buscarResponsaveis();
        return;
      }

      const responsaveisFiltrados = await responsavelService.filtrar({ nome: searchInput });

      if (responsaveisFiltrados.length === 0) {
        setError('Reponsável não encontrado. Verifique o nome e tente novamente.');
        setTimeout(() => {
          setError(null);
        }, 5000);
      } else {
        setResponsaveis(responsaveisFiltrados);
      }
    } catch (error) {
      console.error('Erro ao filtrar responsáveis:', error);
      setError('Erro ao filtrar responsáveis. Tente novamente mais tarde.');
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleRestaurarTabela = () => {
    buscarResponsaveis();
  };

  return (
    <div>
      <div className="row mt-5 row-aligned">
        <div className="col-md-6">
          <div className="form-group borda-form">
            <label htmlFor="pesquisar">
              <i className="bi bi-search"></i> Pesquisar:
            </label>
            <div className="input-group flex-nowrap">
              <input
                type="text"
                className="form-control"
                placeholder="Informe o nome do Responsável"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                name="nome"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 button-container">
          <button
            className="btn btn-primary btn-gradient mr-2"
            type="button"
            onClick={handleFiltrar}
          >
            Pesquisar
          </button>
          <button
            className="btn btn-primary btn-gradient"
            type="button"
            onClick={handleRestaurarTabela}
          >
            Restaurar Tabela
          </button>
        </div>
      </div>

      <div>
        {error && (
          <div className="alert alert-danger ml-4" role="alert">
            {error}
          </div>
        )}
      </div>

      <table className="table table-hover">
        <thead className="azul">
          <tr>
            <th scope="col">CPF</th>
            <th scope="col">Nome</th>
            <th scope="col">Sobrenome</th>
            <th scope="col">RG</th>
            <th scope="col">Telefone</th>
            <th scope="col">Email</th>
            <th scope="col">Editar</th>
            <th scope="col">Excluir</th>
          </tr>
        </thead>
        <tbody>
        {responsaveis.map((resp) => (
                    <tr key={resp.cpf}>
                      <td className="texto">{resp.cpf}</td>
                      <td className="texto">{resp.nome}</td>
                      <td className="texto">{resp.sobrenome}</td>
                      <td className="texto">{resp.rg}</td>
                      <td className="texto">{resp.telefone}</td>
                      <td className="texto">{resp.email}</td>
                      <td>
                        <div className="centraliza">
                          <button className="btn btn-primary m-2" onClick={() => { handleEdit(resp) }}>
                            <i class="bi bi-pencil-square"></i>{" "}
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="centraliza">
                          <button className="btn btn-danger m-2" onClick={() => { handleDelete(resp.cpf) }}>
                            <i class="bi bi-trash"></i>{" "}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dados;