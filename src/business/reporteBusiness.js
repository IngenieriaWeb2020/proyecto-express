const ReporteInventario = require('../data/ReporteInventario');
const ReporteVenta = require('../data/ReporteVenta');

const msgs = require('../util/messages');

async function verReportes(req, res){
    try {
        let reportesInventarios = await ReporteInventario.find();
        let reportesVentas = await ReporteVenta.find();

        res.send({auth: true, reportesInventarios, reportesVentas});
    } catch(err){
        return res.status(500).send({auth: false, msg: msgs.serverError, errmsg: err.errmsg || err.message});
    }
}

async function verReporte(req, res){
    let id = req.params.id;
    try {
        let reporteInventario = await ReporteInventario.findById(id);

        if(reporteInventario){
            return res.send({auth: true, reporteInventario});
        }

        let reporteVenta = await ReporteVenta.findById(id);

        return res.send({auth: true, reporteVenta});
    } catch(err){
        return res.status(500).send({auth: false, msg: msgs.serverError, errmsg: err.errmsg || err.message});
    }
}

module.exports = {
    verReportes,
    verReporte
}