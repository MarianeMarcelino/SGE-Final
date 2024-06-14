import "./Dados.css";
import MatriculaService from '../../SERVICES/matriculaService.js';
import { useState, useEffect } from 'react';
import MatricularAluno from "./RemanejarAluno.jsx";

const matriculaService = new MatriculaService();

function DadosRemanejar({ isMenuExpanded }) {
  const [matriculas, setMatriculas] = useState([]);
  const [selectedMatricula, setSelectedMatricula] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [alunos, setAlunos] = useState([{ cpf: 0, nome: "Nenhum aluno encontrado" }]);
  const [turmas, setTurmas] = useState([{ codigo: 0, serie: "Nenhuma turma encontrada" }]);

  useEffect(() => {
    fetchData('http://localhost:3001/aluno', setAlunos, 'alunos');
    fetchData('http://localhost:3001/turma', setTurmas, 'turmas');
    fetchMatriculas();
  }, []);

  const fetchData = async (url, setter, entity) => {
    try {
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      if (data.status && data[`lista${entity.charAt(0).toUpperCase() + entity.slice(1)}`] !== undefined) {
        setter(data[`lista${entity.charAt(0).toUpperCase() + entity.slice(1)}`]);
      } else {
        console.error(`Erro ao buscar ${entity}:`, data.error);
      }
    } catch (error) {
      console.error(`Erro ao buscar ${entity}:`, error.message);
      setter([{
        [`cpf_${entity}`]: 0,
        [`nome_${entity}`]: `Erro ao recuperar ${entity} ${error.message}`
      }]);
    }
  };

  const fetchMatriculas = async () => {
    try {
      const response = await fetch('http://localhost:3001/matricula', { method: "GET" });
      const data = await response.json();
      if (data.status) {
        setMatriculas(data.listaMatriculas);
      }
    } catch (error) {
      setMatriculas([{
        cpf_aluno: 0,
        codigo_turma: `Erro ao recuperar matriculas ${error.message}`
      }]);
    }
  };

  const handleEdit = (matricula) => {
    setSelectedMatricula(matricula);
  };

  return (
    <div id="formularioAluno" className={isMenuExpanded ? "expanded" : ""}>
      <div className="main--content">
        <div className="form--wrapper">
          <MatricularAluno selectedMatricula={selectedMatricula} onSave={fetchMatriculas} />
          <div id='mensagem'>
            {successMessage && (
              <div className="alert alert-success" role="alert">
                <div className='centraliza'>{successMessage}</div>
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group borda-form mt-5">
                <div className="input-group flex-nowrap"></div>
              </div>
            </div>
            <div id='pesquisar'></div>
            <div id='restaurar'></div>
            {error && <div className="alert alert-danger ml-4" role="alert">{error}</div>}
            {matriculas.length === 0 ? (
              <div className="alert alert-danger ml-4 text-center mx-auto" role="alert">
                ERRO: Não foi possível buscar a lista de matrículas no backend!
              </div>
            ) : (
              <table className="table table-hover">
                <thead className="azul">
                  <tr>
                    <th scope="col">CPF</th>
                    <th scope="col">Turma</th>
                    <th scope="col">Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {matriculas.map((matricula) => (
                    <tr key={matricula.cpf_aluno}>
                      <td className="texto">
                        {alunos.find((aluno) => aluno.cpf === matricula.cpf_aluno)?.nome + ' ' + alunos.find((aluno) => aluno.cpf === matricula.cpf_aluno)?.sobrenome}
                      </td>
                      <td className="texto">
                        {turmas.find((turma) => turma.codigo === matricula.codigo_turma)?.serie + ' ' + turmas.find((turma) => turma.codigo === matricula.codigo_turma)?.turma}
                      </td>
                      <td>
                        <div className="centraliza">
                          <button className="btn btn-primary m-2" onClick={() => handleEdit(matricula)}>
                            <i className="bi bi-pencil-square"></i>{" "}
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

export default DadosRemanejar;
