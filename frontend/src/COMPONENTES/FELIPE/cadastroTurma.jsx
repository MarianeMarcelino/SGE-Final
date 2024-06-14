import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import './cadastroTurma.css';
import TurmaService from '../../SERVICES/turmaService';
const turmaService = new TurmaService();

function CadastroTurma({ selectedTurma, onSave }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [validado, setValidado] = useState(false);
    const [professores, setProfessores] = useState([]);
    const [turmaData, setTurmaData] = useState({
        codigo: "",
        serie: "",
        turma: "",
        periodo: "",
        id_professor: ""
    });

    useEffect(() => {
        if (selectedTurma !== null) {
            setTurmaData(selectedTurma);
        } else {
            setTurmaData({
                codigo: "",
                serie: "",
                turma: "",
                periodo: "",
                id_professor: ""
            });
        }
    }, [selectedTurma]);

    function buscarProfessores() {
        fetch('http://localhost:3001/professor', { method: "GET" })
            .then(resposta => resposta.json())
            .then(retorno => {
                if (retorno.status) {
                    if (retorno.listaProfessores !== undefined) {
                        setProfessores(retorno.listaProfessores);
                    } else {
                        console.error("Lista de professores não foi encontrada na resposta do servidor.");
                    }
                } else {
                    console.error("Erro ao buscar professores:", retorno.error);
                }
            })
            .catch(erro => {
                console.error("Erro ao buscar professores:", erro.message);
                setProfessores([{
                    id_professor: 0,
                    nome_professor: "Erro ao recuperar professores " + erro.message
                }]);
            })
    }
    // buscar professores ao iniciar o componente (uma unica vez)
    useEffect(() => {
        buscarProfessores()
    }, []); //didMount do React

    function selecionarProfessor(evento) {
        const codigoProfessor = evento.currentTarget.value;
        setTurmaData({ ...turmaData, id_professor: codigoProfessor });
    }


    function manipularMudanca(event) {
        //extrair do evento onChange quem provocou a sua ocorrência
        const { name, value } = event.target;
        setTurmaData({ ...turmaData, [name]: value })
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
                if (selectedTurma === null) {
                    await turmaService.createTurma(turmaData);
                    limparFormulario();
                    setSuccessMessage('Turma criada com sucesso!');
                } else {
                    await turmaService.updateTurma(selectedTurma.codigo, turmaData);
                    limparFormulario();
                    setSuccessMessage('Turma atualizada com sucesso!');
                }
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 5000);

                onSave(turmaData);
            } catch (error) {
                setErrorMessage(`ERRO: ${error.message}`);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            }
        }
    }

    const limparFormulario = () => {
        setTurmaData({
            codigo: "",
            serie: "",
            turma: "",
            periodo: "",
            id_professor: ""
        });
    }

    return (
        <div>
            <div class="section-title text-center position-relative pb-3 mx-auto">
                <h3 class="fw-bold text-uppercase">
                    <i class="bi bi-people-fill"> </i>
                    CADASTRO DE TURMA
                </h3>
            </div>
            <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <div className="form-group borda-form ">
                            <Form.Label>Código</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="0"
                                id="codigo"
                                name="codigo"
                                value={turmaData.codigo}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type='invalid'>Por favor, informe o código do .</Form.Control.Feedback>
                        </div>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <div className="form-group borda-form ">
                            <Form.Label>Ano/Série</Form.Label>
                            <Form.Select id='serie' name='serie' className="form-select form-control form-control-sm" value={turmaData.serie} onChange={manipularMudanca}>
                                <option value={0}>Selecione</option>
                                <option value={"1 Ano"}>1º Ano</option>
                                <option value={"2 Ano"}>2º Ano</option>
                                <option value={"3 Ano"}>3º Ano</option>
                                <option value={"4 Ano"}>4º Ano</option>
                                <option value={"5 Ano"}>5º Ano</option>
                            </Form.Select>
                            <Form.Control.Feedback type='invalid'>Por favor, informe o preço de custo.</Form.Control.Feedback>
                        </div>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Label>Turma</Form.Label>
                        <Form.Select id='turma' name='turma' className="form-select form-control form-control-sm" value={turmaData.turma} onChange={manipularMudanca}>
                            <option value={0}>Selecione</option>
                            <option value={"A"}>A</option>
                            <option value={"B"}>B</option>
                            <option value={"C"}>C</option>
                            <option value={"D"}>D</option>
                        </Form.Select>
                        <Form.Control.Feedback type='invalid'>Por favor, informe o preço de venda.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" >
                        <div className="form-group borda-form ">
                            <Form.Label>Período</Form.Label>
                            <Form.Select id='periodo' name='periodo' className="form-select form-control form-control-sm" value={turmaData.periodo} onChange={manipularMudanca}>
                                <option value={0}>Selecione</option>
                                <option value={"Manhã"}>Manhã</option>
                                <option value={"Tarde"}>Tarde</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Por favor, informe a data de compra do.
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Label>Professor:</Form.Label>
                        <Form.Select id='id_professor' name='id_professor' className="form-select form-control form-control-sm" value={turmaData.id_professor} onChange={selecionarProfessor}>
                            <option key={0} value={0}>Selecione</option>
                            {
                                professores.map((professor) => {
                                    return (
                                        <option key={professor.id_professor} value={professor.id_professor}>{professor.nome_professor}</option>
                                    )
                                })
                            }
                        </Form.Select>
                        <Form.Control.Feedback type='invalid'>Por favor, informe o autor do .</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="justify-content-center">
                    <Col md="6">
                        <Form.Group>
                            <button type="submit" id='cadastrar' className="btn btn-primary py-1 px-3 btn-gradient">
                                CADASTRAR
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

export default CadastroTurma;