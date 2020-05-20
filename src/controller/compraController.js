const { Router } = require('express');

const compraBusiness = require('../business/compraBusiness');
const security = require('../security/security');

const router = Router();

router.post('/compras', security.verificarToken, compraBusiness.registarCompra);

module.exports = router;