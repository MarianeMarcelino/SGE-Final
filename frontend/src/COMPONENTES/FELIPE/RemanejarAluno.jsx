import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import './cadastroTurma.css';
import RemanejarService from '../../SERVICES/matriculaService.js';

const remanejarService = new RemanejarService();

function RemanejarAluno({selectedMatricula, onSave}) {
    const [turmas, setTurmas] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [matriculas, setMatriculas] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [error, setError] = useState(null);
    const [validado, setValidado] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [matriculaData, setMatriculaData] = useState({
        cpf_aluno: "",
        codigo_turma: ""
    });

    useEffect(() => {
        if (selectedMatricula != null) {
            setMatriculaData(selectedMatricula);
        }
    }, [selectedMatricula]);

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
    
      
      useEffect(() => {
        buscarMatriculas()
      }, []); 
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
    const handleFiltrar = async () => {
        try {
          console.log('Input Pesquisar:', searchInput);
    
          if (!searchInput) {
            console.log('Sem input pesquisar. Carregar todos alunos.');
            buscarMatriculas();
            return;
          }
    
          const matriculasFiltradas = await remanejarService.filtrar({ cpf: searchInput });
    
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
   
    useEffect(() => {
        buscarAlunos();
        buscarTurmas();
    }, []); 


    function selecionarAluno(evento) {
        const cpfAluno = evento.currentTarget.value;
        setMatriculaData({ ...matriculaData, cpf_aluno: cpfAluno });
    }

    function selecionarTurma(evento) {
        const codigoTurma = evento.currentTarget.value;
        setMatriculaData({ ...matriculaData, codigo_turma: codigoTurma });
    }

    

    async function manipularSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();
        const form = evento.currentTarget;
        if (form.checkValidity() === false) {
            setValidado(true);
        }
        else {
            setValidado(false);
            try {
                if (selectedMatricula === null) {
                    await remanejarService.createMatricula(matriculaData);
                    limparFormulario();
                    setSuccessMessage('Aluno matriculado com sucesso!');
                } else {
                    await remanejarService.updateMatricula(selectedMatricula.cpf, matriculaData);
                    limparFormulario();
                    setSuccessMessage('Matricula atualizada com sucesso!');
                }
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 5000);

                onSave(matriculaData);
            } catch (error) {
                setErrorMessage(`ERRO: ${error.message}`);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            }
        }
    }



    const limparFormulario = () => {
        setMatriculaData({
            cpf_aluno: "",
            codigo_turma: ""
        });
    }

    return (
        <div>
            <div class="section-title text-center position-relative pb-3 mx-auto">
                <h3 class="fw-bold text-uppercase">
                    <i class="bi bi-people-fill"> </i>
                    REMANEJAR ALUNO
                </h3>
            </div>
            <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <div>
                            <Form.Label><i class="bi bi-person-fill"></i>Aluno:</Form.Label>
                            <Form.Select id='cpf_aluno' name='cpf_aluno' className="form-select form-control form-control-sm" value={matriculaData.cpf_aluno} onChange={selecionarAluno} disabled>
                                <option key={0} value={0}>Selecione</option>
                                {
                                    alunos.map((aluno) => {
                                        return (
                                            <option key={aluno.cpf} value={aluno.cpf}>{aluno.cpf} - {aluno.nome} {aluno.sobrenome}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </div>
                        <Form.Control.Feedback type='invalid'>Por favor, informe um aluno.</Form.Control.Feedback>
                    </Form.Group>
                    
                    
                    <Form.Group as={Col} md="6">
                        <Form.Label><i class="bi bi-people-fill"></i>ANO/SERIE DESEJADO:</Form.Label>
                        <Form.Select id='codigo_turma' 
                        name='codigo_turma' 
                        className="form-select form-control form-control-sm" 
                        value={matriculaData.codigo_turma} 
                        onChange={selecionarTurma}>
                            <option key={0} value={0}>Selecione</option>
                            {
                                turmas.map((tur) => {
                                    return (
                                        <option key={tur.codigo} value={tur.codigo}>{tur.codigo} - {tur.serie} {tur.turma}</option>
                                    )
                                })
                            }
                        </Form.Select>
                        <Form.Control.Feedback type='invalid'>Por favor, informe a turma.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="justify-content-center">
                    <Col md="6">
                        <Form.Group>
                            <button type="submit" id='cadastrar' className="btn btn-primary py-1 px-3 btn-gradient">
                                ATUALIZAR
                            </button>
                            <button type="reset" className="btn btn-primary py-1 px-3 btn-gradient" onClick={limparFormulario}>
                                LIMPAR
                            </button>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <div>
                <div id='mensagem'>
                    {successMessage && (
                        <div className="alert alert-success" role="alert">
                            <div className='centraliza'>
                                {successMessage}
                            </div>
                        </div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            <div className='centraliza'>
                                {errorMessage}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}

export default RemanejarAluno;