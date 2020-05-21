const { Router } = require('express');

const reporteBusiness = require('../business/reporteBusiness');
const security = require('../security/security');

const router = Router();

router.get('/reportes', security.verificarToken, reporteBusiness.verReportes)
        .get('/reportes/:id', security.verificarToken, reporteBusiness.verReporte);

module.exports = router;