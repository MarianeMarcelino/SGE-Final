const express = require("express");
const cors = require("cors");
const app = express();
const porta = 3001;
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const responsavelRoutes = require("./routes/responsavelRoutes");
app.use("/responsavel", responsavelRoutes);

const alunoRoutes = require("./routes/alunoRoutes");
app.use("/aluno", alunoRoutes);

const disciplinaRoutes = require("./routes/disciplinaRoutes");
app.use("/disciplina", disciplinaRoutes);

const agendaRoutes = require("./routes/agendaRoutes");
app.use("/agenda", agendaRoutes);

const turmaRoutes = require("./routes/turmaRoutes");
app.use("/turma", turmaRoutes);

const matriculaRoutes = require("./routes/matriculaRoutes");
app.use("/matricula", matriculaRoutes);

const professorRoutes = require("./routes/professorRoutes");
app.use("/professor", professorRoutes);

const funcionarioRoutes = require("./routes/FuncionarioRoutes.js");
app.use("/funcionarios", funcionarioRoutes);

const emailRoutes = require("./routes/emailRoutes"); 
app.use("/email", emailRoutes);

const agendamentoRoutes = require("./routes/agendamentoRoutes");
app.use("/agendamento", agendamentoRoutes);

const notaRoutes = require("./routes/notaRoutes");
app.use("/nota", notaRoutes);

app.listen(porta, () => {
  console.log("Servidor escutando na porta:", porta);
});
