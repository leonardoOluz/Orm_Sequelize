const { PessoasServices, MatriculasServices } = require('../services');
const pessoasServices = new PessoasServices()
const matriculasServices = new MatriculasServices()


class PessoaController {
    /* pegaTodasAsPessoas ok */
    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasPessoas = await pessoasServices.pegaTodosRegistros()
            return res.status(200).json(todasPessoas);
        } catch (error) {
            return res.status(500).json({ msg: ` ${error.message}Erro no servidor` });
        }
    }
    /* pegaPessoasAtivas ok */
    static async pegaPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos();
            return res.status(200).json(pessoasAtivas);
        } catch (error) {
            return res.status(500).json({ msg: ` ${error.message}Erro no servidor` });
        }
    }
    /* pegaUmaPessoa ok */
    static async pegaUmaPessoa(req, res) {
        const { id } = req.params
        try {
            const umaPessoa = await pessoasServices.pegaUmRegistro(Number(id))
            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message} erro do servidor` })
        }
    }
    /* criarPessoa ok*/
    static async criarPessoa(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await pessoasServices.criarRegistro(novaPessoa)
            return res.status(201).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message} erro do servidor` })
        }
    }
    /* atualizarPessoa ok*/
    static async atualizarPessoa(req, res) {
        const { id } = req.params
        const atualizarInfos = req.body
        try {
            await pessoasServices.atualizaRegistro(atualizarInfos, Number(id))
            const infosAtualizada = await pessoasServices.pegaUmRegistro(Number(id))
            return res.status(201).json(infosAtualizada)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
    /* deletarPessoa ok*/
    static async deletarPessoa(req, res) {
        const { id } = req.params
        try {
            await pessoasServices.apagaRegistro(Number(id))
            return res.status(201).json({ msg: `Dados excluído com sucesso!` })
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
    /* pegaUmaMatricula Ok */
    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {           
            const umaMatricula = await matriculasServices.pegarMatriculaPorPessoaEMatriculaId({ id: Number(matriculaId), estudante_id: Number(estudanteId) })
            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message} erro do servidor` })
        }
    }
    /* criarMatricula ok*/
    static async criarMatricula(req, res) {
        const { estudanteId } = req.params
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try {
            await pessoasServices.criarMatriculaAtivarPessoa(novaMatricula)
            return res.status(201).json({ msg: `Pessoa ativa e matriculada` })
        } catch (error) {
            return res.status(500).json({ msg: `${error.message} erro do servidor` })
        }
    }
    /*atualizarMatricula Ok*/
    static async atualizarMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params        
        const atualizarInfos = req.body        
        try {
            await matriculasServices.atualizarMatricula(atualizarInfos, {id: Number(matriculaId), estudante_id: Number(estudanteId)})
            const matriculasAtualizada = await matriculasServices.pegaUmRegistro(Number(matriculaId))
            return res.status(201).json(matriculasAtualizada)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
    /* deletarMatricula Ok */
    static async deletarMatricula(req, res) {
        const { estudanteid, matriculaId } = req.params
        try {            
            await matriculasServices.apagaRegistro(Number(matriculaId))
            return res.status(201).json({ msg: `Matricula de Id: ${matriculaId} excluído com sucesso!` })
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
    /* restauraPessoa ok */
    static async restauraPessoa(req, res) {
        const { id } = req.params;
        try {
            await pessoasServices.restauraRegistro(Number(id))
            return res.status(200).json({ mensagem: `Id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    /* restauraMatricula ok */
    static async restauraMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await matriculasServices.restauraRegistroObjs({id: Number(matriculaId), estudante_id:Number(estudanteId)})
            return res.status(200).json({ mensagem: `Matricula de id ${matriculaId} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    /* pegaMatriculas Ok */
    static async pegaMatriculas(req, res) {
        const { estudanteId } = req.params
        try {
            const pessoa = await pessoasServices.pegaUmRegistro(Number(estudanteId))
            const matriculas = await pessoa.getAulasMatriculadas()
            return res.status(201).json(matriculas)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
    /* pegaMatriculasPorTurma Ok */
    static async pegaMatriculasPorTurma(req, res) {
        const { turmaId } = req.params
        try {
            const todasAsMatriculas = await matriculasServices.todasAsMatriculas(turmaId)
            return res.status(200).json(todasAsMatriculas)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
    /* pegaTurmasLotadas Ok */
    static async pegaTurmasLotadas(req, res) {  
        try {
            const turmasLotadas = await matriculasServices.pegarTurmasLotadas()
            res.status(200).json(turmasLotadas.count)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }    
    /* cancelaPessoa ok */
    static async cancelaPessoa(req, res) {
        const { estudanteId } = req.params;
        try {
            await pessoasServices.cancelaPessoaEMAtriculas(Number(estudanteId))
            return res.status(200).json({ message: `Matricula ref. estudante ${estudanteId} canceladas` })
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
}

module.exports = PessoaController;
