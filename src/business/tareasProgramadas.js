const ReporteInventario = require('../data/ReporteInventario');
const PuntoVenta = require('../data/PuntoVenta');
const Maquina = require('../data/Maquina');
const User = require('../data/User');


const enviarCorreo = require('../util/email');

async function generarReportesInventario(){
    try {
        let puntosVenta = await PuntoVenta.find();
        for(var i = 0; i < puntosVenta.length; i++){
            let idPuntoVenta = puntosVenta[i]._id
            let maquinasNuevas = await Maquina.find().where('ubicacion', idPuntoVenta).where('estado', 'Nueva').where('estadoInventario', 'Disponible');
            let maquinasSegunda = await Maquina.find().where('ubicacion', idPuntoVenta).where('estado', 'Segunda').where('estadoInventario', 'Disponible');

            let reporteInventario = new ReporteInventario({
                ubicacion: idPuntoVenta,
                totalMaquinas: maquinasNuevas.length + maquinasSegunda.length,
                maquinasNuevas: maquinasNuevas.length,
                maquinasSegunda: maquinasSegunda.length
            });
            await reporteInventario.save();
            
            let admin = await User.findById(puntosVenta[i].administrador);
            let contenido = 'Reporte de inventario disponible mensual para el punto de venta en ' + puntosVenta[i].direccion
                            + ':\n\n  Total de máquinas disponibles a la fecha: ' + reporteInventario.totalMaquinas
                            + '\n  Total de máquinas nuevas disponibles: ' + reporteInventario.maquinasNuevas
                            + '\n  Total de máquinas de segunda disponibles: ' + reporteInventario.maquinasSegunda;
            enviarCorreo(admin.correo, 'Reporte de inventario mensual', contenido);
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    generarReportesInventario
};