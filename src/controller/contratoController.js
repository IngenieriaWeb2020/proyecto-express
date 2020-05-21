const { Router } = require('express');

const security = require('../security/security');
const contratoBusiness = require('../business/contratoBusiness');

const router = Router();

router.get('/contratos', security.verificarToken, contratoBusiness.verContratos);

module.exports = router;