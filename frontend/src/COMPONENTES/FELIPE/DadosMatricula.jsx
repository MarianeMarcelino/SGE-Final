import "./Dados.css";
import MatriculaService from '../../SERVICES/matriculaService.js';
import { useState, useEffect } from 'react';
import MatricularAluno from "./MatricularAluno.jsx";

const matriculaService = new MatriculaService();

function DadosMatricula({ isMenuExpanded }) {
  const [matriculas, setMatriculas] = useState([]);
  const [selectedMatricula, setSelectedMatricula] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [alunos, setAlunos] = useState(
    [{
      cpf: 0,
      nome: "Nenhum aluno encontrado"
    }]
  );
  const [turmas, setTurmas] = useState(
    [{
      codigo: 0,
      serie: "Nenhuma turma encontrada"
    }]
  );

  function buscarAlunos() {
    fetch('http://localhost:3001/aluno', { method: "GET" })
      .then(resposta => resposta.json())
      .then(retorno => {
        if (retorno.status) {
          if (retorno.listaAlunos !== undefined) {
            setAlunos(retorno.listaAlunos);
          } else {
            console.error("Lista de professores não foi encontrada na resposta do servidor.");
          }
        } else {
          console.error("Erro ao buscar professores:", retorno.error);
        }
      })
      .catch(erro => {
        console.error("Erro ao buscar professores:", erro.message);
        setAlunos([{
          cpf_aluno: 0,
          nome_aluno: "Erro ao recuperar professores " + erro.message
        }]);
      })
  }

  function buscarTurmas() {
    fetch('http://localhost:3001/turma', { method: "GET" })
      .then(resposta => resposta.json())
      .then(retorno => {
        if (retorno.status) {
          if (retorno.listaTurmas !== undefined) {
            setTurmas(retorno.listaTurmas);
          } else {
            console.error("Lista de professores não foi encontrada na resposta do servidor.");
          }
        } else {
          console.error("Erro ao buscar professores:", retorno.error);
        }
      })
      .catch(erro => {
        console.error("Erro ao buscar professores:", erro.message);
        setTurmas([{
          codigo_turma: 0,
          serie: "Erro ao recuperar professores " + erro.message
        }]);
      })
  }
  // buscar professores ao iniciar o componente (uma unica vez)
  useEffect(() => {
    buscarAlunos();
    buscarTurmas();
  }, []); //didMount do React


  // Função para restaurar a tabela de matrículas
  const handleRestaurarTabela = async () => {
    setSearchInput(''); // Limpar o campo de pesquisa
    // Recarregar todas as matrículas
    buscarMatriculas();
  };


  function buscarMatriculas() {
    fetch('http://localhost:3001/matricula', { method: "GET" })
      .then(resposta => resposta.json())
      .then(retorno => {
        if (retorno.status) {
          setMatriculas(retorno.listaMatriculas);
        }
      })
      .catch(erro => {
        setMatriculas([{
          cpf_aluno: 0,
          codigo_turma: "Erro ao recuperar matriculas " + erro.message
        }]);
      })
  }

  // buscar professores ao iniciar o componente (uma unica vez)
  useEffect(() => {
    buscarMatriculas()
  }, []); //didMount do React

  
  
  const handleDelete = async (cpf) => {
    const confirmarExclusao = window.confirm("Deseja realmente excluir?");
    if (confirmarExclusao) {
      await matriculaService.deleteMatricula(cpf);
      buscarMatriculas();
      setSuccessMessage('Matricula excluída com sucesso!');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  };


  const handleFiltrar = async () => {
    try {
      console.log('Input Pesquisar:', searchInput);

      if (!searchInput) {
        console.log('Sem input pesquisar. Carregar todos alunos.');
        buscarMatriculas();
        return;
      }

      const matriculasFiltradas = await matriculaService.filtrar({ cpf: searchInput });

      if (matriculasFiltradas.length === 0) {
        setError('Aluno não encontrado. Verifique o cpf e tente novamente.');
        setTimeout(() => {
          setError(null);
        }, 5000);
      } else {
        setMatriculas(matriculasFiltradas);
      }
    } catch (error) {
      console.error('Erro ao filtrar matriculas:', error);
      setError('Erro ao filtrar matriculas. Tente novamente mais tarde.');
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleSave = async () => { 
      buscarMatriculas();
  };

  return (
    <div id="formularioAluno" className={isMenuExpanded ? "expanded" : ""}>
      <div className="main--content">
        <div className="form--wrapper">
          <MatricularAluno selectedMatricula={selectedMatricula} onSave={handleSave}></MatricularAluno>
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
                    placeholder="Informe o nome ou cpf do aluno"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                    name="cpf"
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
            {matriculas.length === 0 ? (
              <div className="alert alert-danger ml-4 text-center mx-auto" role="alert">
                ERRO: Não foi possível buscar a lista de matrículas no backend!
              </div>

            ) : (
              <table className="table table-hover">
                <thead class="azul">
                  <tr>
                  <th scope="col">CPF</th>
                    <th scope="col">Aluno</th>
                    <th scope="col">Turma</th>
                    <th scope="col">Excluir</th>
                  </tr>
                </thead>
                <tbody>
                  {matriculas.map((matricula) => (
                    <tr key={matricula.cpf_aluno}>
                      <td className="texto">{matricula.cpf_aluno}</td>
                      <td className="texto">
                        {alunos.find((aluno) => aluno.cpf === matricula.cpf_aluno)?.nome + ' ' + alunos.find((aluno) => aluno.cpf === matricula.cpf_aluno)?.sobrenome}
                      </td>
                      <td className="texto">
                        {turmas.find((turma) => turma.codigo === matricula.codigo_turma)?.serie + ' ' + turmas.find((turma) => turma.codigo === matricula.codigo_turma)?.turma}
                      </td>
                      <td>
                        <div className="centraliza">
                          <button className="btn btn-danger m-2" onClick={() => { handleDelete(matricula.cpf_aluno) }}>
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

export default DadosMatricula;