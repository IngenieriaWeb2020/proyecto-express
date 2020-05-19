const Factura = require('../data/Factura');
const Maquina = require('../data/Maquina');
const Venta = require('../data/Venta');
const User = require('../data/User');

const msgs = require('../util/messages');

async function registrarVenta(req, res){
    
    try {
        const { userData, idMaquina } = req.body;

        let maquina = await Maquina.findById(idMaquina);
        if(maquina.estadoInventario == 'Vendida'){
            return res.status(500).send({auth: false, msg: msgs.sold});
        }
        let total = maquina.precioCompra * 1.2; 

        let user = new User(userData);
        let factura = new Factura({fecha: Date.now(), maquina: idMaquina, total});
        let venta = new Venta({factura: factura._id, cliente: user._id, ubicacion: maquina.ubicacion});

        await maquina.updateOne({estadoInventario: 'Vendida'});
        await user.save();
        await factura.save();
        await venta.save();

        res.send({auth: true, user, factura, maquina});
    } catch (err) {
        res.status(500).send({auth: false, msg: msgs.serverError, errmsg: err.errmsg || err.message});   
    }
}

module.exports = {
    registrarVenta
}