const {Router} = require('express');
const PessoaController = require('../controllers/Pessoacontroller');

const router = Router()

router.get('/pessoas', PessoaController.pegaTodasAsPessoas)
router.get('/pessoas/:id',PessoaController.pegaUmaPessoa)
router.post('/pessoas', PessoaController.criarPessoa)
router.put('/pessoas/:id',PessoaController.atualizarPessoa)
router.delete('/pessoas/:id',PessoaController.deletarPessoa)
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula)
router.post('/pessoas/:estudanteId/matricula',PessoaController.criarMatricula)

module.exports = router;