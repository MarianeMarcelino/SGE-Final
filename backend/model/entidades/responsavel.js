// class Responsavel {

//     constructor(db) {
//         this.db = db;
//     }

//     //Obter todos os itens Cadastrados na tabela 
//     async getAll(){

//         const responsavel = await this.db.ExecutaComando('select * from responsavel');
//         return responsavel;
//     }

//     async filtrar ({nome}){
//         let sql=`select * from responsavel where nome like '${nome}%'`
//         const responsavel = await this.db.ExecutaComando(sql, [`${nome}%`]);
//         return responsavel
//     }

//     async create (dadosResponsavel){
//         await this.db.ExecutaComandoNonQuery('insert into responsavel set?',dadosResponsavel)
//     }

//     async getById(cpf){
//         const result = await this.db.ExecutaComando('SELECT * FROM responsavel WHERE cpf = ?',[cpf])
//         const responsavel = result[0];
//         return responsavel;
//     }

//     async delete(cpf){
//         await this.db.ExecutaComandoNonQuery('delete from responsavel where cpf=?',[cpf])
//     }

//     async update(cpf,dadosResponsavel){
//         await this.db.ExecutaComando('update responsavel set ? where cpf = ?',[dadosResponsavel,cpf])

//     }



// }

// module.exports=Responsavel

class Responsavel {
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        const responsavel = await this.db.ExecutaComando('SELECT * FROM responsavel');
        return responsavel;
    }

    async filtrar({ nome }) {
        const sql = `SELECT * FROM responsavel WHERE nome LIKE ?`;
        const likeNome = `${nome}%`;
        const responsavel = await this.db.ExecutaComando(sql, [likeNome]);
        return responsavel;
    }

    async create(dadosResponsavel) {
        await this.db.ExecutaComandoNonQuery('INSERT INTO responsavel SET ?', dadosResponsavel);
    }

    async getById(cpf) {
        const result = await this.db.ExecutaComando('SELECT * FROM responsavel WHERE cpf = ?', [cpf]);
        const responsavel = result[0];
        return responsavel;
    }

    async delete(cpf) {
        await this.db.ExecutaComandoNonQuery('DELETE FROM responsavel WHERE cpf = ?', [cpf]);
    }

    async update(cpf, dadosResponsavel) {
        await this.db.ExecutaComandoNonQuery('UPDATE responsavel SET ? WHERE cpf = ?', [dadosResponsavel, cpf]);
    }
}

module.exports = Responsavel;
