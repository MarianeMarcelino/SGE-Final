import { React, useEffect, useState } from 'react';
import './ComponenteFormulario.css';
import DisciplinaService from '../../SERVICES/disciplinaService';

const disciplinaService = new DisciplinaService();

function CadastroDisciplina({ selectedDisciplina, onSave }) {
    const [disciplinaData, setDisciplinaData] = useState({ codigo: "", nome: "" })
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (selectedDisciplina != null) {
            setDisciplinaData(selectedDisciplina);
        }
    }, [selectedDisciplina]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDisciplinaData({ ...disciplinaData, [name]: value })
    }

    const isDisciplinaDataValid = (disciplinaData) => {
        return (disciplinaData.codigo && disciplinaData.nome)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formulario = document.getElementById('formulario');
    
        try {
            if (formulario.checkValidity() && isDisciplinaDataValid(disciplinaData)) {
                formulario.classList.remove('was-validated'); // Remove the class if it was previously set
                
                if (selectedDisciplina === null) {
                    await disciplinaService.createDisciplina(disciplinaData);
                    limparFormulario();
                    
                    setSuccessMessage('Disciplina cadastrada com sucesso!');
                } else {
                    await disciplinaService.updateDisciplina(selectedDisciplina.codigo, disciplinaData);
                    limparFormulario();
                    setSuccessMessage('Disciplina atualizada com sucesso!');
                }
    
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 5000);
    
                // Chama a função onSave passada como propriedade para atualizar a tabela no pai
                onSave(disciplinaData);
            } else {
                setErrorMessage('Preencha todos os campos obrigatórios antes de cadastrar a disciplina.');
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
    
                formulario.classList.add('was-validated'); // Add the class to display validation styles
            }
        } catch (error) {
            setErrorMessage(`Disciplina não foi cadastrada: ${error.message}`);
            setTimeout(() => {
                setErrorMessage(null);
            }, 10000);
        }
    };

    const handleCodigoChange = (event) => {
        const inputValue = event.target.value;
    
        // Aplicar máscara: remover caracteres não numéricos
        const numerosApenas = inputValue.replace(/\D/g, '');
    
        // Atualizar o estado com o valor filtrado
        setDisciplinaData({
          ...disciplinaData,
          codigo: numerosApenas
        });
      };

    const limparFormulario = () => {
        setDisciplinaData({
            codigo: "",
            nome: "",
        });
        document.getElementById('codigo').disabled = false;
    };

    return (
        <div>
            <div class="section-title text-center position-relative pb-3 mx-auto">
                <h3 class="fw-bold text-uppercase">
                    <i class="bi bi-book-fill"> </i>
                    CADASTRO DE DISCIPLINAS
                </h3>
            </div>

            <form id='formulario'>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group borda-form ">
                            <label htmlFor="codigo">
                                <i class="bi bi-upc-scan"></i> Código:
                            </label>
                            <input
                                type="text"
                                id="codigo"
                                name="codigo"
                                className="form-control form-control-sm"
                                onChange={handleInputChange}
                                onKeyUp={handleCodigoChange}
                                value={disciplinaData.codigo}
                                required
                            />
                            <div class="invalid-feedback">
                                Informe o Código
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="nome">
                                <i className="bi-journal-bookmark"></i> Nome da Disciplina:
                            </label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                className="form-control form-control-sm"
                                onChange={handleInputChange}
                                value={disciplinaData.nome}
                                required
                            />
                            <div class="invalid-feedback">
                                Informe o Nome
                            </div>
                        </div>
                    </div>
                </div>

                <div class="pt-4 d-flex justify-content-center">
                    <div class="mr-3">
                        <button
                            class="btn btn-primary py-1 px-3 btn-gradient"
                            type="reset"
                            onClick={limparFormulario}
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

export default CadastroDisciplina;




