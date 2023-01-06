const dataBase = require('../models');

class NivelController {
    static async pegaTodosOsNiveis(req, res) {
        try {
            const todosOsNiveis = await dataBase.Niveis.findAll()
            res.status(200).json(todosOsNiveis)
        } catch (error) {
            res.status(500).json({ msg: `${error.message}` })
        }
    }
    static async pegaUmNivel(req, res) {
        const { id } = req.params;
        try {
            const nivel = await dataBase.Niveis.findOne({ where: { id: Number(id) } })
            return res.status(200).json(nivel)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
    static async criarNivel(req, res) {
        const nivel = req.body;
        try {
            const novoNivel = await dataBase.Niveis.create(nivel);
            return res.status(201).json(novoNivel)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
    static async atualizarNivel(req, res) {
        const { id } = req.params;
        const nivelAtualizado = req.body;
        try {
            await dataBase.Niveis.update(nivelAtualizado, { where: { id: Number(id) } });
            const nivel = await dataBase.Niveis.findOne({ where: { id: Number(id) } });
            return res.status(201).json(nivel);
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` });
        }
    }
    static async deletarNivel(req, res) {
        const {id} = req.params;
        try {
            await dataBase.Niveis.destroy({where: {id: Number(id)}});
            return res.status(201).json({msg: `Nivel deletado com sucesso!`})
        } catch (error) {
            return res.status(500).json({msg: `${error.message}`});
        }
    }
}

module.exports = NivelController;