import { React, useEffect, useState } from 'react';
import './ComponenteFormulario.css';
import AgendaService from '../../SERVICES/agendaService';


const agendaService = new AgendaService();

function CadastroAgenda({ selectedAgenda, onSave }) {
    const [agendaData, setAgendaData] = useState({nome: "", turma: "", dia: "", hora: "" })
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    

    useEffect(() => {
        if (selectedAgenda != null) {
            setAgendaData(selectedAgenda);
        }
    }, [selectedAgenda]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAgendaData({ ...agendaData, [name]: value })
    }

    const isAgendaDataValid = (agendaData) => {
        return (agendaData.nome && agendaData.turma && agendaData.dia && agendaData.hora)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formulario = document.getElementById('formulario');
    
        try {
            if (formulario.checkValidity() && isAgendaDataValid(agendaData)) {
                formulario.classList.remove('was-validated'); // Remove the class if it was previously set
                
                if (selectedAgenda === null) {
                    await agendaService.createAgenda(agendaData);
                    limparFormulario();
                    
                    setSuccessMessage('Agenda cadastrada com sucesso!');
                } else {
                    await agendaService.updateAgenda(selectedAgenda.codigo, agendaData);
                    limparFormulario();
                    setSuccessMessage('Agenda atualizada com sucesso!');
                }
    
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 5000);
    
                // Chama a função onSave passada como propriedade para atualizar a tabela no pai
                onSave(agendaData);
            } else {
                setErrorMessage('Preencha todos os campos obrigatórios antes de cadastrar uma agenda.');
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
    
                formulario.classList.add('was-validated'); // Add the class to display validation styles
            }
        } catch (error) {
            setErrorMessage(`Agenda não foi cadastrada: ${error.message}`);
            setTimeout(() => {
                setErrorMessage(null);
            }, 10000);
        }
    };

    const limparFormulario = () => {
        setAgendaData({
            codigo: "",
            nome: "",
            turma: "",
            dia: "",
            hora: "",
        });
    };

    return (
        <div>
            <div class="section-title text-center position-relative pb-3 mx-auto">
                <h3 class="fw-bold text-uppercase">
                    <i class="bi bi-calendar-check-fill"> </i>
                    CADASTRO DE AGENDA
                </h3>
            </div>

            <form id='formulario'>
            <div className="row">
                    <div className="col-1">
                        <div className="form-group borda-form ">
                            <label htmlFor="codigo">
                                <i class="bi bi-key-fill"></i> ID:
                            </label>
                            <input
                                type="text"
                                id="codigo"
                                name="codigo"
                                className="form-control form-control-sm"
                                onChange={handleInputChange}
                                value={agendaData.codigo}
                                disabled
                                required
                            />
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-6">
                        <div className="form-group borda-form ">
                            <label htmlFor="nome">
                                <i class="bi bi-person-fill"></i> Nome do Professor:
                            </label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                className="form-control form-control-sm"
                                placeholder="Digite o nome do professor"
                                onChange={handleInputChange}
                                value={agendaData.nome}
                                required
                            />
                            <div class="invalid-feedback">
                                Informe o nome do professor
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="turma">
                                <i class="bi bi-backpack-fill"></i> Turma:
                            </label>
                            <select
                                id="turma"
                                name="turma"
                                className="form-select form-control form-control-sm"
                                onChange={handleInputChange}
                                value={agendaData.turma}
                                required
                            >
                                <option value="" selected disabled>Selecione</option>
                                <option value="1 Ano A">1º Ano A</option>
                                <option value="1 Ano B">1º Ano B</option>
                                <option value="1 Ano C">1º Ano C</option>
                                <option value="2 Ano A">2º Ano A</option>
                                <option value="2 Ano B">2º Ano B</option>
                                <option value="2 Ano C">2º Ano C</option>
                                <option value="3 Ano A">3º Ano A</option>
                                <option value="3 Ano B">3º Ano B</option>
                                <option value="3 Ano C">3º Ano C</option>
                                <option value="4 Ano A">4º Ano A</option>
                                <option value="4 Ano B">4º Ano B</option>
                                <option value="4 Ano C">4º Ano C</option>
                                <option value="5 Ano A">5º Ano A</option>
                                <option value="5 Ano B">5º Ano B</option>
                                <option value="5 Ano C">5º Ano C</option>
                            </select>
                            <div class="invalid-feedback">
                                Informe a turma
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="form-group borda-form ">
                            <label htmlFor="dia">
                                <i class="bi bi-calendar-check-fill"></i> Dia:
                            </label>
                            <input
                                type="date"
                                id="dia"
                                name="dia"
                                className="form-control form-control-sm"
                                onChange={handleInputChange}
                                value={agendaData.dia}                              
                                required
                            />
                            <div class="invalid-feedback">
                                Informe a data
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="hora">
                                <i className="bi bi-clock-fill"></i> Hora:
                            </label>
                            <input
                                type="time"
                                id="hora"
                                name="hora"
                                className="form-control form-control-sm"
                                onChange={handleInputChange}
                                value={agendaData.hora}                             
                                required
                            />
                            <div class="invalid-feedback">
                                Informe a hora
                            </div>
                        </div>
                    </div>
                </div>

                <div class="pt-4 d-flex justify-content-center">
                    <div class="mr-3">
                        <button
                            class="btn btn-primary py-1 px-3 btn-gradient"
                            type="reset"
                           
                        >
                            LIMPAR
                        </button>
                    </div>
                    <div class="mr-3">
                        <button
                            type="button"
                            className="btn btn-primary py-1 px-3 btn-gradient"
                            onClick={handleSubmit}
                        >
                            CADASTRAR
                        </button>
                    </div>
                </div>
                <div>
                </div>

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


            </form>
        </div>
    );
}

export default CadastroAgenda;