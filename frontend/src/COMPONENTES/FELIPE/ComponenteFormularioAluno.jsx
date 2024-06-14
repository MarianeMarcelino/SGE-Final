import { React, useEffect, useState } from 'react';
import './ComponenteFormulario.css';
import AlunoService from '../../SERVICES/alunoService';
import {
    isAnoMaiorQueAtual,
    validarEmail,
    validarCelular,
    mCpf,
    mCEP,
    mascaraCelular,
    validarCPF,
    validarInputText,
    validarSelecao,
    validarRG,
} from "./ComponenteValidacao";

const alunoService = new AlunoService();

function ComponenteFormularioAluno({ selectedAluno, onSave }) {
    const [alunoData, setAlunoData] = useState({ cpf: "", rg: "", nome: "", sobrenome: "", dataNascimento: "", sexo: "", endereco: "", bairro: "", cidade: "", cep: "", estado: "", telefone: "", email: '' })
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (selectedAluno != null) {
            setAlunoData(selectedAluno);
        }
    }, [selectedAluno]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAlunoData({ ...alunoData, [name]: value })
    }

    const isAlunoDataValid = (alunoData) => {
        return (alunoData.cpf &&
            alunoData.rg &&
            alunoData.nome &&
            alunoData.sobrenome &&
            alunoData.dataNascimento &&
            alunoData.sexo &&
            alunoData.endereco &&
            alunoData.bairro &&
            alunoData.cidade &&
            alunoData.cep &&
            alunoData.estado &&
            alunoData.telefone &&
            alunoData.email)
    }

    const handleDataNascimentoChange = (event) => {
        isAnoMaiorQueAtual(event);
        handleInputChange(event);
    };

    const handleTelefoneChange = (event) => {
        validarCelular(event);
        handleInputChange(event);
    };

    const handleCPFChange = (event) => {
        validarCPF(event);
        handleInputChange(event);
    };


    const limparFormulario = () => {
        setAlunoData({
            cpf: "",
            rg: "",
            nome: "",
            sobrenome: "",
            dataNascimento: "",
            sexo: "",
            endereco: "",
            bairro: "",
            cidade: "",
            cep: "",
            estado: "",
            telefone: "",
            email: ""
        });
        document.getElementById('cpf').disabled = false;

        for (let i = 0; i < quantidadeAlunos; i++) {
            const campoAluno = document.getElementById(`aluno-${i}`);
            const campoParentesco = document.getElementById(`parentesco-${i}`);

            if (campoAluno) {
                campoAluno.value = "";
                campoAluno.style.borderColor = "";
                campoAluno.style.borderWidth = "";
            }

            if (campoParentesco) {
                campoParentesco.value = "Selecione";
                campoParentesco.style.borderColor = "";
                campoParentesco.style.borderWidth = "";
            }
        }

        setQuantidadeAlunos(1);
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isAlunoDataValid(alunoData)) {
            try {
                if (selectedAluno === null) {
                    await alunoService.createAluno(alunoData);
                    limparFormulario();
                    setSuccessMessage('Aluno cadastrado com sucesso!');
                } else {
                    await alunoService.updateAluno(selectedAluno.cpf, alunoData);
                    limparFormulario();
                    setSuccessMessage('Aluno atualizado com sucesso!');
                }
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 5000);

                // Chama a função onSave passada como propriedade para atualizar a tabela no pai
                onSave(alunoData);
            } catch (error) {
                setErrorMessage(`ERRO: ${error.message}`);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            }
        } else {
            setErrorMessage('Preencha todos os campos obrigatórios antes de cadastrar o aluno.');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };


    const [quantidadeAlunos, setQuantidadeAlunos] = useState(1);

    const parentesco = ["Pai", "Mãe", "Avô", "Avó", "Tio(a)", "Irmã(o)"];

    const adicionarCampoAlunos = () => {
        setQuantidadeAlunos(quantidadeAlunos + 1);
    };

    const removerCampoAlunos = (index) => {
        if (index === 0 && quantidadeAlunos === 1) {
            return;
        }

        setQuantidadeAlunos(quantidadeAlunos - 1);
    };

    const renderizarCampoAlunos = () => {
        let campos = [];
        for (let i = 0; i < quantidadeAlunos; i++) {
            campos.push(
                <div className="row align-items-center" key={i}>
                    <div className="col-5">
                        <div className="form-group borda-form2">
                            <label htmlFor={`aluno-${i}`}>
                                <i className="fas fa-graduation-cap"></i>Nome do Responsável:
                            </label>
                            <input
                                type="text"
                                id={`aluno-${i}`}
                                name="aluno"
                                className="form-control form-control-sm"
                            />
                        </div>
                    </div>

                    <div className="col-5">
                        <div className="form-group">
                            <label htmlFor={`parentesco-${i}`}>
                                <i className="fas fa-users"></i> Parentesco:
                            </label>
                            <select
                                className="form-select form-control form-control-sm"
                                id={`parentesco-${i}`}
                            >
                                <option></option>
                                {parentesco.map((e) => (
                                    <option key={e}>{e}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-2 d-flex justify-content-end">
                        {i === quantidadeAlunos - 1 && (
                            <button
                                type="button"
                                onClick={adicionarCampoAlunos}
                                className="btn btn-success mr-2"
                            >
                                <i class="bi bi-bookmark-plus"></i>
                            </button>
                        )}

                        {i > 0 && (
                            <button
                                type="button"
                                onClick={() => removerCampoAlunos(i)}
                                className="btn btn-danger"
                            >
                                <i class="bi bi-trash"></i>
                            </button>
                        )}
                    </div>
                </div>
            );
        }
        return campos;
    };


    return (

        <div>
            <div class="section-title text-center position-relative pb-3 mx-auto">
                <h3 class="fw-bold text-uppercase">
                    <i class="bi bi-backpack-fill"> </i>
                    CADASTRO DE ALUNOS
                </h3>
            </div>

            <form id='formulario'>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group borda-form ">
                            <label htmlFor="cpf">
                                <i class="bi bi-credit-card"></i> CPF:
                            </label>
                            <input
                                type="text"
                                id="cpf"
                                name="cpf"
                                className="form-control form-control-sm"
                                onChange={handleInputChange}
                                onBlur={handleCPFChange}
                                onKeyUp={mCpf}
                                value={alunoData.cpf}
                                disabled={selectedAluno !== null}
                                placeholder='000.000.000-00'
                            />
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="rg">
                                <i class="bi bi-credit-card"></i> RG:
                            </label>
                            <input
                                type="text"
                                id="rg"
                                name="rg"
                                className="form-control form-control-sm"
                                onChange={handleInputChange}
                                onBlur={validarRG}
                                value={alunoData.rg}
                                placeholder='00.000.000-0'
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="form-group borda-form ">
                            <label htmlFor="nome">
                                <i className="bi bi-person-vcard"></i> Nome:
                            </label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                className="form-control form-control-sm"
                                onChange={handleInputChange}
                                onBlur={(event) => validarInputText(event.target)}
                                value={alunoData.nome}
                                placeholder='Digite o nome do aluno'
                            />
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="sobrenome">
                                <i className="bi bi-person-vcard"></i> Sobrenome:
                            </label>
                            <input
                                type="text"
                                id="sobrenome"
                                name="sobrenome"
                                className="form-control form-control-sm"
                                onChange={handleInputChange}
                                onBlur={(event) => validarInputText(event.target)}
                                value={alunoData.sobrenome}
                                placeholder='Digite o sobrenome do aluno'
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="form-group borda-form">
                            <label htmlFor="dataNascimento">
                                <i class="bi bi-calendar-date"></i> Data de Nascimento:
                            </label>
                            <input
                                type="date"
                                id="dataNascimento"
                                name="dataNascimento"
                                className="form-control form-control-sm"
                                onBlur={handleDataNascimentoChange}
                                onChange={handleInputChange}
                                value={alunoData.dataNascimento}
                            />
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="sexo">
                                <i class="bi bi-gender-ambiguous"></i> Sexo:
                            </label>
                            <select
                                id="sexo"
                                name="sexo"
                                className="form-select form-control form-control-sm"
                                onChange={handleInputChange}
                                onBlur={(event) => validarSelecao(event.target)}
                                value={alunoData.sexo}
                            >
                                <option value="" selected disabled>Selecione</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="form-group borda-form ">
                            <label htmlFor="endereco">
                                <i className="bi bi-house-fill"></i> Endereço:
                            </label>
                            <input
                                type="text"
                                id="endereco"
                                name="endereco"
                                className="form-control form-control-sm"
                                onChange={handleInputChange}
                                value={alunoData.endereco}
                                placeholder='Digite o endereço'
                            />
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="bairro">
                                <i className="bi bi-signpost-fill"></i> Bairro:
                            </label>
                            <input
                                type="text"
                                id="bairro"
                                name="bairro"
                                className="form-control form-control-sm"
                                onChange={handleInputChange}
                                value={alunoData.bairro}
                                placeholder='Digite o bairro'
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="form-group borda-form ">
                            <label htmlFor="cidade">
                                <i className="bi bi-signpost-split-fill"></i> Cidade:
                            </label>
                            <input
                                type="text"
                                id="cidade"
                                name="cidade"
                                className="form-control form-control-sm"
                                onChange={handleInputChange}
                                value={alunoData.cidade}
                                placeholder='Digite a cidade'
                            />
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="estado">
                                <i className="bi bi-signpost-split-fill"></i> Estado:
                            </label>
                            <select
                                id="estado"
                                name="estado"
                                className="form-select form-control form-control-sm"
                                onChange={handleInputChange}
                                onBlur={(event) => validarSelecao(event.target)}
                                value={alunoData.estado}
                            >
                                <option value="" selected disabled>Selecione</option>
                                <option value="AC">Acre</option>
                                <option value="AL">Alagoas</option>
                                <option value="AP">Amapá</option>
                                <option value="AM">Amazonas</option>
                                <option value="BA">Bahia</option>
                                <option value="CE">Ceará</option>
                                <option value="DF">Distrito Federal</option>
                                <option value="ES">Espírito Santo</option>
                                <option value="GO">Goiás</option>
                                <option value="MA">Maranhão</option>
                                <option value="MT">Mato Grosso</option>
                                <option value="MS">Mato Grosso do Sul</option>
                                <option value="MG">Minas Gerais</option>
                                <option value="PA">Pará</option>
                                <option value="PB">Paraíba</option>
                                <option value="PR">Paraná</option>
                                <option value="PE">Pernambuco</option>
                                <option value="PI">Piauí</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="RN">Rio Grande do Norte</option>
                                <option value="RS">Rio Grande do Sul</option>
                                <option value="RO">Rondônia</option>
                                <option value="RR">Roraima</option>
                                <option value="SC">Santa Catarina</option>
                                <option value="SP">São Paulo</option>
                                <option value="SE">Sergipe</option>
                                <option value="TO">Tocantins</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="cep">
                                <i className="bi bi-mailbox2"></i> CEP:
                            </label>
                            <input
                                type="text"
                                id="cep"
                                name="cep"
                                className="form-control form-control-sm"
                                onChange={handleInputChange}
                                onKeyUp={mCEP}
                                value={alunoData.cep}
                                placeholder='00000-000'
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="form-group borda-form ">
                            <label htmlFor="telefone">
                                <i class="bi bi-telephone"></i> Telefone:
                            </label>
                            <input
                                type="text"
                                id="telefone"
                                name="telefone"
                                className="form-control form-control-sm"
                                onChange={handleInputChange}
                                onKeyUp={mascaraCelular}
                                onBlur={handleTelefoneChange}
                                value={alunoData.telefone}
                                placeholder='(00)00000-0000'
                            />
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="email">
                                <i class="bi bi-envelope-at"></i> E-mail:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control form-control-sm"
                                onChange={handleInputChange}
                                onBlur={(event) => validarEmail(event.target)}
                                value={alunoData.email}
                                placeholder='email@email.com'
                            />
                        </div>
                    </div>
                </div>

                {renderizarCampoAlunos()}

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
                            id='cadastrar'
                            className="btn btn-primary py-1 px-3 btn-gradient"
                            onClick={handleSubmit}
                        >
                            CADASTRAR
                        </button>
                    </div>
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

export default ComponenteFormularioAluno;
