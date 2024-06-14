// Validações Formulário

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

export const validarCelular = (input) => {
  const numero = input.value.replace(/\D/g, "");

  if (!numero) {
    console.log("Validar Celular: true (vazio)", numero);
    return true;
  }

  const isFormatoValido = numero.length === 11 && numero.charAt(2) === "9";

  const codArea = numero.substr(0, 2);
  const codAreaValidos = [
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "21",
    "22",
    "24",
    "27",
    "28",
    "31",
    "32",
    "33",
    "34",
    "35",
    "37",
    "38",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "51",
    "53",
    "54",
    "55",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "68",
    "69",
    "71",
    "73",
    "74",
    "75",
    "77",
    "79",
    "81",
    "82",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
    "89",
    "91",
    "92",
    "93",
    "94",
    "95",
    "96",
    "97",
    "98",
    "99",
  ];
  const isCodAreaValido = codAreaValidos.includes(codArea);

  const isValido = isFormatoValido && isCodAreaValido;

  console.log("Validar Celular:", isValido, numero);

  if (!isValido) {
    input.style.borderColor = "red";
    input.style.borderWidth = "1px";
    alert("Número de Celular Inválido. Digite Novamente.");
    input.value = "";
    return false;
  }

  input.style.borderColor = "#8AC78A";
  input.style.borderWidth = "1px";
  return true;
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

export const validarCPF = (cpfInput) => {
  if (!cpfInput) {
    console.error("Elemento de CPF não encontrado");
    return false;
  }

  let cpf = cpfInput.value.replace(/\D/g, "");
  let isValido = true;

  if (!cpf) return true;

  if (
    [
      "00000000000",
      "11111111111",
      "22222222222",
      "33333333333",
      "44444444444",
      "55555555555",
      "66666666666",
      "77777777777",
      "88888888888",
      "99999999999",
    ].includes(cpf) ||
    cpf.length !== 11
  ) {
    isValido = false;
  }

  if (isValido) {
    let add = 0;
    for (let i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    rev = rev === 10 || rev === 11 ? 0 : rev;

    if (rev !== parseInt(cpf.charAt(9))) {
      isValido = false;
    }

    if (isValido) {
      add = 0;
      for (let i = 0; i < 10; i++) {
        add += parseInt(cpf.charAt(i)) * (11 - i);
      }
      rev = 11 - (add % 11);
      rev = rev === 10 || rev === 11 ? 0 : rev;

      if (rev !== parseInt(cpf.charAt(10))) {
        isValido = false;
      }
    }
  }

  if (!isValido) {
    cpfInput.style.borderColor = "red";
    cpfInput.style.borderWidth = "1px";
    alert("CPF inválido. Digite novamente");
    cpfInput.value = "";
  } else {
    cpfInput.style.borderColor = "#8AC78A";
    cpfInput.style.borderWidth = "1px";
  }
  return isValido;
};

export const validarNome = (input) => {
  const nome = input.value.trim();
  if (!nome) return true;

  const isValido = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/.test(nome);
  console.log("Validar Nome:", isValido, nome);

  if (!isValido) {
    input.style.borderColor = "red";
    input.style.borderWidth = "1px";
    alert("Nome inválido. Digite novamente");
    input.value = "";
    return false;
  } else {
    input.style.borderColor = "#8AC78A";
    input.style.borderWidth = "1px";
    return true;
  }
};

export const validarRG = (input) => {
  if (input.value.trim() !== "") {
    input.style.borderColor = "#8AC78A";
  }
};
