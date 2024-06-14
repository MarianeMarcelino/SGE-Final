import React, { useState } from "react";
import "./CadastroFuncionario.css";
import { Estados } from "./Listas";
import { funcoes } from "./Listas";
import InputMask from "react-input-mask";
import ListaFuncionarios from "./ListaFuncionario";
import FuncionarioService from "../../SERVICES/funcionarioService";

const funcionarioService = new FuncionarioService();

function FormFuncionario({ isMenuExpanded }) {
  const [funcionarioEditando, setFuncionarioEditando] = useState(null);
  const [funcionarioData, setFuncionarioData] = useState({
    matricula: "",
    nome: "",
    sobrenome: "",
    sexo: "",
    dataNascimento: "",
    cpf: "",
    rg: "",
    funcao: "",
    email: "",
    telefone: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    cep: "",
    estado: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFuncionarioData({ ...funcionarioData, [name]: value });
  };
  const clearAlertAfterDelay = () => {
    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
      window.location.reload();
    }, 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const nome = form.nome.value;
    const sobrenome = form.sobrenome.value;
    const sexo = form.sexo.value;
    const dataNascimento = form.dataNascimento.value;
    const cpf = form.cpf.value;
    const rg = form.rg.value;
    const funcao = form.funcao.value;
    const matricula = form.matricula.value;
    const email = form.email.value;
    const telefone = form.telefone.value;
    const rua = form.rua.value;
    const numero = form.numero.value;
    const bairro = form.bairro.value;
    const cidade = form.cidade.value;
    const cep = form.cep.value;
    const estado = form.estado.value;

    // Validação se todos os campos estão preenchidos
    if (
      !nome ||
      !sobrenome ||
      !sexo ||
      !dataNascimento ||
      !cpf ||
      !rg ||
      !funcao ||
      !matricula ||
      !email ||
      !telefone ||
      !rua ||
      !numero ||
      !bairro ||
      !cidade ||
      !cep ||
      !estado
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Validação para garantir que os campos de nome e sobrenome não contenham números
    const validarNome = (valor) => {
      return /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/.test(valor);
    };

    if (!validarNome(nome)) {
      alert("O campo nome deve conter apenas letras.");
      return;
    }

    if (!validarNome(sobrenome)) {
      alert("O campo sobrenome deve conter apenas letras.");
      return;
    }

    //Validação email
    const validarEmail = (valor) => {
      console.log("Valor do email:", valor);
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    };
    if (!validarEmail(email)) {
      alert("Por favor, informe um email válido.");
      return;
    }
    //validar telefone

    const validarTelefone = (valor) => {
      return /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(valor);
    };
    if (!validarTelefone(telefone)) {
      alert("Por favor, informe um número de telefone válido.");
      return;
    }

    // Validação da data de nascimento
    const hoje = new Date();
    const dataNascimentoDate = new Date(dataNascimento);
    if (dataNascimentoDate > hoje) {
      alert("A data de nascimento não pode ser futura.");
      return;
    }

    if (!validateCPF(cpf)) {
      alert("CPF inválido.");
      return;
    }

    console.log("Formulário válido, pronto para enviar.");

    const clearAlertAfterDelay = () => {
      setTimeout(() => {
        setAlertMessage("");
        setAlertType("");
        window.location.reload();
      }, 3000);
    };

    try {
      if (funcionarioEditando === null) {
        await funcionarioService.createFuncionario(funcionarioData);
        setAlertMessage("Funcionário cadastrado com sucesso.");
        setAlertType("success");
        clearAlertAfterDelay();
        setFuncionarioData({
          matricula: "",
          nome: "",
          sobrenome: "",
          sexo: "",
          dataNascimento: "",
          cpf: "",
          rg: "",
          funcao: "",
          email: "",
          telefone: "",
          rua: "",
          numero: "",
          bairro: "",
          cidade: "",
          cep: "",
          estado: "",
        });
      } else {
        await funcionarioService.updateFuncionario(
          funcionarioEditando.matricula,
          funcionarioData
        );
        alert("Atualizado com sucesso!");
      }
    } catch (error) {
      setAlertMessage("Erro ao cadastrar funcionário: " + error.message);
      setAlertType("danger");
      clearAlertAfterDelay();
    }
  };

  // Função de validação do CPF
  const validateCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstDigit = 11 - (sum % 11);
    if (firstDigit > 9) {
      firstDigit = 0;
    }

    if (parseInt(cpf.charAt(9)) !== firstDigit) {
      return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondDigit = 11 - (sum % 11);
    if (secondDigit > 9) {
      secondDigit = 0;
    }

    if (parseInt(cpf.charAt(10)) !== secondDigit) {
      return false;
    }

    return true;
  };
  const handleClear = () => {
    setFuncionarioData({
      matricula: "",
      nome: "",
      sobrenome: "",
      sexo: "",
      dataNascimento: "",
      cpf: "",
      rg: "",
      funcao: "",
      email: "",
      telefone: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      cep: "",
      estado: "",
    });
    if (funcionarioEditando !== null) {
      setFuncionarioEditando(null);
    }
  };

  return (
    <div
      id="formularioResponsavel"
      className={isMenuExpanded ? "expanded" : ""}
    >
      <div className="content-section" id="funcionarios-section">
        <form
          onSubmit={handleSubmit}
          method="POST"
          action="#"
          id="formulario"
          name="cadastroFuncionario"
        >
          <div
            className="container-fluid py-5 wow fadeInUp"
            data-wow-delay="0.2s"
            style={{ backgroundColor: "#eeeeee", borderRadius: "10px" }}
          >
            <div className="container py-5">
              <div
                className="section-title text-center position-relative pb-3 mx-auto"
                style={{ maxWidth: "600px" }}
              >
                <h3 class="fw-bold text-uppercase">
                    <i class="bi bi-person-badge-fill"> </i>
                    CADASTRO DE FUNCIONÁRIOS
                </h3>
                <br />
              </div>

              <div className="row borda-form">
                <div className="col">
                  <label htmlFor="nome">
                    <strong className="bi bi-person-vcard"> Nome:</strong>
                  </label>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    name="nome"
                    id="nome"
                    placeholder="Digite o nome"
                    value={funcionarioData.nome}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor, informe o nome.
                  </div>
                </div>

                <div className="col">
                  <label htmlFor="sobrenome">
                    <strong className="bi bi-person-vcard"> Sobrenome:</strong>
                  </label>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    name="sobrenome"
                    id="sobrenome"
                    placeholder="Digite o sobrenome"
                    value={funcionarioData.sobrenome}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor, informe o sobrenome.
                  </div>
                </div>

                <div className="col">
                  <label htmlFor="sexo">
                    <strong class="bi bi-gender-ambiguous"> Sexo:</strong>
                  </label>
                  <select
                    className="form-control form-control form-control-sm"
                    name="sexo"
                    id="sexo"
                    value={funcionarioData.sexo}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" selected>
                      Selecione o Sexo
                    </option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                  </select>
                  <div className="invalid-feedback">
                    Por favor, informe o sexo.
                  </div>
                </div>

                <div className="col">
                  <label htmlFor="dataNascimento">
                    <strong class="bi bi-calendar-week">
                      {" "}
                      Data de Nascimento:
                    </strong>
                  </label>
                  <input
                    className="form-control form-control form-control-sm"
                    type="date"
                    name="dataNascimento"
                    id="dataNascimento"
                    value={funcionarioData.dataNascimento}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor, informe a data de nascimento.
                  </div>
                </div>
              </div>

              <div className="row mt-3 borda-form">
                <div className="col">
                  <label htmlFor="cpf">
                    <strong class="bi bi-credit-card"> CPF:</strong>
                  </label>
                  <InputMask
                    mask="999.999.999-99"
                    maskPlaceholder={null}
                    className="form-control form-control form-control-sm"
                    type="text"
                    name="cpf"
                    id="cpf"
                    placeholder="000.000.000-00"
                    value={funcionarioData.cpf}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor, informe o número do CPF.
                  </div>
                </div>

                <div className="col">
                  <label htmlFor="rg">
                    <strong class="bi bi-credit-card"> RG:</strong>
                  </label>
                  <input
                    className="form-control form-control form-control-sm"
                    type="text"
                    name="rg"
                    id="rg"
                    value={funcionarioData.rg}
                    onChange={handleInputChange}
                    placeholder="00.000.000-0"
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor, informe o número do RG.
                  </div>
                </div>

                <div className="col">
                  <label htmlFor="funcao">
                    <strong class="bi bi-person-gear"> Função:</strong>
                  </label>
                  <select
                    className="form-control form-control form-control-sm"
                    name="funcao"
                    id="funcao"
                    value={funcionarioData.funcao}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" selected>
                      Selecione o Função
                    </option>
                    {funcoes()}
                  </select>
                  <div className="invalid-feedback">
                    Por favor, selecione o Função.
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="matricula">
                    <strong class="bi bi-clipboard-plus-fill">
                      {" "}
                      Matrícula:
                    </strong>
                  </label>
                  <input
                    className="form-control form-control form-control-sm"
                    type="text"
                    name="matricula"
                    id="matricula"
                    placeholder="Digite a matrícula"
                    value={funcionarioData.matricula}
                    onChange={handleInputChange}
                    required
                    disabled={funcionarioEditando !== null}
                  />
                  <div className="invalid-feedback">
                    Por favor, informe a matrícula do funcionário.
                  </div>
                </div>
              </div>

              <div className="row mt-3 borda-form">
                <div className="col">
                  <label htmlFor="email">
                    <strong class="bi bi-envelope-at"> Email:</strong>
                  </label>
                  <input
                    className="form-control form-control form-control-sm"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Digite o email"
                    value={funcionarioData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor, informe um email válido.
                  </div>
                </div>

                <div className="col">
                  <label htmlFor="telefone">
                    <strong class="bi bi-telephone"> Telefone:</strong>
                  </label>
                  <InputMask
                    mask="(99) 99999-9999"
                    maskPlaceholder={null}
                    className="form-control form-control form-control-sm"
                    type="text"
                    name="telefone"
                    id="telefone"
                    placeholder="(00)00000-0000"
                    value={funcionarioData.telefone}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor, informe um número de telefone válido.
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="rua">
                    <strong class="bi bi-geo-alt-fill"> Rua:</strong>
                  </label>
                  <input
                    className="form-control form-control form-control-sm"
                    type="text"
                    name="rua"
                    id="rua"
                    placeholder="Digite a rua"
                    value={funcionarioData.rua}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor, informe a rua.
                  </div>
                </div>

                <div className="col">
                  <label htmlFor="numero">
                    <strong class="bi bi-geo-alt-fill"> Número:</strong>
                  </label>
                  <input
                    className="form-control form-control form-control-sm"
                    type="text"
                    name="numero"
                    id="numero"
                    placeholder="Digite o número"
                    value={funcionarioData.numero}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor, informe o número.
                  </div>
                </div>
              </div>

              <div className="row mt-3 borda-form">
                <div className="col">
                  <label htmlFor="bairro">
                    <strong class="bi bi-geo-alt-fill"> Bairro:</strong>
                  </label>
                  <input
                    className="form-control form-control form-control-sm"
                    type="text"
                    name="bairro"
                    id="bairro"
                    placeholder="Digite o bairro"
                    value={funcionarioData.bairro}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor, informe o bairro.
                  </div>
                </div>

                <div className="col">
                  <label htmlFor="cidade">
                    <strong class="bi bi-geo-alt-fill"> Cidade:</strong>
                  </label>
                  <input
                    className="form-control form-control form-control-sm"
                    type="text"
                    name="cidade"
                    id="cidade"
                    placeholder="Digite a cidade"
                    value={funcionarioData.cidade}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor, informe a cidade.
                  </div>
                </div>

                <div className="col">
                  <label htmlFor="cep">
                    <strong class="bi bi-geo-alt-fill"> CEP:</strong>
                  </label>
                  <InputMask
                    mask="99999-999"
                    maskPlaceholder={null}
                    className="form-control form-control form-control-sm"
                    type="text"
                    name="cep"
                    id="cep"
                    placeholder="00000-000"
                    value={funcionarioData.cep}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor, informe o CEP.
                  </div>
                </div>

                <div className="col">
                  <label htmlFor="estado">
                    <strong class="bi bi-geo-alt-fill"> Estado:</strong>
                  </label>
                  <select
                    className="form-control form-control form-control-sm"
                    name="estado"
                    id="estado"
                    value={funcionarioData.estado}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" selected>
                      Selecione o Estado
                    </option>
                    {Estados()}
                  </select>
                  <div className="invalid-feedback">
                    Por favor, selecione o estado.
                  </div>
                </div>
              </div>

              <div class="pt-4 d-flex justify-content-center">
                <div class="mr-3">
                  <button
                    class="btn btn-primary py-1 px-3 btn-gradient"
                    type="reset"
                    onClick={handleClear}
          
                  >
                    LIMPAR
                  </button>
                </div>

                <div class="mr-3">
                  <button
                    class="btn btn-primary py-1 px-3 btn-gradient"
                    id="cadastrar"
                    type="submit"
                    onClick={clearAlertAfterDelay}
                  >
                    CADASTRAR
                  </button>
                </div>
              </div>
              <div className="custom-alert">
                {alertMessage && (
                  <div className={`alert alert-${alertType}`} role="alert">
                    {alertMessage}
                  </div>
                )}
              </div>
              <div class="pt-5">
                <ListaFuncionarios
                  setFuncionarioData={setFuncionarioData}
                  setFuncionarioEditando={setFuncionarioEditando}
                  setAlertMessage={setAlertMessage}
                  setAlertType={setAlertType}
                  clearAlertAfterDelay={clearAlertAfterDelay}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormFuncionario;
