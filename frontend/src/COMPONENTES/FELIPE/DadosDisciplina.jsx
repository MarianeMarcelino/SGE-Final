import "./Dados.css";
import DisciplinaService from '../../SERVICES/disciplinaService.js';
import { useState, useEffect } from 'react';
import CadastroDisciplina from "./CadastroDisciplina.jsx";

const disciplinaService = new DisciplinaService();

function DadosDisciplina({ isMenuExpanded }) {
  const [disciplinas, setDisciplinas] = useState([]);
  const [selectedDisciplina, setSelectedDisciplina] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);


  const carregaDisciplinas = async () => {
    try {
      const dados = await disciplinaService.getAllDisciplina();
      setDisciplinas(dados);
    } catch (error) {
      alert('Erro ao carregar disciplinas' + error);
    }
  };

  useEffect(() => {
    carregaDisciplinas();
  }, []);

  const handleDelete = async (codigo) => {
    const confirmarExclusao = window.confirm("Deseja realmente excluir?");
    if (confirmarExclusao) {
      await disciplinaService.deleteDisciplina(codigo);
      await carregaDisciplinas();
      setSuccessMessage('Disciplina excluída com sucesso!');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  };

  const handleEdit = async (disciplina) => {
    setSelectedDisciplina(disciplina);
  };

  const handleRestaurarTabela = async () => {
    await carregaDisciplinas();
  }

  const handleSave = async (disciplina) => {
    try {
      if (selectedDisciplina === null) {
        await disciplinaService.createDisciplina(disciplina);
        carregaDisciplinas();
      } else {
        await disciplinaService.updateDisciplina(selectedDisciplina.codigo, disciplina);
      }
      await carregaDisciplinas();
      setSelectedDisciplina(null);
    } catch (error) {
      console.error('Erro ao salvar disciplina:', error);
    }
  };

  const handleFiltrar = async () => {
    try {
      
      const disciplinasFiltradas = await disciplinaService.filtrar({ codigo: searchInput });

      if (disciplinasFiltradas.length === 0) {
        setError('Disciplina não encontrada. Verifique o código e tente novamente.');
        setTimeout(() => {
          setError(null);
        }, 5000);
      } else {
        setDisciplinas(disciplinasFiltradas);
      }
    } catch (error) {
      console.error('Erro ao filtrar disciplinas:', error);
      setError('Erro ao filtrar disciplinas. Tente novamente mais tarde.' + error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div id="formularioAluno" className={isMenuExpanded ? "expanded" : ""}>
      <div className="main--content">
        <div className="form--wrapper">
          <CadastroDisciplina selectedDisciplina={selectedDisciplina} onSave={handleSave}></CadastroDisciplina>
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
                    placeholder="Informe o código da Disciplina"
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

            <div>
              {error && (
                <div className="alert alert-danger ml-4" role="alert">
                  {error}
                </div>
              )}
            </div>

            <table class="table table-hover">
              <thead class="azul">
                <tr>
                  <th scope="col">Código</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Excluir</th>
                </tr>
              </thead>
              <tbody>
                {disciplinas.map((disciplina) => (
                  <tr key={disciplina.codigo}>
                    <td className="texto">{disciplina.codigo}</td>
                    <td className="texto">{disciplina.nome}</td>
                    <td>
                      <div className="centraliza">
                        <button className="btn btn-primary m-2" onClick={() => { handleEdit(disciplina) }}>
                          <i class="bi bi-pencil-square"></i>{" "}
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="centraliza">
                        <button className="btn btn-danger m-2" onClick={() => { handleDelete(disciplina.codigo) }}>
                          <i class="bi bi-trash"></i>{" "}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DadosDisciplina;
