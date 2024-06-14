class Funcionarios {

  constructor(db) {
    this.db = db;
  }

  async getFuncionarios() {
    const funcionarios = await this.db.ExecutaComando(
      "select * from funcionarios"
    );
    return funcionarios;
  }

  async filtrar({ termo }) {
    const sql = `
      SELECT * FROM funcionarios
      WHERE nome LIKE '%${termo}%' OR cpf LIKE '%${termo}%'
    `;
    const funcionarios = await this.db.ExecutaComando(sql);
    return funcionarios;
  }

  async create(dadosFuncionario) {
    await this.db.ExecutaComandoNonQuery(
      "INSERT INTO funcionarios set ?",
      dadosFuncionario
    );
  }

  async update(matricula, dadosFuncionario) {
    await this.db.ExecutaComando("UPDATE funcionarios set ? where matricula=?", [
      dadosFuncionario,
      matricula,
    ]);
  }

  async getByMatricula(matricula) {
    const result = await this.db.ExecutaComando(
      "SELECT * FROM funcionarios WHERE matricula = ?",
      [matricula]
    );
    const funcionario = result[0];
    return funcionario;
  }

  async deleteByMatricula(matricula) {
    await this.db.ExecutaComandoNonQuery(
      "DELETE FROM funcionarios WHERE matricula=?",
      [matricula]
    );
  }
}

module.exports = Funcionarios;
