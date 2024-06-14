import React, { useState, useEffect } from "react";
import "./Dados.css";
import NotaService from "../../SERVICES/notaServices";

const notaService = new NotaService();

function DadosNota({ handleEdit, onNotaDeleted }) {
  const [notas, setNotas] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchNotas();
  }, []);

  const fetchNotas = async () => {
    try {
      const turmas = await notaService.getTurmas();
      const disciplinas = await notaService.getDisciplinas();
      const alunos = await notaService.getAlunos();
      const notasRaw = await notaService.getAllNota();
      const enrichedNotas = notasRaw.map(nota => ({
        ...nota,
        nome_turma: `${turmas.find(t => t.codigo === nota.codigo_turma)?.serie} ${turmas.find(t => t.codigo === nota.codigo_turma)?.turma}`,
        nome_disciplina: disciplinas.find(d => d.codigo === nota.codigo_disciplina)?.nome,
        nome_aluno: `${alunos.find(a => a.cpf === nota.cpf_aluno)?.nome} ${alunos.find(a => a.cpf === nota.cpf_aluno)?.sobrenome}`,
      }));
      setNotas(enrichedNotas);
    } catch (error) {
      console.error("Erro ao carregar notas:", error);
      setError("Falha ao carregar notas.");
    }
  };

  const handleDelete = async (id_nota) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta Nota e Falta?");
    if (confirmDelete) {
      try {
        await notaService.deleteNota(id_nota);
        setSuccessMessage("Nota excluída com sucesso!");
        setTimeout(() => setSuccessMessage(null), 5000);
        setNotas(notas.filter(nota => nota.id_nota !== id_nota));
        onNotaDeleted();
      } catch (error) {
        console.error("Erro ao deletar Notas e Faltas:", error);
        setErrorMessage("Falha ao deletar nota.");
        setTimeout(() => setErrorMessage(null), 5000);
      }
    }
  };

  const handleFiltrar = () => {
    if (!searchInput) {
      fetchNotas();
      return;
    }
    const filteredNotas = notas.filter(nota =>
      `${nota.nome_aluno}`.toLowerCase().includes(searchInput.toLowerCase())
    );
    if (filteredNotas.length === 0) {
      setError("Aluno não encontrado. Verifique o nome e tente novamente.");
      setTimeout(() => setError(null), 5000);
    } else {
      setNotas(filteredNotas);
    }
  };

  const handleRestaurarTabela = () => {
    fetchNotas();
  };

  return (
    <div>
      <div className="row mt-5 row-aligned">
        <div className="col-md-6">
          <div className="form-group borda-form">
            <label htmlFor="pesquisar">
              <i className="bi bi-search"></i> Pesquisar:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Informe o nome do aluno"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
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

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <table className="table table-hover">
        <thead className="azul">
          <tr>
            <th scope="col">Turma</th>
            <th scope="col">Disciplina</th>
            <th scope="col">Bimestre</th>
            <th scope="col">Aluno</th>
            <th scope="col">Nota</th>
            <th scope="col">Faltas</th>
            <th scope="col">Editar</th>
            <th scope="col">Excluir</th>
          </tr>
        </thead>
        <tbody>
          {notas.map(nota => (
            <tr key={nota.id_nota}>
              <td>{nota.nome_turma}</td>
              <td>{nota.nome_disciplina}</td>
              <td>{nota.bimestre}</td>
              <td>{nota.nome_aluno}</td>
              <td>{nota.nota}</td>
              <td>{nota.falta}</td>
              <td>
                <button className="btn btn-primary m-2" onClick={() => handleEdit(nota)}>
                  <i className="bi bi-pencil-square"></i>
                </button>
              </td>
              <td>
                <button className="btn btn-danger m-2" onClick={() => handleDelete(nota.id_nota)}>
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

export default DadosNota;
