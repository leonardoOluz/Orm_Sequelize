const {Router} = require('express');
const { route } = require('..');
const PessoaController = require('../controllers/Pessoacontroller');

const router = Router()

router.get('/pessoas', PessoaController.pegaTodasAsPessoas)
router.get('/pessoas/:id',PessoaController.pegaUmaPessoa)
router.post('/pessoas', PessoaController.criarPessoa)
router.put('/pessoas/:id',PessoaController.atualizarPessoa)
router.delete('/pessoas/:id',PessoaController.deletarPessoa)

module.exports = router;