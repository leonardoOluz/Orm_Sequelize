const dataBase = require('../models');

class TurmasController {
    static async pegaTodosOsTurmas(req, res) {
        try {
            const todosOsTurmas = await dataBase.Turmas.findAll()
            res.status(200).json(todosOsTurmas)
        } catch (error) {
            res.status(500).json({ msg: `${error.message}` })
        }
    }
    static async pegaUmaTurma(req, res) {
        const { id } = req.params;
        try {
            const Turma = await dataBase.Turmas.findOne({ where: { id: Number(id) } })
            return res.status(200).json(Turma)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
    static async criarTurmas(req, res) {
        const Turmas = req.body;
        try {
            const novaTurma = await dataBase.Turmas.create(Turmas);
            return res.status(201).json(novaTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async atualizarTurmas(req, res) {
        const { id } = req.params;
        const TurmasAtualizado = req.body;
        try {
            await dataBase.Turmas.update(TurmasAtualizado, { where: { id: Number(id) } });
            const Turmas = await dataBase.Turmas.findOne({ where: { id: Number(id) } });
            return res.status(201).json(Turmas);
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` });
        }
    }
    static async deletarTurmas(req, res) {
        const { id } = req.params;
        try {
            await dataBase.Turmas.destroy({ where: { id: Number(id) } });
            return res.status(201).json({ msg: `Turmas deletado com sucesso!` })
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` });
        }
    }
    static async restauraTurma(req, res) {
        const { id } = req.params
        try {
            await dataBase.Turmas.restore({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: `id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = TurmasController;