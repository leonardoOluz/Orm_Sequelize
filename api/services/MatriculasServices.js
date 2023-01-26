const Services = require('./Services');
const dataBase = require('../models')

class MatriculasServices extends Services {
    constructor() {
        super('Matriculas')
    } 
    /* Precisamos criar uma função para pegar uma matricula passando os id de estudante e matricula */
    async pegarMatriculaPorPessoaEMatriculaId(dados){
        return dataBase[this.nomeDoModelo].findOne({where: {...dados}})
    }
    
    


    // métodos específicos do controlador de Matrículas 
}

module.exports = MatriculasServices;