import "./Dados.css";
import TurmaService from '../../SERVICES/turmaService.js';
import { useState, useEffect } from 'react';
import CadastroTurma from "./cadastroTurma.jsx";

const turmaService = new TurmaService();

function DadosTurma({ isMenuExpanded }) {
  const [turmas, setTurmas] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [professores, setProfessores] = useState(
    [{
      id_professor: 0,
      nome_professor: "Nenhum professor encontrado"
    }]
  );

  function buscarTurmas() {
    fetch('http://localhost:3001/turma', { method: "GET" })
      .then(resposta => resposta.json())
      .then(retorno => {
        if (retorno.status) {
          setTurmas(retorno.listaTurmas);
        }
      })
      .catch(erro => {
        setTurmas([{
          codigo: 0,
          serie: "Erro ao recuperar turmas " + erro.message
        }]);
      })
  }

  // buscar professores ao iniciar o componente (uma unica vez)
  useEffect(() => {
    buscarTurmas();
  }, []); //didMount do React

  
  useEffect(() => {
    buscarProfessores();
  }, []);
  
  const handleSave = async () => { 
    buscarTurmas();
  };


  const handleDelete = async (codigo) => {
    const confirmarExclusao = window.confirm("Deseja realmente excluir?");
    if (confirmarExclusao) {
      await turmaService.deleteTurma(codigo);
      buscarTurmas();
      setSuccessMessage('Turma excluída com sucesso!');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  };

  const handleEdit = async (turma) => {
    setSelectedTurma(turma);
  };

  const handleRestaurarTabela = async () => {
    buscarTurmas();
  }

  const handleFiltrar = async () => {
    try {

      const turmasFiltradas = await turmaService.filtrar({ nome: searchInput });

      if (turmasFiltradas.length === 0) {
        setError('Turma não encontrada. Verifique o nome do professor e tente novamente.');
        setTimeout(() => {
          setError(null);
        }, 5000);
      } else {
        setTurmas(turmasFiltradas);
      }
    } catch (error) {
      console.error('Erro ao filtrar turmas:', error);
      setError('Erro ao filtrar turmas. Tente novamente mais tarde.' + error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  function buscarTurmas() {
    fetch('http://localhost:3001/turma', { method: "GET" })
      .then(resposta => resposta.json())
      .then(retorno => {
        if (retorno.status) {
          setTurmas(retorno.listaTurmas);
        }
      })
      .catch(erro => {
        setTurmas([{
          codigo: 0,
          serie: "Erro ao recuperar turmas " + erro.message
        }]);
      })
  }

  function buscarProfessores() {
    fetch('http://localhost:3001/professor', { method: "GET" })
      .then(resposta => resposta.json())
      .then(retorno => {
        if (retorno.status) {
          setProfessores(retorno.listaProfessores);
        }
      })
      .catch(erro => {
        setProfessores([{
          id_professor: 0,
          nome_professor: "Erro ao recuperar professores " + erro.message
        }]);
      })
  }

  // buscar professores ao iniciar o componente (uma unica vez)
  useEffect(() => {
    buscarTurmas();
    buscarProfessores();
  }, []); //didMount do React

  return (
    <div id="formularioAluno" className={isMenuExpanded ? "expanded" : ""}>
      <div className="main--content">
        <div className="form--wrapper">
          <CadastroTurma selectedTurma={selectedTurma} onSave={handleSave}></CadastroTurma>
          <div id='mensagem'>
            {successMessage && (
              <div className="alert alert-success" role="alert">
                <div className='centraliza'>
                  {successMessage}
                </div>
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group borda-form mt-5">
                <label htmlFor="pesquisar">
                  <i className="bi bi-search"></i> Pesquisar:
                </label>
                <div className="input-group flex-nowrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Informe o nome do professor"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                    name="nome"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div id='pesquisar'>
              <button
                className="btn btn-primary btn-gradient"
                id="pesquisar"
                type="button"
                onClick={handleFiltrar}
              >
                Pesquisar
              </button>
            </div>
            <div id='restaurar'>
              <button
                className="btn btn-primary btn-gradient"
                id="pesquisar"
                type="restaurar"
                onClick={handleRestaurarTabela}
              >
                Restaurar Tabela
              </button>
            </div>
            {error && <div className="alert alert-danger ml-4" role="alert">{error}</div>}
            {turmas.length === 0 ? (
              <div className="alert alert-danger ml-4 text-center mx-auto" role="alert">
                ERRO: Não foi possível buscar a lista de turmas no backend!
              </div>

            ) : (
              <table className="table table-hover">
                <thead class="azul">
                  <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Série</th>
                    <th scope="col">Turma</th>
                    <th scope="col">Período</th>
                    <th scope="col">Professor</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Excluir</th>
                  </tr>
                </thead>
                <tbody>
                  {turmas.map((turma) => (
                    <tr key={turma.codigo}>
                      <td className="texto">{turma.codigo}</td>
                      <td className="texto">{turma.serie}</td>
                      <td className="texto">{turma.turma}</td>
                      <td className="texto">{turma.periodo}</td>
                      <td className="texto">
                        {professores.find((professor) => professor.id_professor === turma.id_professor)?.nome_professor}
                      </td>
                      <td>
                        <div className="centraliza">
                          <button className="btn btn-primary m-2" onClick={() => { handleEdit(turma) }}>
                            <i class="bi bi-pencil-square"></i>{" "}
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="centraliza">
                          <button className="btn btn-danger m-2" onClick={() => { handleDelete(turma.codigo) }}>
                            <i class="bi bi-trash"></i>{" "}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DadosTurma;