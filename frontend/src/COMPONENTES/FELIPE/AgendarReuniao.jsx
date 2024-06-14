import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { React, useEffect, useState } from 'react';
import './ComponenteFormulario.css';

function AgendarReuniao({ selectedAgenda, onSave }) {
    const [responsaveis, setResponsaveis] = useState([]);
    const [agendas, setAgendas] = useState([]);
    const [validado, setValidado] = useState(false);
    const [datas, setDatas] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [agendaData, setAgendaData] = useState({
        responsavel: "",
        professor: ""
    });
    function buscarDatas() {
        fetch('http://localhost:3001/agenda', { method: "GET" })
            .then(resposta => resposta.json())
            .then(retorno => {
                if (retorno.status) {
                    if (retorno.listaAgendas !== undefined) {
                        setDatas(retorno.listaAgendas);
                    } else {
                        console.error("Lista de professores não foi encontrada na resposta do servidor.");
                    }
                } else {
                    console.error("Erro ao buscar professores:", retorno.error);
                }
            })
            .catch(erro => {
                console.error("Erro ao buscar professores:", erro.message);
                setDatas([{
                    id_professor: 0,
                    nome_professor: "Erro ao recuperar professores " + erro.message
                }]);
            })
    }

    function buscarResponsaveis() {
        fetch('http://localhost:3001/responsavel', { method: "GET" })
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
                    id_professor: 0,
                    nome_professor: "Erro ao recuperar professores " + erro.message
                }]);
            })
    }

    function buscarProfessores() {
        fetch('http://localhost:3001/agenda', { method: "GET" })
            .then(resposta => resposta.json())
            .then(retorno => {
                if (retorno.status) {
                    if (retorno.listaAgendas !== undefined) {
                        setAgendas(retorno.listaAgendas);
                    } else {
                        console.error("Lista de professores não foi encontrada na resposta do servidor.");
                    }
                } else {
                    console.error("Erro ao buscar professores:", retorno.error);
                }
            })
            .catch(erro => {
                console.error("Erro ao buscar professores:", erro.message);
                setAgendas([{
                    codigo: 0,
                    nome: "Erro ao recuperar professores " + erro.message
                }]);
            })
    }
    // buscar professores ao iniciar o componente (uma unica vez)
    useEffect(() => {
        buscarDatas()
        buscarResponsaveis()
        buscarProfessores()
    }, []); //didMount do React

    function selecionarResponsavel(evento) {
        const cpfResponsavel = evento.currentTarget.value;
        setAgendaData({ ...agendaData, responsavel: cpfResponsavel });
    }

    function selecionarProfessor(evento) {
        const nomeProfessor = evento.currentTarget.value;
        setAgendaData({ ...agendaData, professor: nomeProfessor });
    }

    function selecionarDia(evento) {
        const diaAgendamento = evento.currentTarget.value;
        setAgendaData({ ...agendaData, dia: diaAgendamento });
    }

    function selecionarHora(evento) {
        const horaAgendamento = evento.currentTarget.value;
        setAgendaData({ ...agendaData, hora: horaAgendamento });
    }

    function manipularSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();
        const form = evento.currentTarget;
        if (form.checkValidity() === false) {
            setValidado(true);
        }
        else {
            setValidado(false);
            fetch('http://localhost:3001/agendamento', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(agendaData)
            })
                .then(res => res.json())
                .then(retorno => {
                    if (retorno.status) {
                        setSuccessMessage(retorno.mensagem)
                        setTimeout(() => {
                            setSuccessMessage(null);
                        }, 5000);
                        limparFormulario();
                        onSave(agendaData);
                    } else {
                        setErrorMessage(retorno.mensagem);
                        setTimeout(() => {
                            setErrorMessage(null);
                        }, 5000);
                    }
                })
                .catch(erro => {
                    alert("Erro: " + erro.message);
                })
        }
    }

    const limparFormulario = () => {
        setAgendaData({
            responsavel: "",
            professor: "",
            dia: "",
            hora: "",
        });
    }

    
    return (
        <div>
            <div class="section-title text-center position-relative pb-3 mx-auto">
                <h3 class="fw-bold text-uppercase">
                <i class="bi bi-calendar-check-fill"> </i>
                    AGENDAR REUNIÃO
                </h3>
            </div>
            <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
            <Row className="mb-3">
                    <Form.Group as={Col} md="1">
                            <Form.Label>Código</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="0"
                                id="codigo"
                                name="codigo"
                                disabled
                            />
                            <Form.Control.Feedback type='invalid'>Por favor, informe o código do .</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group as={Col} md="6">
                        <Form.Label><i class="bi bi-person-fill"></i>Responsável:</Form.Label>
                        <Form.Select id='responsavel' name='responsavel' className="form-select form-control form-control-sm" value={agendaData.responsavel} onChange={selecionarResponsavel}>
                            <option key={0} value={0}>Selecione</option>
                            {
                                responsaveis.map((responsavel) => {
                                    return (
                                        <option key={responsavel.cpf} value={responsavel.nome}>{responsavel.nome}</option>
                                    )
                                })
                            }
                        </Form.Select>
                        <Form.Control.Feedback type='invalid'>Por favor, informe o responsável.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Label><i class="bi bi-person-fill"></i>Professor:</Form.Label>
                        <Form.Select id='professor' name='professor' className="form-select form-control form-control-sm" value={agendaData.professor} onChange={selecionarProfessor}>
                            <option key={0} value={0}>Selecione</option>
                            {
                                agendas.map((agenda) => {
                                    return (
                                        <option key={agenda.codigo} value={agenda.nome}>{agenda.nome}</option>
                                    )
                                })
                            }
                        </Form.Select>
                        <Form.Control.Feedback type='invalid'>Por favor, informe o professor.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group as={Col} md="6">
                        <Form.Label><i class="bi bi-calendar-check-fill"></i>Data:</Form.Label>
                        <Form.Select id='dia' name='dia' className="form-select form-control form-control-sm" value={agendaData.dia} onChange={selecionarDia}>
                            <option key={0} value={0}>Selecione</option>
                            {
                                datas.map((data) => {
                                    return (
                                        <option key={data.codigo} value={data.dia}>{new Date(data.dia + 'T00:00:00').toLocaleDateString()}</option>
                                    )
                                })
                            }
                        </Form.Select>
                        <Form.Control.Feedback type='invalid'>Por favor, informe o dia.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Label><i class="bi bi-clock-fill"></i>Horário:</Form.Label>
                        <Form.Select id='hora' name='hora' className="form-select form-control form-control-sm" value={agendaData.hora} onChange={selecionarHora}>
                            <option key={0} value={0}>Selecione</option>
                            {
                                datas.map((data) => {
                                    return (
                                        <option key={data.codigo} value={data.hora}>{data.hora}</option>
                                    )
                                })
                            }
                        </Form.Select>
                        <Form.Control.Feedback type='invalid'>Por favor, informe a hora.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="justify-content-center">
                    <Col md="6">
                        <Form.Group>
                            <button type="submit" id='cadastrar' className="btn btn-primary py-1 px-3 btn-gradient">
                                CADASTRAR
                            </button>
                            <button type="reset" className="btn btn-primary py-1 px-3 btn-gradient">
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

export default AgendarReuniao;