const router = require('express').Router();
const auth = require('../../auth');
const UsuarioController = require('../../../controllers/UsuarioController');

const usuarioController = new UsuarioController();

// Pegar todos os usuários / coletar dados
router.get("/", auth.required, usuarioController.index);
router.get("/:id", auth.required, usuarioController.show);

// Enviar dados para o servidor
router.post("/login", usuarioController.login);
router.post("/registrar", usuarioController.store);
// Atulizar os dados
router.put("/", auth.required, usuarioController.update);
// Deletar
router.delete("/", auth.required, usuarioController.remove);

// Recuperar senhar
router.get("/recuperar-senha", usuarioController.showRecovery);
router.post("/recuperar-senha", usuarioController.createRecovery);
router.get("/senha-recuperada", usuarioController.shwoCompleteRecovery);
router.post("/senha-recuperada", usuarioController.completeRecovery);


module.exports = router;