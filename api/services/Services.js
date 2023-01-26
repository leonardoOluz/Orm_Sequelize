const dataBase = require('../models')

class Services {
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo
    }
    async pegaTodosOsRegistros(where = {}) {// ok
        return dataBase[this.nomeDoModelo].findAll(where)
    }
    async pegaUmRegistro(id) {// ok
        return dataBase[this.nomeDoModelo].findOne({ where: { id: id } })
    }
    async criarRegistro(dados, transacao = {}) {// ok
        return dataBase[this.nomeDoModelo].create(dados, transacao)
        //
    }
    async atualizaRegistroDeDesativados(dadosAtualizados, id, transacao = {}) {// ok
        return dataBase[this.nomeDoModelo].scope('todos').update(dadosAtualizados, { where: { id: id } }, transacao)
    }
    async atualizaRegistro(dadosAtualizados, id, transacao = {}) {// ok
        return dataBase[this.nomeDoModelo]
            .update(dadosAtualizados, { where: { id: id } }, transacao)
    }
    async atualizaRegistros(dadosAtualizados, where, transacao = {}) {//ok
        return dataBase[this.nomeDoModelo]
            .update(dadosAtualizados, { where: { ...where } }, transacao)
    }
    async apagaRegistro(id) {//ok
        return dataBase[this.nomeDoModelo].destroy({ where: { id: id } })
    }
    async restauraRegistro(id) { // ok
        return dataBase[this.nomeDoModelo].restore({ where: { id: id } })
    }
    async restauraRegistroObjs(dadosId) { // ok
        return dataBase[this.nomeDoModelo].restore({ where: { ...dadosId } })
    }
}

module.exports = Services
