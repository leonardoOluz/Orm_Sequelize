const Sequelize = require('sequelize');
const dataBase = require('../models');

class PessoaController {
    static async pegaPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await dataBase.Pessoas.findAll();
            return res.status(200).json(pessoasAtivas);
        } catch (error) {
            return res.status(500).json({ msg: ` ${error.message}Erro no servidor` });
        }
    }
    static async pegaTodasAsPessoas(req, res) {
        try {
            const pessoasAtivas = await dataBase.Pessoas.scope('todos').findAll();
            return res.status(200).json(pessoasAtivas);
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
            await dataBase.Pessoas.destroy({ where: { id: Number(id) } })
            return res.status(201).json({ msg: `Dados excluído com sucesso!` })
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            const umaMatricula = await dataBase.Matriculas.findOne(
                {
                    where:
                    {
                        id: Number(matriculaId),
                        estudante_id: Number(estudanteId)
                    }
                });
            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message} erro do servidor` })
        }
    }
    static async criarMatricula(req, res) {
        const { estudanteId } = req.params
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try {
            const novaMatriculaCriada = await dataBase.Matriculas.create(novaMatricula)
            return res.status(201).json(novaMatriculaCriada)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message} erro do servidor` })
        }
    }
    static async atualizarMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        const atualizarInfos = req.body
        try {
            await dataBase.Matriculas.update(atualizarInfos, {
                where:
                {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            const matriculasAtualizada = await dataBase.Matriculas.findOne({ where: { id: Number(matriculaId) } })
            return res.status(201).json(matriculasAtualizada)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
    static async deletarMatricula(req, res) {
        const { estudanteid, matriculaId } = req.params

        try {
            await dataBase.Matriculas.destroy({ where: { id: Number(matriculaId) } })
            return res.status(201).json({ msg: `Matricula de Id: ${matriculaId} excluído com sucesso!` })
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
    static async restauraPessoa(req, res) {
        const { id } = req.params;
        try {
            await dataBase.Pessoas.restore({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: `Id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async restauraMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await dataBase.Matriculas.restore({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json({ mensagem: `Matricula de id ${matriculaId} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async pegaMatriculas(req, res) {
        const { estudanteId} = req.params

        try {
            const pessoa  = await dataBase.Pessoas.findOne({where:{id: Number(estudanteId)}})
            const matriculas = await pessoa.getAulasMatriculadas()             
            return res.status(201).json(matriculas)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
    static async pegaMatriculasPorTurma(req, res) {
        const { turmaId} = req.params

        try {
            const todasAsMatriculas = await dataBase.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                },
                limit: 20,
                order: [['estudante_id','DESC']]
            })
        return res.status(200).json(todasAsMatriculas)

        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
    static async pegaTurmasLotadas(req, res) {
        const lotacaoTurma = 2;

        try {
            const turmasLotadas = await dataBase.Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })
            res.status(200).json(turmasLotadas.count)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
    static async cancelaPessoa(req, res) {
        const {estudanteId} = req.params;
        try {
            await dataBase.Pessoas
            .update({ativo: false}, {where: {id: Number(estudanteId)}})
            await dataBase.Matriculas
            .update({status: 'cancelado'}, {where: {estudante_id: Number(estudanteId)}})
            return res.status(200).json({message: `Matricula ref, estudante ${estudanteId} canceladas`})
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }

}

module.exports = PessoaController;
