const { Router } = require('express');

const maquinaBusiness = require('../business/maquinaBusiness');
const security = require('../security/security');

const router = new Router();

router.post('/maquinas', security.verificarToken, maquinaBusiness.registrarMaquina)
    .get('/maquinas', security.verificarToken, maquinaBusiness.maquinas)
    .get('/maquinas/:id', security.verificarToken, maquinaBusiness.maquinaById);

module.exports = router;