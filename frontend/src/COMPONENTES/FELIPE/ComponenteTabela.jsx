import AlunoService from '../../SERVICES/alunoService';
import './ComponenteTabela.css';
import { useState, useEffect } from 'react';
import ComponenteFormularioAluno from './ComponenteFormularioAluno';

const alunoService = new AlunoService();

function ComponenteTabela({ isMenuExpanded }) {
  const [alunos, setAlunos] = useState([]);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  function buscarAlunos() {
    fetch('http://localhost:3001/aluno', { method: "GET" })
      .then(resposta => resposta.json())
      .then(retorno => {
        if (retorno.status) {
          setAlunos(retorno.listaAlunos);
        }
      })
      .catch(erro => {
        setAlunos([{
          cpf: 0,
          nome: "Erro ao recuperar alunos " + erro.message
        }]);
      })
  }

  useEffect(() => {
    buscarAlunos();
  }, []);

  const handleDelete = async (cpf) => {
    const confirmarExclusao = window.confirm("Deseja realmente excluir?");
    if (confirmarExclusao) {
      await alunoService.deleteAluno(cpf);
      buscarAlunos();
      setSuccessMessage('Aluno excluído com sucesso!');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  };

  const handleEdit = async (aluno) => {
    setSelectedAluno(aluno);
  };

  const handleRestaurarTabela = async () => {
    buscarAlunos();
  }

  const handleSave = async () => {
    buscarAlunos();
  };

  const handleFiltrar = async () => {
    try {
      console.log('Input Pesquisar:', searchInput);

      if (!searchInput) {
        console.log('Sem input pesquisar. Carregar todos alunos.');
        buscarAlunos();
        return;
      }

      const alunosFiltrados = await alunoService.filtrar({ nome: searchInput });

      if (alunosFiltrados.length === 0) {
        setError('Aluno não encontrado. Verifique o nome e tente novamente.');
        setTimeout(() => {
          setError(null);
        }, 5000);
      } else {
        setAlunos(alunosFiltrados);
      }
    } catch (error) {
      console.error('Erro ao filtrar alunos:', error);
      setError('Erro ao filtrar alunos. Tente novamente mais tarde.');
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };


  return (
    <div id="formularioAluno" className={isMenuExpanded ? "expanded" : ""}>
      <div className="main--content">
        <div className="form--wrapper">
          <ComponenteFormularioAluno selectedAluno={selectedAluno} onSave={handleSave} />
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
                    placeholder="Informe o nome do Aluno"
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
            {alunos.length === 0 ? (
              <div className="alert alert-danger ml-4 text-center mx-auto" role="alert">
                ERRO: Não foi possível buscar a lista de alunos no backend!
              </div>

            ) : (
              <table className="table table-hover">
                <thead class="azul">
                  <tr>
                    <th scope="col">CPF</th>
                    <th scope="col">RG</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Data de Nascimento</th>
                    <th scope="col">Sexo</th>
                    <th scope="col">Endereço</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Excluir</th>
                  </tr>
                </thead>
                <tbody>
                  {alunos.map((aluno) => (
                    <tr key={aluno.cpf}>
                      <td className="texto">{aluno.cpf}</td>
                      <td className="texto">{aluno.rg}</td>
                      <td className="texto">{aluno.nome} {aluno.sobrenome}</td>
                      <td className="texto">{aluno.dataNascimento}</td>
                      <td className="texto">{aluno.sexo}</td>
                      <td className="texto">{aluno.endereco} <br /> {aluno.bairro} <br /> {aluno.cidade}/{aluno.estado} <br /> {aluno.cep}</td>
                      <td className="texto">{aluno.telefone}</td>
                      <td className="texto">{aluno.email}</td>
                      <td>
                        <div className="centraliza">
                          <button className="btn btn-primary m-2" onClick={() => { handleEdit(aluno) }}>
                            <i class="bi bi-pencil-square"></i>{" "}
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="centraliza">
                          <button className="btn btn-danger m-2" onClick={() => { handleDelete(aluno.cpf) }}>
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

export default ComponenteTabela;

