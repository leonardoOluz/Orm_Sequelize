const Services = require('./Services');
const dataBase = require('../models')

class MatriculasServices extends Services {
    constructor() {
        super('Matriculas')
        this.pessoas = new Services('Pessoas')
    }
    async todasAsMatriculas(turmaId){
        return await dataBase[this.nomeDoModelo].findAndCountAll({
            where: {
                turma_id: Number(turmaId),
                status: 'confirmado'
            },
            limit: 20,
            order: [['estudante_id', 'DESC']]
        })
    }
    async atualizarMatricula(atualizarInfos, dados) {
        const { estudante_id } = dados
        return dataBase.sequelize.transaction(async transacao => {
            await super.atualizaRegistros(atualizarInfos, dados,{transaction: transacao})       
            await this.pessoas.atualizaRegistroDeDesativados({ ativo: true }, estudante_id, {transaction: transacao})
        })
    }
    async pegarMatriculaPorPessoaEMatriculaId(dados) {
        return dataBase[this.nomeDoModelo].findOne({ where: { ...dados } })
    }
    // métodos específicos do controlador de Matrículas 
}

module.exports = MatriculasServices;