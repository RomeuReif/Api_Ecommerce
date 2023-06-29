const router = require('express').Router();
const auth = require('../../auth');
const UsuarioController = require('../../../controllers/UsuarioController');

const usuarioController = new UsuarioController();

// Enviar dados para o servidor
router.post("/login", usuarioController.login); // testado
router.post("/registrar", usuarioController.store);  // testado
// Atulizar os dados
router.put("/", auth.required, usuarioController.update); // erro id
// Deletar
router.delete("/", auth.required, usuarioController.remove); // erro id

// Recuperar senhar
router.get("/recuperar-senha", usuarioController.showRecovery);
router.post("/recuperar-senha", usuarioController.createRecovery);
router.get("/senha-recuperada", usuarioController.showCompleteRecovery);
router.post("/senha-recuperada", usuarioController.completeRecovery);

// Pegar todos os usuários / coletar dados
router.get("/", auth.required, usuarioController.index); // erro 401 
router.get("/:id", auth.required, usuarioController.show); // erro

module.exports = router;