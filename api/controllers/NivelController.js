const Services = require('../services/Services');
const niveisServices = new Services('Niveis');

class NivelController {
    /* pegaTodosOsNiveis Ok */
    static async pegaTodosOsNiveis(req, res) {
        try {
            const todosOsNiveis = await niveisServices.pegaTodosOsRegistros()
            res.status(200).json(todosOsNiveis)
        } catch (error) {
            res.status(500).json({ msg: `${error.message}` })
        }
    }
    /* pegaUmNivel ok */
    static async pegaUmNivel(req, res) {
        const { id } = req.params;
        try {
            const nivel = await niveisServices.pegaUmRegistro(Number(id))
            return res.status(200).json(nivel)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
    /* criarNivel Ok */
    static async criarNivel(req, res) {
        const nivel = req.body;
        try {
            const novoNivel = await niveisServices.criarRegistro(nivel)
            return res.status(201).json(novoNivel)
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` })
        }
    }
    /* atualizarNivel Ok */
    static async atualizarNivel(req, res) {
        const { id } = req.params;
        const nivelAtualizado = req.body;
        try {
            await niveisServices.atualizaRegistro(nivelAtualizado, Number(id)) 
            const nivel = await niveisServices.pegaUmRegistro(Number(id))
            return res.status(201).json(nivel);
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` });
        }
    }
    /* deletarNivel Ok */
    static async deletarNivel(req, res) {
        const { id } = req.params;
        try {
            await niveisServices.apagaRegistro(Number(id))
            return res.status(201).json({ msg: `Nivel deletado com sucesso!` })
        } catch (error) {
            return res.status(500).json({ msg: `${error.message}` });
        }
    }
    /* restauraNivel ok*/
    static async restauraNivel(req, res) {
        const { id } = req.params
        try {
            await niveisServices.restauraRegistro(Number(id))
            return res.status(200).json({ mensagem: `id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = NivelController;