const { Router } = require('express');

const security = require('../security/security');
const usuarioBusiness = require('../business/usuarioBusiness');

const router = Router();

router.get('/usuarios', security.verificarToken, usuarioBusiness.verUsuarios)
    .get('/usuarios/:id', security.verificarToken, usuarioBusiness.verUsuario)
    .post('/usuarios', security.verificarToken, usuarioBusiness.registrarUsuario)
    .put('/usuarios', security.verificarToken, usuarioBusiness.actualizarUsuario);

module.exports = router;