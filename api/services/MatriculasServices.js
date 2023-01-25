const Services = require('./Services');

class MatriculasServices extends Services {
    constructor() {
        super('Matriculas')
    }
    async criarMatriculaPessoa(estudanteId) {
        await super.criarRegistro(estudanteId)        
    }
    // métodos específicos do controlador de Matrículas 
}

module.exports = MatriculasServices;