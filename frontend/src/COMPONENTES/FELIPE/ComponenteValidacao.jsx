// Validações Formulário

export const isAnoMaiorQueAtual = (event) => {
  const dataNascimentoInput = event.target;
    const anoAtual = new Date().getFullYear();
    const anoSelecionado = new Date(dataNascimentoInput.value).getFullYear();

    if (anoSelecionado > anoAtual) {
      dataNascimentoInput.value = "";
      dataNascimentoInput.style.borderColor = "red";
      dataNascimentoInput.style.borderWidth = "1px";
    } else {
      dataNascimentoInput.style.borderColor = "#8AC78A";
      dataNascimentoInput.style.borderWidth = "1px";
    }
};

export const validarSelecao = (select) => {
  const valorSelecionado = select.value;
  const isValido = valorSelecionado !== "";
  console.log("Validar Seleção:", isValido, valorSelecionado);
  if (valorSelecionado === "") {
    alert("Selecione a opção");
    select.style.borderColor = "red";
    select.style.borderWidth = "1px";
    return false;
  }
  select.style.borderColor = "#8AC78A";
  select.style.borderWidth = "1px";
  return true;
};

export const validarEmail = (input) => {
  const email = input.value.trim();

  if (!email) {
    console.log("Validar Email: true (vazio)", email);
    return true;
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const dominio = email.split("@")[1];
  const dominioValido = /\.\w{2,}$/.test(dominio);
  const isValido = regex.test(email) && dominioValido;

  console.log("Validar Email:", isValido, email);

  if (!isValido) {
    input.style.borderColor = "red";
    input.style.borderWidth = "1px";
    alert("E-mail inválido. Digite novamente.");
    input.value = "";
    return false;
  }

  input.style.borderColor = "#8AC78A";
  input.style.borderWidth = "1px";
  return true;
};

export const validarCelular = (event) => {
  const numeroInput = event.target;
  const numero = numeroInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (!numero) {
    // Número vazio, considerado válido
    numeroInput.style.borderColor = "#8AC78A";
    numeroInput.style.borderWidth = "1px";
    return;
  }

  const isFormatoValido = numero.length === 11 && numero.charAt(2) === "9";
  const codArea = numero.substr(0, 2);
  const codAreaValidos = [
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "21", "22", "24",
    "27", "28", "31", "32", "33", "34", "35", "37", "38", "41", "42", "43",
    "44", "45", "46", "47", "48", "49", "51", "53", "54", "55", "61", "62",
    "63", "64", "65", "66", "67", "68", "69", "71", "73", "74", "75", "77",
    "79", "81", "82", "83", "84", "85", "86", "87", "88", "89", "91", "92",
    "93", "94", "95", "96", "97", "98", "99",
  ];

  const isCodAreaValido = codAreaValidos.includes(codArea);
  const isValido = isFormatoValido && isCodAreaValido;

  if (!isValido) {
    numeroInput.style.borderColor = "red";
    numeroInput.style.borderWidth = "1px";
    alert("Número de Celular Inválido. Digite Novamente.");
    numeroInput.value = "";
  } else {
    numeroInput.style.borderColor = "#8AC78A";
    numeroInput.style.borderWidth = "1px";
  }
};

export const mascaraCelular = (event) => {
  if (!event || !event.target) {
    console.error("Evento ou elemento de entrada não fornecido");
    return;
  }
  let numero = event.target.value.replace(/\D/g, "");
  if (numero.length > 10) {
    numero = `(${numero.substring(0, 2)}) ${numero.substring(
      2,
      7
    )}-${numero.substring(7, 11)}`;
  } else if (numero.length > 6) {
    numero = `(${numero.substring(0, 2)}) ${numero.substring(
      2,
      7
    )}-${numero.substring(7)}`;
  } else if (numero.length > 2) {
    numero = `(${numero.substring(0, 2)}) ${numero.substring(2)}`;
  }
  event.target.value = numero;
};

export const mCpf = (event) => {
  if (!event || !event.target) {
    console.error("Evento ou elemento de entrada não fornecido");
    return;
  }

  let cpf = event.target.value.replace(/\D/g, "");

  cpf = cpf.slice(0, 11);

  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  event.target.value = cpf;
};

export const mCEP = (event) => {
  if (!event || !event.target) {
      console.error("Evento ou elemento de entrada não fornecido");
      return;
  }

  let cep = event.target.value.replace(/\D/g, "");

  cep = cep.slice(0, 8);

  cep = cep.replace(/(\d{5})(\d)/, "$1-$2");

  event.target.value = cep;
};

export const validarCPF = (event) => {
  const cpfInput = event.target;
  const cpf = cpfInput.value.replace(/\D/g, "");
  const isValido = validarCpfAlgoritmo(cpf);

  if (!isValido) {
    cpfInput.value = "";
    cpfInput.style.borderColor = "red";
    cpfInput.style.borderWidth = "1px";
    cpfInput.placeholder = "CPF inválido";
  } else {
    cpfInput.style.borderColor = "#8AC78A";
    cpfInput.style.borderWidth = "1px";
  }
};

const validarCpfAlgoritmo = (cpf) => {
  let add = 0;

  for (let i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let rev = 11 - (add % 11);
  rev = rev === 10 || rev === 11 ? 0 : rev;

  if (rev !== parseInt(cpf.charAt(9))) {
    return false;
  }

  add = 0;
  for (let i = 0; i < 10; i++) {
    add += parseInt(cpf.charAt(i)) * (11 - i);
  }

  rev = 11 - (add % 11);
  rev = rev === 10 || rev === 11 ? 0 : rev;

  return rev === parseInt(cpf.charAt(10));
};

export const validarInputText = (input) => {
  const nome = input.value.trim();
  if (!nome) return true;

  const isValido = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/.test(nome);
  console.log("Validar Nome:", isValido, nome);

  if (!isValido) {
    input.style.borderColor = "red";
    input.style.borderWidth = "1px";
    alert("Campo inválido. Digite novamente");
    input.value = "";
    return false;
  } else {
    input.style.borderColor = "#8AC78A";
    input.style.borderWidth = "1px";
    return true;
  }
};

export const validarRG = (event) => {
  const rgInput = event.target;
  const rg = rgInput.value;
  const padraoRG = /^(\d{2}\.\d{3}\.\d{3}-)(\d|X)$/;

  if (padraoRG.test(rg)) {
    rgInput.style.borderColor = "#8AC78A";
    rgInput.style.borderWidth = "1px";
    return true;
  } else {
    rgInput.style.borderColor = "red";
    rgInput.style.borderWidth = "1px";
    rgInput.placeholder = "Campo inválido. Digite novamente";
    rgInput.value = "";
    return false; // indicando que a validação falhou
  }
};
