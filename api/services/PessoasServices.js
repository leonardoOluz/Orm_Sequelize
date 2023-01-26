const Services = require('./Services');
const dataBase = require('../models')

class PessoasServices extends Services {
    constructor() {
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
    }

    async pegaRegistrosAtivos(where = {}) {
        return dataBase[this.nomeDoModelo].findAll({ where: { ...where } })
    }
    async pegaTodosRegistros(where = {}) {
        return dataBase[this.nomeDoModelo].scope('todos').findAll({ where: { ...where } })
    }
    async adicionarPessoaMatricula(estudanteId) {
        const { estudante_id } = estudanteId

        return dataBase.sequelize.transaction(async transacao => {
            await super.atualizaRegistroDeDesativados({ ativo: true }, Number(estudante_id), { transaction: transacao })
            await this.matriculas.criarRegistro(estudanteId, { transaction: transacao })
        })
    }
    async cancelaPessoaEMAtriculas(estudanteId) {

        return dataBase.sequelize.transaction(async transacao => {
            await super.atualizaRegistro({ ativo: false }, estudanteId, { transaction: transacao })
            await this.matriculas.atualizaRegistros({ status: 'cancelado' }, { estudante_id: estudanteId }, { transaction: transacao })
        })
    }

}

module.exports = PessoasServices;