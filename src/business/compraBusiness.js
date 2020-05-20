const PuntoVenta = require('../data/PuntoVenta');
const Maquina = require('../data/Maquina');
const Factura = require('../data/Factura');
const Compra = require('../data/Compra');
const User = require('../data/User');

const enviarCorreo = require('../util/email');
const msgs = require('../util/messages');

async function registarCompra(req, res){
    // Registrar compra, registrar maquina y enviar correo al encargado
    let { maquinaData, checklist } = req.body; 
    
    let maquina = new Maquina(maquinaData);

    let factura = new Factura({
        maquina: maquina._id,
        total: maquina.precioCompra
    })

    maquina.reciboCompra = factura._id;

    let compra = new Compra({
        maquina: maquina._id,
        ubicacion: maquina.ubicacion,
        motor: checklist.motor,
        botones: checklist.botones,
        pintura: checklist.pintura,
        desgastada: checklist.desgastada
    });

    try{
        let puntoVenta = await PuntoVenta.findById(compra.ubicacion);
        let encargado = await User.findById(puntoVenta.encargadoInventario);

        await maquina.save();
        await factura.save();
        await compra.save();

        let contenido = 'Se ha registrado una nueva compra en el punto de venta en ' + puntoVenta.direccion
                        + ':\n\n    Marca: ' + maquina.marca
                        + '\n    Modelo: ' + maquina.modelo
                        + '\n    Estado: ' + maquina.estado
                        + '\n    Precio de compra: $' + maquina.precioCompra
                        + '\n    Motor: ' + estaBien(compra.motor)
                        + '\n    Botones: ' + estaBien(compra.botones)
                        + '\n    Pintura: ' + estaBien(compra.pintura)
                        + '\n    Desgastada: ' + estaBien(compra.desgastada);

        enviarCorreo(encargado.correo, 'Nueva compra registrada', contenido);
        
        res.send({auth: true, msg: msgs.registered})
    }
    catch(err){
        res.status(500).send({auth: false, msg: msgs.serverError, errmsg: err.errmsg || err.message});
    }
}

function estaBien(valor){
    if(valor) return 'Si';
    return 'No';
}

module.exports = {
    registarCompra
}