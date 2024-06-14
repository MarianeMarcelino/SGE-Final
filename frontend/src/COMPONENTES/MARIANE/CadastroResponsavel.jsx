import "./CadastroResponsavel.css";

import React, { useState, useEffect } from "react";

import {
  validarEmail,
  validarCelular,
  mCpf,
  mascaraCelular,
  validarCPF,
  validarNome,
  validarSelecao,
  validarRG,
} from "./ComponenteValidacao";

import Dados from "./Dados";

import ResponsavelService from '../../SERVICES/responsavelService';

const responsavelService = new ResponsavelService();

function CadastroResponsavel({ isMenuExpanded }) {
  const [responsavelData, setResponsavelData] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
    rg: "",
    telefone: "",
    email: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedResponsavel, setSelectedResponsavel] = useState(null);

  useEffect(() => {
    if (selectedResponsavel != null) {
      setResponsavelData(selectedResponsavel);
    }
  }, [selectedResponsavel]);


  const [responsaveis, setResponsaveis] = useState([]);

  const carregarResponsaveis = async () => {
    fetch('http://localhost:3001/responsavel', { method: "GET" })
      .then(resposta => resposta.json())
      .then(retorno => {
        if (retorno.status) {
          setResponsaveis(retorno.listaResponsaveis);
        }
      })
      .catch(erro => {
        setResponsaveis([{
          cpf: 0,
          nome: "Erro ao recuperar responsáveis " + erro.message
        }]);
      })
  };

  useEffect(() => {
    carregarResponsaveis();
  }, []);


  const handleInputChange = (event) => {
    const { name } = event.target;

    if (name === "telefone") {
      mascaraCelular(event);
    } else if (name === "cpf") {
      mCpf(event);
    }

    setResponsavelData({ ...responsavelData, [name]: event.target.value });
  };

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = (responsavel) => {
    setSelectedResponsavel(responsavel);
    setIsEditMode(true);
  };
  

  const limparFormulario = () => {
    setResponsavelData({
      nome: "",
      sobrenome: "",
      cpf: "",
      rg: "",
      telefone: "",
      email: "",
    });

    const camposInput = ["nome", "sobrenome", "cpf", "rg", "telefone", "email"];

    camposInput.forEach((id) => {
      const campo = document.getElementById(id);
      if (campo) {
        campo.value = "";
        campo.style.borderColor = "";
        campo.style.borderWidth = "";
      }
    });

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
    setSelectedResponsavel(null);
    setIsEditMode(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    let camposFaltando = [];
    let camposInput = ['nome', 'sobrenome', 'cpf', 'rg', 'telefone', 'email'];
  
    camposInput.forEach(campo => {
      const input = document.getElementById(campo);
      if (!responsavelData[campo]) {
        camposFaltando.push(campo);
        input.style.borderColor = "red";
        input.style.borderWidth = "2px";
      } else {
        input.style.borderColor = "";
        input.style.borderWidth = "";
      }
    });
  
    if (camposFaltando.length === 0) {
      try {
        if (selectedResponsavel === null) {
          await responsavelService.createResponsavel(responsavelData);
          carregarResponsaveis();
          limparFormulario();
          setSuccessMessage("Responsável cadastrado com sucesso!");
        } else {
          await responsavelService.updateResponsavel(
            selectedResponsavel.cpf,
            responsavelData
          );
          limparFormulario();
          setSuccessMessage("Responsável atualizado com sucesso!");
        }
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } catch (error) {
        setErrorMessage(`Responsável não foi cadastrado: ${error.message}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 10000);
      }
    } else {
      setErrorMessage("Campos obrigatórios faltando: " + camposFaltando.join(", "));
      setTimeout(() => {
        setErrorMessage(null);
      }, 10000);
    }
    await carregarResponsaveis();
    setIsEditMode(false)
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
                <i className="fas fa-graduation-cap"></i> Responsável por:
              </label>
              <input
                type="text"
                id={`aluno-${i}`}
                name="aluno"
                className="form-control form-control-sm"
                onBlur={(event) => validarNome(event.target)}
                placeholder="Nome do aluno"
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
                onBlur={(event) => validarSelecao(event.target)}
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
                <i className="bi bi-bookmark-plus"></i>
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
    <div
      id="formularioResponsavel"
      className={isMenuExpanded ? "expanded" : ""}
    >
      <div className="main--content">
        <div className="form--wrapper">
          <div className="section-title text-center position-relative pb-3 mb-5 mx-auto">
            <h3 className="fw-bold text-uppercase">
              <i className="bi bi-person-fill-add icone"> </i>
              CADASTRO DE RESPONSÁVEIS
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group borda-form ">
                  <label htmlFor="nome">
                    <i className="bi bi-person-vcard"></i> Primeiro Nome:
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    className="form-control form-control-sm"
                    onBlur={(event) => validarNome(event.target)}
                    onChange={handleInputChange}
                    value={responsavelData.nome}
                    placeholder="Digite o nome do responsável"
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
                    onBlur={(event) => validarNome(event.target)}
                    onChange={handleInputChange}
                    value={responsavelData.sobrenome}
                    placeholder="Digite o sobrenome do responsável"
                  />
                </div>
              </div>
            </div>

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
                    onBlur={(event) => validarCPF(event.target)}
                    onChange={handleInputChange}
                    value={responsavelData.cpf}
                    disabled={isEditMode}
                    placeholder="000.000.000-00"
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
                    onBlur={(event) => validarRG(event.target)}
                    onChange={handleInputChange}
                    value={responsavelData.rg}
                    placeholder="Digite o RG do responsável"
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
                    onBlur={(event) => validarCelular(event.target)}
                    onChange={handleInputChange}
                    value={responsavelData.telefone}
                    placeholder="(00)00000-0000"
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
                    onBlur={(event) => validarEmail(event.target)}
                    onChange={handleInputChange}
                    value={responsavelData.email}
                    placeholder="responsavel@gmail.com"
                  />
                </div>
              </div>
            </div>

            {renderizarCampoAlunos()}

            <div className="pt-4 d-flex justify-content-center">
              <div className="mr-3">
                <button
                  className="btn btn-primary py-1 px-3 btn-gradient"
                  type="reset"
                  onClick={limparFormulario}
                >
                  LIMPAR
                </button>
              </div>
              <div className="mr-3">
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
              <div id="mensagem">
                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    <div className="centraliza">{successMessage}</div>
                  </div>
                )}
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    <div className="centraliza">{errorMessage}</div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Dados
                responsaveis={responsaveis}
                handleEdit={handleEdit}
                onResponsavelDeleted={carregarResponsaveis}
                limparFormulario={limparFormulario}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroResponsavel;