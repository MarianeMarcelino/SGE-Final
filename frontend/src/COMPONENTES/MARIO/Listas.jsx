export function siglas() {
  return [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];
}

export function Estados() {
  const siglasEstados = siglas();
  return siglasEstados.map((sigla, index) => (
    <option key={index} value={sigla}>
      {sigla}
    </option>
  ));
}

export function FuncFuncionarios() {
  return ["Secretário(a)", "Professor(a)"];
}

export function funcoes() {
  const funcFuncion = FuncFuncionarios();
  return funcFuncion.map((func, index) => (
    <option key={index} value={func}>
      {func}
    </option>
  ));
}
