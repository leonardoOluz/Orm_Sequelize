const dataBase = require('../models');
const { TurmasServices, NiveisServices } = require('../services')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const turmasServices = new TurmasServices()

class TurmasController {
    /* pegaTodosAsTurmas Ok */
    static async pegaTodosAsTurmas(req, res) {
        const { data_inicial, data_final } = req.query;
        const where = {}
        data_inicial || data_final ? where.data_inicio = {} : null
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
        data_final ? where.data_inicio[Op.lte] = data_final : null

        try {
            const todosOsTurmas = await turmasServices.pegaTodosOsRegistros({ where })
            res.status(200).json(todosOsTurmas)
        } catch (error) {
            res.status(500).json({ msg: `${error.message}` })
        }
    }
    /* pegaUmaTurma Ok */
    static async pegaUmaTurma(req, res) {
        const { id } = req.params;
        try {
            const Turma = await turmasServices.pegaUmRegistro(Number(id))
            return res.status(200).json(Turma)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
    /* criarTurmas Ok */
    static async criarTurmas(req, res) {
        const turmas = req.body;
        try {
            const novaTurma = await turmasServices.criarRegistro(turmas)
            return res.status(201).json(novaTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    /* atualizarTurmas Ok */
    static async atualizarTurmas(req, res) {
        const { id } = req.params;
        const TurmasAtualizado = req.body;
        try {
            await turmasServices.atualizaRegistro(TurmasAtualizado, Number(id))
            const Turmas = await turmasServices.pegaUmRegistro(Number(id))
            return res.status(201).json(Turmas);
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` });
        }

    }
    /* deletarTurmas Ok */
    static async deletarTurmas(req, res) {
        const { id } = req.params;
        try {
            await turmasServices.apagaRegistro(Number(id))
            return res.status(201).json({ msg: `Turmas deletado com sucesso!` })
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` });
        }
    }
    /* restauraTurma Ok */
    static async restauraTurma(req, res) {
        const { id } = req.params
        try {
            await turmasServices.restauraRegistro(Number(id))
            return res.status(200).json({ mensagem: `id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = TurmasController;