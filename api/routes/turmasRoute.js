const Router = require('express');
const TurmasController = require('../controllers/TurmasController');

const router = Router();

router.get('/turmas',TurmasController.pegaTodosOsTurmas)
router.get('/turmas/:id',TurmasController.pegaUmaTurma)
router.post('/turmas', TurmasController.criarTurmas)
router.put('/turmas/:id',TurmasController.atualizarTurmas)
router.delete('/turmas/:id',TurmasController.deletarTurmas)
router.post('/turmas/:id', TurmasController.restauraTurma)

module.exports = router;