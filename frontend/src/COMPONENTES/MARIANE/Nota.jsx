import React, { useState, useEffect } from "react";
import "./CadastroResponsavel.css";
import NotaService from "../../SERVICES/notaServices";
import DadosNota from "./DadosNota";


const notaService = new NotaService();

function Nota({ isMenuExpanded }) {
  const [turmas, setTurmas] = useState([]);

  const [disciplinas, setDisciplinas] = useState([]);
  const [bimestres] = useState([
    "1º Bimestre",
    "2º Bimestre",
    "3º Bimestre",
    "4º Bimestre",
  ]);
  const [alunos, setAlunos] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState("");
  const [selectedDisciplina, setSelectedDisciplina] = useState("");
  const [selectedBimestre, setSelectedBimestre] = useState("");
  const [alunoNotas, setAlunoNotas] = useState([
    { cpf_aluno: "", nota: "", falta: "" },
  ]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const disciplinas = await notaService.getDisciplinas();
        setDisciplinas(disciplinas);
      } catch (error) {
        console.error("Erro ao carregar disciplinas:", error);
      }
    };
    fetchDisciplinas();
  }, []);

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const turmas = await notaService.getTurmas();
        console.log(turmas); // Verifique os dados recebidos aqui
        setTurmas(turmas);
      } catch (error) {
        console.error("Erro ao carregar turmas:", error);
      }
    };
    fetchTurmas();
  }, []);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const alunos = await notaService.getAlunos();
        console.log(alunos); // Verifique os dados recebidos aqui
        setAlunos(alunos);
      } catch (error) {
        console.error("Erro ao carregar Alunos:", error);
      }
    };
    fetchAlunos();
  }, []);


  const handleAddAlunoNota = () => {
    setAlunoNotas([...alunoNotas, { cpf_aluno: "", nota: "", falta: "" }]);
  };

  const handleRemoveAlunoNota = (index) => {
    const newAlunoNotas = [...alunoNotas];
    newAlunoNotas.splice(index, 1);
    setAlunoNotas(newAlunoNotas);
  };

  const handleAlunoNotaChange = (index, field, value) => {
    const newAlunoNotas = [...alunoNotas];
    newAlunoNotas[index][field] = value;
    setAlunoNotas(newAlunoNotas);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (alunoNotas.some(nota => !nota.cpf_aluno || !nota.nota || !nota.falta)) {
      setErrorMessage("Todos os campos devem ser preenchidos para cada aluno.");
      return;
    }
    try {
      const notaDataArray = alunoNotas.map(nota => ({
        codigo_turma: selectedTurma,
        cpf_aluno: nota.cpf_aluno,
        codigo_disciplina: selectedDisciplina,
        bimestre: selectedBimestre,
        nota: nota.nota,
        falta: nota.falta,
      }));
  
      for (let notaData of notaDataArray) {
        if (notaEditavel) {
          await notaService.updateNota(notaEditavel.id_nota, notaData); // Use o ID para atualizar
        } else {
          await notaService.createNota(notaData);
        }
      }
  
      setSuccessMessage(notaEditavel ? "Nota atualizada com sucesso!" : "Notas e Faltas cadastradas com sucesso!");
      limparFormulario();
    } catch (error) {
      setErrorMessage(`Erro ao salvar notas e faltas: ${error.message}`);
    }
  };
  
  const limparFormulario = () => {
    setSelectedTurma("");
    setSelectedDisciplina("");
    setSelectedBimestre("");
    setAlunoNotas([{ cpf_aluno: "", nota: "", falta: "" }]);
    setNotaEditavel(null);
  };
  
  const [notaEditavel, setNotaEditavel] = useState(null);

  const handleEdit = (nota) => {
    console.log("Editando nota:", nota);
    setNotaEditavel(nota);  // Supõe-se que você define a nota atualmente editável
    // Aqui você também pode abrir um modal ou mudar para um formulário de edição
  };

  useEffect(() => {
    if (notaEditavel) {
      setSelectedTurma(notaEditavel.codigo_turma);
      setSelectedDisciplina(notaEditavel.codigo_disciplina);
      setSelectedBimestre(notaEditavel.bimestre);
      setAlunoNotas([{ 
        cpf_aluno: notaEditavel.cpf_aluno, 
        nota: notaEditavel.nota, 
        falta: notaEditavel.falta 
      }]);
    }
  }, [notaEditavel]);
  
  const [notas, setNotas] = useState([]);

  // Função para carregar notas
  const fetchNotas = async () => {
    const fetchedNotas = await notaService.getAllNota();
    setNotas(fetchedNotas);
  };

  // Função chamada após uma nota ser deletada
  const onNotaDeleted = () => {
    fetchNotas();  // Recarrega as notas
  };

  useEffect(() => {
    fetchNotas();
  }, []);

  return (
    <div
      id="formularioResponsavel"
      className={isMenuExpanded ? "expanded" : ""}
    >
      <div className="main--content">
        <div className="form--wrapper">
          <div className="section-title text-center position-relative pb-3 mb-5 mx-auto">
            <h3 className="fw-bold text-uppercase">
              <i className="bi bi-journal-check icone"></i> NOTAS E FALTAS
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group borda-form">
                  <label htmlFor="turma">
                    <i className="bi bi-building"></i> Turma:
                  </label>
                  <select
                    id="turma"
                    name="turma"
                    className="form-control form-control-sm"
                    value={selectedTurma}
                    onChange={(e) => setSelectedTurma(e.target.value)}
                  >
                    <option value="">Selecione a turma</option>
                    {turmas.map((turma) => (
                      <option key={turma.codigo} value={turma.codigo}>
                        {turma.serie} {turma.turma} - {turma.periodo}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group borda-form">
                  <label htmlFor="disciplina">
                    <i className="bi bi-journal-bookmark"></i> Disciplina:
                  </label>
                  <select
                    id="disciplina"
                    name="disciplina"
                    className="form-control form-control-sm"
                    value={selectedDisciplina}
                    onChange={(e) => setSelectedDisciplina(e.target.value)}
                  >
                    <option value="">Selecione a disciplina</option>
                    {disciplinas.map((disciplina) => (
                      <option key={disciplina.codigo} value={disciplina.codigo}>
                        {disciplina.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="form-group borda-form">
                  <label htmlFor="bimestre">
                    <i className="bi bi-calendar4-week"></i> Bimestre:
                  </label>
                  <select
                    id="bimestre"
                    name="bimestre"
                    className="form-control form-control-sm"
                    value={selectedBimestre}
                    onChange={(e) => setSelectedBimestre(e.target.value)}
                  >
                    <option value="">Selecione o bimestre</option>
                    {bimestres.map((bimestre) => (
                      <option key={bimestre} value={bimestre}>
                        {bimestre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {alunoNotas.map((item, index) => (
              <div className="row align-items-center" key={index}>
                <div className="col-4">
                  <div className="form-group borda-form">
                    <label htmlFor={`aluno-${index}`}>
                      <i className="bi bi-person-lines-fill"></i> Aluno:
                    </label>
                    <select
                      id={`aluno-${index}`}
                      name="aluno"
                      className="form-control form-control-sm"
                      value={item.cpf_aluno}
                      onChange={(e) =>
                        handleAlunoNotaChange(
                          index,
                          "cpf_aluno",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Selecione o aluno</option>
                      {alunos.map((aluno) => (
                        <option key={aluno.cpf} value={aluno.cpf}>
                          {aluno.nome} {aluno.sobrenome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor={`nota-${index}`}>
                      <i className="bi bi-card-checklist"></i> Nota Final:
                    </label>
                    <input
                      type="number"
                      id={`nota-${index}`}
                      name="nota"
                      className="form-control form-control-sm"
                      value={item.nota}
                      onChange={(e) =>
                        handleAlunoNotaChange(index, "nota", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor={`falta-${index}`}>
                      <i className="bi bi-calendar-x"></i> Faltas:
                    </label>
                    <input
                      type="number"
                      id={`falta-${index}`}
                      name="falta"
                      className="form-control form-control-sm"
                      value={item.falta}
                      onChange={(e) =>
                        handleAlunoNotaChange(index, "falta", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="col-2 d-flex justify-content-end">
                  {index === alunoNotas.length - 1 && (
                    <button
                      type="button"
                      onClick={handleAddAlunoNota}
                      className="btn btn-success mr-2"
                    >
                      <i className="bi bi-plus-circle"></i>
                    </button>
                  )}
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAlunoNota(index)}
                      className="btn btn-danger"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-4 d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary py-1 px-3 btn-gradient"
              >
                Salvar Notas
              </button>
            </div>
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
          </form> 
          
          <div>
          <DadosNota
        notas={notas}
        handleEdit={handleEdit} o
        onNotaDeleted={onNotaDeleted} // Passando a função como prop
      />
        </div>


        </div>
      </div>
    </div>
  );
}

export default Nota;
