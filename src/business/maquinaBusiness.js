const Maquina = require('../data/Maquina');
const Factura = require('../data/Factura');

const msgs = require('../util/messages');

async function registrarMaquina(req, res){
    let maquina = new Maquina(req.body);
    
    let factura = new Factura({
        maquina: maquina._id,
        total: maquina.precioCompra
    })

    maquina.reciboCompra = factura._id;

    try{
        await factura.save();
        await maquina.save();
        res.send({auth: true, msg: msgs.registered})
    }
    catch(err){
        res.status(500).send({auth: false, msg: msgs.serverError, errmsg: err.errmsg || err.message});
    }
}

async function maquinaById(req, res){
    try {
        res.send({auth:true, maquina: await Maquina.findById(req.params.id)});
    } catch (err) {
        res.status(500).send({auth: false, msg: msgs.serverError, errmsg: err.errmsg || err.message});
    }
}

async function maquinas(req, res){
    try {
        let maquinasNuevas = await Maquina.find().where('estado', 'Nueva').where('estadoInventario', 'Disponible');
        let maquinasSegunda = await Maquina.find().where('estado', 'Segunda').where('estadoInventario', 'Disponible');
        res.send({auth: true, maquinasNuevas, maquinasSegunda});
    } catch (err) {
        res.status(500).send({auth: false, msg: msgs.serverError, errmsg: err.errmsg || err.message});
    }
}

module.exports = {
    registrarMaquina,
    maquinas,
    maquinaById
}