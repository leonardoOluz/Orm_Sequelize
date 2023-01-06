const dataBase = require('../models');

class PessoaController {
    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await dataBase.Pessoas.findAll();
            return res.status(200).json(todasAsPessoas);
        } catch (error) {
            return res.status(500).json({ msg: ` ${error.message}Erro no servidor` });
        }
    }
    static async pegaUmaPessoa(req, res) {
        const { id } = req.params
        try {
            const umaPessoa = await dataBase.Pessoas.findOne({ where: { id: Number(id) } });
            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message} erro do servidor` })
        }
    }
    static async criarPessoa(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await dataBase.Pessoas.create(novaPessoa)
            return res.status(201).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message} erro do servidor` })
        }
    }
    static async atualizarPessoa(req, res) {
        const { id } = req.params
        const atualizarInfos = req.body
        try {
            await dataBase.Pessoas.update(atualizarInfos, { where: { id: Number(id) } })
            const infosAtualizada = await dataBase.Pessoas.findOne({ where: { id: Number(id) } })
            return res.status(201).json(infosAtualizada)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
    static async deletarPessoa(req, res) {
        const { id } = req.params
        try {
            await dataBase.Pessoas.destroy({ where: {id: Number(id)}})
            return res.status(201).json({ msg: `Dados excluído com sucesso!`})
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
}


module.exports = PessoaController;
