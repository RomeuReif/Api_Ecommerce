// Fica as rotas de todos os models
const router = require('express').Router();

router.use("/usuarios", require("./usuarios"));

module.exports = router;