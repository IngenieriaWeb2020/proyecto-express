const { Router } = require('express');

const maquinaBusiness = require('../business/maquinaBusiness');
const security = require('../security/security');

const router = new Router();

router.post('/maquinas', security.verificarToken, maquinaBusiness.registrarMaquina)
    .get('/maquinas', maquinaBusiness.maquinas)
    .get('/maquinas/:id', maquinaBusiness.maquinaById);

module.exports = router;