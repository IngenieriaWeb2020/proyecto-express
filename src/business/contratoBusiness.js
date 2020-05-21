const Contrato = require('../data/Contrato');

async function registrarContrato(id, contratoBody){
    let contrato = new Contrato({
        empleado: id,
        fechaInicio: contratoBody.fechaInicio,
        fechaFin: contratoBody.fechaFin,
        salario: contratoBody.salario
    });

    try {
        await contrato.save();
    } catch(err){
        return res.status(500).send({auth: false, msg: msgs.serverError, errmsg: err.errmsg || err.message});
    }
}

async function verContratos(req, res){
    try {
        let contratos = await Contrato.find();

        res.send({auth: true, contratos});
    } catch(err){
        return res.status(500).send({auth: false, msg: msgs.serverError, errmsg: err.errmsg || err.message});
    }
}

module.exports = {
    registrarContrato,
    verContratos
}