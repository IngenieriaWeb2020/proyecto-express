const { Router } = require('express');
const security = require('../security/security');

const ventaBusiness = require('../business/ventaBusiness');

const router = Router();

router.post('/ventas', ventaBusiness.registrarVenta);

module.exports = router;