const dataBase = require('../models');

class PessoaController {
    static async pegaTodasAsPessoas(req, res){
        try {
            const todasAsPessoas = await dataBase.Pessoas.findAll();
            return res.status(200).json(todasAsPessoas);            
        } catch (error) {
            return res.status(500).json({msg: ` ${error.message}Erro no servidor`});
        }
    }
}


module.exports = PessoaController;
