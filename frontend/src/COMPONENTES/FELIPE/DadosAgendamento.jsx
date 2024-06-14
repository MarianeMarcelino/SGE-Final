import "./Dados.css";
import AgendarReuniao from "./AgendarReuniao.jsx";
import AgendamentoService from '../../SERVICES/agendamentoService.js';
import { useState, useEffect } from 'react';

const agendamentoService = new AgendamentoService();

function DadosAgendamento({ isMenuExpanded }) {
  const [agendas, setAgendas] = useState([]);
  const [selectedAgenda, setSelectedAgenda] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [responsaveis, setResponsaveis] = useState(
    [{
      cpf: 0,
      nome: "Nenhum responsável encontrado"
    }]
  );


  function buscarResponsaveis() {
    fetch('http://localhost:3001/aluno', { method: "GET" })
      .then(resposta => resposta.json())
      .then(retorno => {
        if (retorno.status) {
          if (retorno.listaResponsaveis !== undefined) {
            setResponsaveis(retorno.listaResponsaveis);
          } else {
            console.error("Lista de professores não foi encontrada na resposta do servidor.");
          }
        } else {
          console.error("Erro ao buscar professores:", retorno.error);
        }
      })
      .catch(erro => {
        console.error("Erro ao buscar professores:", erro.message);
        setResponsaveis([{
          cpf: 0,
          nome: "Erro ao recuperar professores " + erro.message
        }]);
      })
  }


  function buscarAgendas() {
    fetch('http://localhost:3001/agendamento', { method: "GET" })
      .then(resposta => resposta.json())
      .then(retorno => {
        if (retorno.status) {
          setAgendas(retorno.listaAgendas);
        }
      })
      .catch(erro => {
        setAgendas([{
          responsavel: 0,
          professor: "Erro ao recuperar matriculas " + erro.message
        }]);
      })
  }

  // buscar professores ao iniciar o componente (uma unica vez)
  useEffect(() => {
    buscarAgendas()
    buscarResponsaveis()
  }, []); //didMount do React

  const handleDelete = async (codigo) => {
    const confirmarExclusao = window.confirm("Deseja realmente excluir?");
    if (confirmarExclusao) {
      await agendamentoService.deleteAgenda(codigo);
      buscarAgendas()
      setSuccessMessage('Agenda excluída com sucesso!');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  };

  

  const handleRestaurarTabela = async () => {
    buscarAgendas();
  }

  const handleFiltrar = async () => {
    try {
      
      const agendasFiltradas = await agendamentoService.filtrar({ nome: searchInput });

      if (agendasFiltradas.length === 0) {
        setError('Agenda não encontrada. Verifique o nome do professor e tente novamente.');
        setTimeout(() => {
          setError(null);
        }, 5000);
      } else {
        setAgendas(agendasFiltradas);
      }
    } catch (error) {
      console.error('Erro ao filtrar agendas:', error);
      setError('Erro ao filtrar agendas. Tente novamente mais tarde.' + error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleSave = async () => { 
    buscarAgendas();
};

  return (
    <div id="formularioAluno" className={isMenuExpanded ? "expanded" : ""}>
      <div className="main--content">
        <div className="form--wrapper">
        <AgendarReuniao selectedAgenda={selectedAgenda} onSave={handleSave}></AgendarReuniao>
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
     
            <table class="table table-hover">
              <thead class="azul">
                <tr>
                  <th scope="col">Código</th>
                  <th scope="col">Responsável</th>
                  <th scope="col">Professor</th>
                  <th scope="col">Data</th>
                  <th scope="col">Hora</th>
                  <th scope="col">Excluir</th>
                </tr>
              </thead>
              <tbody>
              {agendas.map((agenda) => (
                  <tr key={agenda.codigo}>
                    <td className="texto">{agenda.codigo}</td>
                    <td className="texto">{agenda.responsavel}</td>
                    <td className="texto">{agenda.professor}</td>
                    <td className="texto">{new Date(agenda.dia + 'T00:00:00').toLocaleDateString()}</td>
                    <td className="texto">{agenda.hora}</td>
                    <td>
                      <div className="centraliza">
                        <button className="btn btn-danger m-2" onClick={() => { handleDelete(agenda.codigo) }}>
                          <i class="bi bi-trash"></i>{" "}
                        </button>
                      </div>
                    </td>
                    {/* Adicione mais células conforme necessário */}
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

export default DadosAgendamento;
